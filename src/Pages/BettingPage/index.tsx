import { useEffect, useState } from "react";
import "./Betting.css";
import { GET } from "@/services/api";
import { Match, GameStatus, Game } from "./viewModel/BetslipGame";
import Loading from "@/components/Loading";
import { toast } from 'react-toastify';
import { ActiveBetting } from "./components/ActiveBetting";
import { EndedBetting } from "./components/EndedBetting";

const BettingPage = () => {
  const [betslipGameId, setBetslipGameId] = useState<string>("");
  const [betSlipGameStatus, setBetslipGameStatus] = useState<GameStatus>(GameStatus.NotFound);
  const [games, setGames] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBetSlip = async () => {
    try {
      const response = await GET<Game>("games/active");
      if (!response.success) {
        return;
      }

      setGames(response.data.matches);
      setBetslipGameId(response.data.betSlipId);
      setBetslipGameStatus(response.data.status);

    } catch (err) {
      toast.error("Something went wrong, please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBetSlip();
  }, []);

  if (isLoading) 
    return <Loading />;  
  else if (betSlipGameStatus == GameStatus.NotFound || games.length == 0)
    return <div>No games found</div>
  else if (betSlipGameStatus == GameStatus.Started)
    return <ActiveBetting games={games} betslipGameId={betslipGameId} />
  else if (betSlipGameStatus == GameStatus.Ended)
    return <EndedBetting games={games} />
};

export default BettingPage;
