import React, { useEffect, useState } from "react";
import db from "../../firebase/firebase";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";

interface MatchData {
  club1: string;
  club2: string;
  score1: number; // Score for club1
  score2: number; // Score for club2
  outcome: string;
  gameres: string;
  resolved: boolean;
}

const initialMatch: MatchData = {
  club1: "",
  club2: "",
  score1: 1,
  score2: 1,
  outcome: "",
  gameres: "",
  resolved: false,
};

const AdminCreateBetslip = () => {
  const [weekId, setWeekId] = useState("");
  const [matches, setMatches] = useState<MatchData[]>(
    Array(13).fill({ ...initialMatch })
  );
  const [isExistingData, setIsExistingData] = useState(false);
  const [isAllResolved, setIsAllResolved] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      if (weekId) {
        const weekRef = doc(db, "Games", weekId);
        const matchesCollection = collection(weekRef, "matches");
        const querySnapshot = await getDocs(matchesCollection);
        const fetchedMatches = querySnapshot.docs.map((doc) => {
          const data = doc.data() as MatchData;
          const scores = data.gameres.split("-").map(Number);
          return { ...data, score1: scores[0], score2: scores[1] };
        });

        // Check if all matches are resolved
        const allResolved = fetchedMatches.every((match) => match.resolved);
        setIsAllResolved(allResolved);
        setIsExistingData(fetchedMatches.length > 0);
        setMatches(
          fetchedMatches.length
            ? fetchedMatches
            : Array(13).fill({ ...initialMatch })
        );
      } else {
        setMatches(Array(13).fill({ ...initialMatch }));
        setIsAllResolved(false);
      }
    };

    fetchMatches();
  }, [weekId]);

  const handleFieldChange = (
    index: number,
    field: keyof MatchData,
    value: any
  ) => {
    const newMatches = [...matches];
    newMatches[index] = { ...newMatches[index], [field]: value };
    setMatches(newMatches);
  };

  const handleResolveBetslip = async () => {
    if (!weekId) {
      alert("Please select a Week ID.");
      return;
    }
    const incompleteMatch = matches.some(
      (match) =>
        !match.club1 ||
        !match.club2 ||
        !match.outcome ||
        match.score1 === 0 ||
        match.score2 === 0
    );
    if (incompleteMatch) {
      alert("All fields must be filled out before resolving the betslip.");
      return;
    }

    await Promise.all(
      matches.map((match, index) =>
        updateDoc(
          doc(
            collection(doc(db, "Games", weekId), "matches"),
            `match${index + 1}`
          ),
          {
            resolved: true,
          }
        )
      )
    );
    setIsAllResolved(true);
    alert("Betslip has been resolved and is no longer editable.");
  };

  const handleSubmit = async () => {
    if (!weekId) {
      alert("Please select a Week ID.");
      return;
    }
    if (isAllResolved) {
      alert("This betslip has already been resolved.");
      return;
    }

    await Promise.all(
      matches.map((match, index) =>
        setDoc(
          doc(
            collection(doc(db, "Games", weekId), "matches"),
            `match${index + 1}`
          ),
          {
            club1: match.club1,
            club2: match.club2,
            gameres: `${match.score1}-${match.score2}`,
            outcome: match.outcome,
            resolved: match.resolved,
          }
        )
      )
    );
    alert("All matches saved successfully.");
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Week ID:
        </label>
        <select
          value={weekId}
          onChange={(e) => setWeekId(e.target.value)}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Choose a Week</option>
          {[...Array(30).keys()].map((week) => (
            <option
              key={week + 1}
              value={`week${week + 1}`}
            >{`Week ${week + 1}`}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map((match, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center p-2 text-2xl">
              <input
                type="text"
                placeholder="Club 1"
                value={match.club1}
                onChange={(e) =>
                  handleFieldChange(index, "club1", e.target.value)
                }
                className="input input-bordered w-full max-w-xs"
              />
              <span>VS</span>
              <input
                type="text"
                placeholder="Club 2"
                value={match.club2}
                onChange={(e) =>
                  handleFieldChange(index, "club2", e.target.value)
                }
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-9 p-2 m-3">
              <select
                value={match.score1}
                onChange={(e) =>
                  handleFieldChange(index, "score1", parseInt(e.target.value))
                }
                className="select select-bordered w-full border p-2"
              >
                <option value="">Score</option>
                {[...Array(10).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <select
                value={match.score2}
                onChange={(e) =>
                  handleFieldChange(index, "score2", parseInt(e.target.value))
                }
                className="select select-bordered w-full border p-2"
              >
                <option value="">Score</option>
                {[...Array(10).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>
            <hr className="my-5 h-0.5 border-t-0 bg-black dark:bg-black/10" />
            <div className="flex justify-around mt-4 divide-y ">
              {["1", "X", "2"].map((value) => (
                <div
                  key={value}
                  className={`w-12 h-12 flex items-center justify-center cursor-pointer ${matches[index].outcome === value ? "bg-green-500" : "bg-blue-500"} text-white rounded`}
                  onClick={() => handleFieldChange(index, "outcome", value)}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleSubmit}
          className={`p-4 bg-blue-500 btn ${isExistingData ? "btn-success" : "btn-info"} mr-2`}
          disabled={isAllResolved}
        >
          {isExistingData ? "Save Changes" : "Create Betslip"}
        </button>
        <button
          onClick={handleResolveBetslip}
          className={`btn ${isAllResolved ? "bg-green-500" : "bg-blue-500"} p-4`}
          disabled={isAllResolved}
        >
          {isAllResolved ? "Already Resolved" : "Resolve Betslip"}
        </button>
      </div>
    </div>
  );
};

export default AdminCreateBetslip;
