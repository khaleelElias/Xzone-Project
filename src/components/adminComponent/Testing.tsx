import React, { useState, useEffect } from "react";
import axios from "axios";

// Define TypeScript interface for the game object
interface Game {
  id: number;
  opponent1: string;
  opponent2: string;
  gameDateTime: string;
  gameLeague: string;
  gameResult: string;
  status: string;
  matches?: any[]; // Define this type according to your actual data structure
}

// React component
const GamesManager: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [expandId, setExpandId] = useState<number | null>(null); // Manage which game's details are shown

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get<Game[]>("http://localhost:3000/games");
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const updateGameDetails = (
    index: number,
    field: keyof Game,
    value: string
  ) => {
    const updatedGames = [...games];
    updatedGames[index] = { ...updatedGames[index], [field]: value };
    setGames(updatedGames);
  };

  const handleSave = async (index: number) => {
    const game = games[index];
    if (game.matches && game.matches.length === 13) {
      try {
        await axios.put(`http://localhost:3000/games/${game.id}`, game);
        fetchGames(); // Re-fetch games to reflect updates
      } catch (error) {
        console.error("Error updating game:", error);
      }
    } else {
      alert("Each game must have exactly 13 matches.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {games.map((game, index) => (
        <div
          key={game.id}
          className="mb-4 p-4 border border-gray-200 rounded-lg"
        >
          <button
            onClick={() => setExpandId(expandId === game.id ? null : game.id)}
            className="text-xl font-bold underline"
          >
            {game.opponent1} vs {game.opponent2}
          </button>
          {expandId === game.id && (
            <div className="mt-2">
              {game.status !== "Ended" ? (
                <div>
                  <input
                    type="text"
                    value={game.opponent1}
                    onChange={(e) =>
                      updateGameDetails(index, "opponent1", e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={game.opponent2}
                    onChange={(e) =>
                      updateGameDetails(index, "opponent2", e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={() => handleSave(index)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <div>
                    <strong>Date/Time:</strong> {game.gameDateTime}
                  </div>
                  <div>
                    <strong>League:</strong> {game.gameLeague}
                  </div>
                  <div>
                    <strong>Result:</strong> {game.gameResult}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GamesManager;
