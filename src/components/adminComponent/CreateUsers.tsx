import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GET } from "@/services/api";

interface Match {
  opponent1: string;
  score1: number | null;
  opponent2: string;
  score2: number | null;
  startDate: Date;
  league: string;
}

interface Game {
  matches: Match[];
  date: Date;
  GameStatus: number;
}

const PixBet = () => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await GET<Game>("Games?status=2");
        if (response.success) {
          setGame(response.data);
        } else {
          console.error("Failed to fetch game:", response.errorMessage);
        }
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchGame();
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-7 text-black">
      <h1 className="text-2xl text-white">
        Game Date: {new Date(game.date).toLocaleDateString()}
      </h1>
      <div className="grid grid-cols-4 gap-3">
        {game.matches.map((match, index) => (
          <div key={index} className="p-4 mb-4 bg-gray-100 rounded">
            <h3 className="text-lg font-bold mb-2">Match {index + 1}</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <span className="font-bold">Opponent 1: </span>
                {match.opponent1}
              </div>
              <div className="col-span-2">
                <span className="font-bold">Score 1: </span>
                {match.score1 !== null ? match.score1 : "TBD"}
              </div>
              <div className="col-span-2">
                <span className="font-bold">Opponent 2: </span>
                {match.opponent2}
              </div>
              <div className="col-span-2">
                <span className="font-bold">Score 2: </span>
                {match.score2 !== null ? match.score2 : "TBD"}
              </div>
              <div className="col-span-2">
                <span className="font-bold">Start Date: </span>
                {new Date(match.startDate).toLocaleString()}
              </div>
              <div className="col-span-2">
                <span className="font-bold">League: </span>
                {match.league}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PixBet;
