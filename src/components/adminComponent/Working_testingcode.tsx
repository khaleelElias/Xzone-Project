import React, { useState, useEffect } from "react";
import axios from "axios";

interface Game {
  id: number;
  matches: Match[];
  status: "Preparing" | "Started" | "Running" | "Ended";
  date: string;
}

interface Match {
  opponent1: string;
  score1: number;
  opponent2: string;
  score2: number;
  gameDateTime: string;
  gameLeague: string;
  gameResult: "home" | "draw" | "away";
  finalResult: number;
}

interface MatchCardProps {
  match: Match;
  editable: boolean;
  onChange: (match: Match) => void;
}

const Working_testingcode = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:3000/games");
        setGames(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch games");
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleSave = async (gameId: number, updatedGame: Game) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/games/${gameId}`,
        updatedGame
      );
      const updatedGames = games.map((game) =>
        game.id === gameId ? updatedGame : game
      );
      setGames(updatedGames);
      console.log("Game updated successfully:", response.data);
    } catch (error) {
      console.error("Failed to update game:", error);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Historical Betslips</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {games.map((game) => (
          <GameDetail key={game.id} game={game} onSave={handleSave} />
        ))}
      </div>
    </div>
  );
};

const GameDetail = ({
  game,
  onSave,
}: {
  game: Game;
  onSave: (gameId: number, game: Game) => void;
}) => {
  const [editableGame, setEditableGame] = useState(game);

  const handleMatchChange = (updatedMatch: Match, index: number) => {
    const updatedMatches = editableGame.matches.map((match, idx) =>
      idx === index ? { ...match, ...updatedMatch } : match
    );
    setEditableGame({ ...editableGame, matches: updatedMatches });
  };

  return (
    <details className="mb-4 bg-gray-100 p-4 rounded-lg shadow">
      <summary className="font-bold cursor-pointer flex justify-between items-center">
        {new Date(game.date).toLocaleDateString()} (Week{" "}
        {calculateWeek(game.date)})
        <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          Status: {game.status}
        </span>
      </summary>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {editableGame.matches.map((match, index) => (
          <MatchCard
            key={index}
            match={match}
            editable={game.status !== "Ended"}
            onChange={(updatedMatch) => handleMatchChange(updatedMatch, index)}
          />
        ))}
      </div>
      <button
        onClick={() => onSave(game.id, editableGame)}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save All Changes
      </button>
    </details>
  );
};

const MatchCard: React.FC<MatchCardProps> = ({ match, editable, onChange }) => {
  const [editMatch, setEditMatch] = useState(match);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedMatch = { ...editMatch, [e.target.name]: e.target.value };
    setEditMatch(updatedMatch);
    onChange(updatedMatch);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg space-y-2">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Opponent 1:
        </label>
        {editable ? (
          <input
            type="text"
            name="opponent1"
            value={editMatch.opponent1}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        ) : (
          <p className="mt-1 block w-full p-2 bg-gray-50 rounded-md">
            {match.opponent1}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Opponent 2:
        </label>
        {editable ? (
          <input
            type="text"
            name="opponent2"
            value={editMatch.opponent2}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        ) : (
          <p className="mt-1 block w-full p-2 bg-gray-50 rounded-md">
            {match.opponent2}
          </p>
        )}
      </div>
    </div>
  );
};

function calculateWeek(dateStr: string): number {
  const date = new Date(dateStr);
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  return Math.ceil((date.getDay() + 1 + days) / 7);
}

export default Working_testingcode;
