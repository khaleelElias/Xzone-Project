import { useState, useEffect } from "react";

import api from "@/services/api";

interface Game {
  id: number;
  matches: Match[];
  status: "Preparing" | "Started" | "Running" | "Ended";
  date: string;
}

interface Match {
  opponent1: string;
  opponent2: string;
  gameDateTime: string;
  gameLeague: string;
  gameResult: "home" | "draw" | "away";
  finalResult: number;
}

const AdminHistoricalBetslip = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await api.get("/games");
        setGames(response.data);
      } catch (error) {
        setError("Failed to fetch games");
        console.error("Failed to fetch games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4 text-black">
      <h1 className="text-2xl font-bold mb-4">Historical Betslips</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {games.map((game) => (
          <details
            key={game.id}
            className="mb-4 bg-gray-100 p-4 rounded-lg shadow"
          >
            <summary className="font-bold cursor-pointer flex justify-between items-center">
              {new Date(game.date).toLocaleDateString()} (Week{" "}
              {calculateWeek(game.date)})
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Status: {game.status}
              </span>
            </summary>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {game.matches.map((match, index) => (
                <MatchCard
                  key={index}
                  match={match}
                  editable={game.status !== "Ended"}
                />
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

// Helper function to calculate the week number based on the date
function calculateWeek(dateStr: string): number {
  const date = new Date(dateStr);
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  return Math.ceil((date.getDay() + 1 + days) / 7);
}

const MatchCard = ({
  match,
  editable,
}: {
  match: Match;
  editable: boolean;
}) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg space-y-2">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Opponent 1:
        </label>
        {editable ? (
          <input
            type="text"
            value={match.opponent1}
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
            value={match.opponent2}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        ) : (
          <p className="mt-1 block w-full p-2 bg-gray-50 rounded-md">
            {match.opponent2}
          </p>
        )}
      </div>
      {/* Additional fields for other match attributes can be added similarly */}
    </div>
  );
};

export default AdminHistoricalBetslip;
