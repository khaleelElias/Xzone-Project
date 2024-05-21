import { GET } from "@/services/api";
import { useState, useEffect, useRef } from "react";
import { parseISO, getISOWeek } from "date-fns";
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported

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

const calculateISOWeek = (dateString: string) => {
  const date = parseISO(dateString);
  return getISOWeek(date);
};

const AdminHistoricalBetslip = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await GET<Game[]>("Games");
        if (response.success) {
          const filteredGames = response.data.filter(
            (game) => game.status === 3
          );
          const sortedGames = filteredGames.sort(
            (a, b) => calculateISOWeek(b.date) - calculateISOWeek(a.date)
          );

          setGames(sortedGames);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl mb-4">Game List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => setSelectedGame(game)}
          />
        ))}
      </div>
      {selectedGame && (
        <GameDetails
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}
    </div>
  );
};

const GameCard = ({ game, onClick }: { game: Game; onClick: () => void }) => {
  const gameWeek = calculateISOWeek(game.date);

  return (
    <div
      className="p-4 bg-white text-black rounded-lg shadow-md cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-xl">Week: {gameWeek}</h2>
      <p className="text-gray-600">GameID: {game.id}</p>
      <p className="text-gray-600">Status: {game.status}</p>
      <p className="text-gray-600">Game date: {game.date}</p>
    </div>
  );
};

const GameDetails = ({
  game,
  onClose,
}: {
  game: Game;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg h-3/4 overflow-y-auto"
      >
        <button className="mb-4 text-right text-red-500" onClick={onClose}>
          Close
        </button>
        <h2 className="text-2xl mb-4">Game Details</h2>
        <p>
          <strong>ID:</strong> {game.id}
        </p>
        <p>
          <strong>Date:</strong> {game.date}
        </p>
        <p>
          <strong>Status:</strong> {game.status}
        </p>
        <div className="mt-4">
          <h3 className="text-xl mb-2">Matches:</h3>
          {game.matches.map((match, index) => (
            <div key={index} className="border-b border-gray-200 py-2">
              <p>
                <strong>Opponent 1:</strong> {match.opponent1}
              </p>
              <p>
                <strong>Score 1:</strong> {match.score1}
              </p>
              <p>
                <strong>Opponent 2:</strong> {match.opponent2}
              </p>
              <p>
                <strong>Score 2:</strong> {match.score2}
              </p>
              <p>
                <strong>Game Date:</strong> {match.gameDateTime}
              </p>
              <p>
                <strong>League:</strong> {match.gameLeague}
              </p>
              <p>
                <strong>Result:</strong> {match.gameResult}
              </p>
              <p>
                <strong>Final Result:</strong> {match.finalResult}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHistoricalBetslip;
