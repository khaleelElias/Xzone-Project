import { GET, PUT } from "@/services/api";
import React, { useState, useEffect } from "react";
import { parseISO, startOfISOWeek, differenceInCalendarDays } from "date-fns";

interface Game {
  id: number;
  matches: Match[];
  status: 0 | 1 | 2 | 3;
  date: string;
}

interface Match {
  opponent1: string;
  score1: number | null;
  opponent2: string;
  score2: number | null;
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

const AdminOverview = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [filter, setFilter] = useState({
    date: "",
    status: "",
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await GET<Game[]>("Games");
        if (response.success) {
          const sortedGames = response.data
            .sort((a, b) => calculateISOWeek(b.date) - calculateISOWeek(a.date))
            .slice(0, 5); // Get the latest 7 games
          setGames(sortedGames);
          setFilteredGames(sortedGames);
        } else {
          setError(response.errorMessage);
        }
      } catch (err) {
        console.error("Failed to fetch games:", err);
        setError("Failed to fetch games");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleSave = async (gameId: number, updatedGame: Game) => {
    const response = await PUT<Game>(`/Games/${gameId}`, updatedGame);
    if (response.success) {
      const updatedGames = games.map((game) =>
        game.id === gameId ? { ...game, ...updatedGame } : game
      );
      setGames(updatedGames);
      setFilteredGames(updatedGames);
      console.log("Game updated successfully:", response.data);
    } else {
      console.error("Failed to update game:", response.errorMessage);
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    const filtered = games.filter((game) => {
      const matchesDate = filter.date ? game.date.includes(filter.date) : true;
      const matchesStatus = filter.status
        ? game.status.toString() === filter.status
        : true;
      return matchesDate && matchesStatus;
    });
    setFilteredGames(filtered);
  }, [filter, games]);

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4 text-black">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Historical Betslips
      </h1>

      <div className="grid grid-cols-2 gap-8">
        <div className="mb-4 ">
          <label className="block text-sm font-medium text-white">
            Filter by Date:
          </label>
          <input
            type="date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-white">
            Filter by Status:
          </label>
          <select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">All Statuses</option>
            <option value="0">Preparing</option>
            <option value="1">Started</option>
            <option value="2">Running</option>
            <option value="3">Ended</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {filteredGames.map((game) => (
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

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = parseInt(e.target.value) as 0 | 1 | 2 | 3;
    if (confirm("Are you sure you want to change the status?")) {
      const updatedGame = { ...editableGame, status: newStatus };
      setEditableGame(updatedGame);
      await onSave(game.id, updatedGame);
    }
  };

  const statusTextMap = {
    0: "Preparing",
    1: "Started",
    2: "Running",
    3: "Ended",
  };

  const statusColorMap = {
    0: "bg-blue-100 text-blue-800",
    1: "bg-green-100 text-green-800",
    2: "bg-yellow-100 text-yellow-800",
    3: "bg-red-100 text-red-800",
  };

  return (
    <details className="mb-4 bg-gray-100 p-4 rounded-lg shadow">
      <summary className="font-bold cursor-pointer flex justify-between items-center">
        {new Date(game.date).toLocaleDateString()} (Week{" "}
        {calculateISOWeek(game.date)})
        <span
          className={`text-sm px-3 py-1 rounded-full ${statusColorMap[game.status]}`}
        >
          Status: {statusTextMap[game.status] || "Unknown"}
        </span>
      </summary>
      <div className="mt-4 bg-gray-500 p-4">
        <label className="block text-sm font-medium text-gray-700 ">
          Change Status:
        </label>
        <select
          name="status"
          value={editableGame.status}
          onChange={handleStatusChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          disabled={editableGame.status === 3}
        >
          <option value="0">Preparing</option>
          <option value="1">Started</option>
          <option value="2">Running</option>
          <option value="3">Ended</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {editableGame.matches.map((match, index) => (
          <MatchCard
            key={index}
            match={match}
            editable={editableGame.status !== 3}
            onChange={(updatedMatch) => handleMatchChange(updatedMatch, index)}
          />
        ))}
      </div>

      {editableGame.status !== 3 && (
        <button
          onClick={() => onSave(game.id, editableGame)}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save All Changes
        </button>
      )}
    </details>
  );
};

const MatchCard: React.FC<MatchCardProps> = ({ match, editable, onChange }) => {
  const [editMatch, setEditMatch] = useState(match);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updatedMatch = { ...editMatch, [e.target.name]: e.target.value };
    setEditMatch(updatedMatch);
    onChange(updatedMatch);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedMatch = { ...editMatch, gameDateTime: e.target.value };
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
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Score 1:
        </label>
        {editable ? (
          <select
            name="score1"
            value={editMatch.score1 !== null ? editMatch.score1.toString() : ""}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Score</option>
            {[...Array(11).keys()].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        ) : (
          <p className="mt-1 block w-full p-2 bg-gray-50 rounded-md">
            {match.score1}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Score 2:
        </label>
        {editable ? (
          <select
            name="score2"
            value={editMatch.score2 !== null ? editMatch.score2.toString() : ""}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Score</option>
            {[...Array(11).keys()].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        ) : (
          <p className="mt-1 block w-full p-2 bg-gray-50 rounded-md">
            {match.score2}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Game Date and Time:
        </label>
        {editable ? (
          <input
            type="datetime-local"
            name="gameDateTime"
            value={
              editMatch.gameDateTime ? editMatch.gameDateTime.slice(0, 16) : ""
            }
            onChange={handleDateChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        ) : (
          <p className="mt-1 block w-full p-2 bg-gray-50 rounded-md">
            {new Date(match.gameDateTime).toLocaleString()}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Game League:
        </label>
        {editable ? (
          <input
            type="text"
            name="gameLeague"
            value={editMatch.gameLeague}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        ) : (
          <p className="mt-1 block w-full p-2 bg-gray-50 rounded-md">
            {match.gameLeague}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Game Result:
        </label>
        {editable ? (
          <input
            type="text"
            name="gameResult"
            value={editMatch.gameResult}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        ) : (
          <p className="mt-1 block w-full p-2 bg-gray-50 rounded-md">
            {match.gameResult}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Final Result:
        </label>
        {editable ? (
          <input
            type="number"
            name="finalResult"
            value={editMatch.finalResult}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        ) : (
          <p className="mt-1 block w-full p-2 bg-gray-50 rounded-md">
            {match.finalResult}
          </p>
        )}
      </div>
    </div>
  );
};

function calculateISOWeek(dateStr: string): number {
  const date = parseISO(dateStr);
  const startOfISOYear = startOfISOWeek(new Date(date.getFullYear(), 0, 4));
  const days = differenceInCalendarDays(date, startOfISOYear);
  return Math.ceil((days + 1) / 7);
}

export default AdminOverview;
