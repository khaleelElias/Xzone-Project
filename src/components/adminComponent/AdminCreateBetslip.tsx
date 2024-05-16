import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import api from "@/services/api";

interface Match {
  opponent1: string;
  score1: number | null;
  opponent2: string;
  score2: number | null;
  startDate: Date;
  league: string;
  result: "null" | "home" | "draw" | "away";
  finalResult: number;
}

interface Game {
  matches: Match[];
  status?: string;
  date: Date;
}

const AdminCreateBetslip = () => {
  const [matches, setMatches] = useState<Match[]>(
    Array.from({ length: 13 }, () => ({
      opponent1: "",
      score1: null,
      opponent2: "",
      score2: null,
      startDate: new Date(),
      league: "",
      result: "null",
      finalResult: 0,
    }))
  );
  const [gameDate, setGameDate] = useState(new Date());

  const handleInputChange = (
    index: number,
    field: keyof Match,
    value: string | Date | number
  ) => {
    const newMatches = matches.map((match, i) => {
      if (i === index) {
        return { ...match, [field]: value };
      }
      return match;
    });
    setMatches(newMatches);
  };

  const saveGame = async () => {
    try {
      const newGame: Game = {
        matches,
        date: gameDate,
      };
      console.log({ matches });
      const response = await api.post("/games", newGame);
      alert(`Game saved: ${response.data.message}`);
    } catch (error: any) {
      alert(
        `Failed to save game: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  return (
    <>
      <h1 className="text-2xl text-white">Date for the Game:</h1>
      <DatePicker
        selected={gameDate}
        onChange={(date: Date) => setGameDate(date)}
        dateFormat="MMMM d, yyyy"
        className="block w-full p-2 bg-white border border-gray-300 rounded mb-2"
      />
      <div className="p-7  text-black grid grid-cols-4 gap-3">
        {matches.map((match, index) => (
          <div key={index} className="p-4 mb-4 bg-gray-100 rounded">
            <h3 className="text-lg font-bold mb-2">Match {index + 1}</h3>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Enter opponent 1"
                value={match.opponent1}
                onChange={(e) =>
                  handleInputChange(index, "opponent1", e.target.value)
                }
                className="p-2 bg-white border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Enter opponent 2"
                value={match.opponent2}
                onChange={(e) =>
                  handleInputChange(index, "opponent2", e.target.value)
                }
                className="p-2 bg-white border border-gray-300 rounded mb-2"
              />

              <select
                value={match.score1 !== null ? match.score1.toString() : ""}
                onChange={(e) =>
                  handleInputChange(index, "score1", parseInt(e.target.value))
                }
                className="block w-full p-2 bg-white border border-gray-300 rounded mb-2"
              >
                <option value="null">Select Score</option>
                {[...Array(11).keys()].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <select
                value={match.score2 !== null ? match.score2.toString() : ""}
                onChange={(e) =>
                  handleInputChange(index, "score2", parseInt(e.target.value))
                }
                className="block w-full p-2 bg-white border border-gray-300 rounded mb-2"
              >
                <option value="null">Select Score</option>
                {[...Array(11).keys()].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <DatePicker
                selected={match.startDate}
                onChange={(date: Date) =>
                  handleInputChange(index, "startDate", date)
                }
                showTimeSelect
                dateFormat="Pp"
                className="block w-full p-2 bg-white border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Enter game league"
                value={match.league}
                onChange={(e) =>
                  handleInputChange(index, "league", e.target.value)
                }
                className="p-2 bg-white border border-gray-300 rounded mb-2"
              />
            </div>
            <select
              value={match.result}
              onChange={(e) =>
                handleInputChange(
                  index,
                  "result",
                  e.target.value as "null" | "home" | "draw" | "away"
                )
              }
              className="block w-full p-2 bg-white border border-gray-300 rounded"
            >
              <option value="null">Select Option</option>
              <option value="home">Home</option>
              <option value="draw">Draw</option>
              <option value="away">Away</option>
            </select>
          </div>
        ))}
        <button
          onClick={saveGame}
          className="px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
        >
          Save Game
        </button>
      </div>
    </>
  );
};

export default AdminCreateBetslip;
