import React, { useState, useEffect } from "react";
import db from "../firebase/firebase"; // make sure this path is correct
import { collection, getDocs } from "firebase/firestore";

interface Match {
  id: string;
  club1: string;
  club2: string;
  gameres: string;
}

const GameForm = () => {
  const [matches, setMatches] = useState<Match[]>([]); // Use Match interface

  useEffect(() => {
    const fetchMatches = async () => {
      const matchesCol = collection(db, "games/week18/matches"); // example path, adjust as needed
      const matchesSnapshot = await getDocs(matchesCol);
      const matchesData = matchesSnapshot.docs.map((doc) => ({
        id: doc.id, // Explicitly set 'id' here
        ...(doc.data() as Omit<Match, "id">), // Use Omit utility type if 'id' might be part of doc.data()
      }));
      setMatches(matchesData);
      console.log(matches, "hello");
    };

    fetchMatches();
  }, []);

  return (
    <div className="m-4 rounded bg-white p-5">
      {matches.map((match) => (
        <div key={match.id} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="items-center p-3 grid grid-cols-3 bg-white">
            <span className="text-center text-2xl">{match.club1}</span>
            <span className="text-center text-2xl">vs</span>
            <span className="text-center text-2xl">{match.club2}</span>
          </div>
          <div className="flex min-h-[100px] items-center justify-center gap-10 bg-white">
            <span>current results: {match.gameres}</span>
            <div className="gap-4 button-group">
              <button onClick={() => alert("Selected Outcome: 1")}>1</button>
              <button onClick={() => alert("Selected Outcome: X")}>X</button>
              <button onClick={() => alert("Selected Outcome: 2")}>2</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameForm;
