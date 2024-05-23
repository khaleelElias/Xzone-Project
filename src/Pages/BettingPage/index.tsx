import { useEffect, useState } from "react";
import { IBetSlip } from "./model";
import "./Betting.css";
import PoolInfo from "../../components/PoolInfo";
import Popup from "../../components/Popup";
import { GET } from "@/services/api";
import { Match, GameStatus, Game } from "./viewModel/BetslipGame";
import Loading from "@/components/Loading";

enum gameResultPicked {
  home,
  draw,
  away,
}

const BettingPage = () => {
  const MAX_BETTING_PICKS = 10;
  const [betslipGameId, setBetslipGameId] = useState<string>("");
  const [betSlipGameStatus, setBetslipGameStatus] = useState<GameStatus>();
  const [games, setGames] = useState<Match[]>([]);
  const [isSendable, setIsSendable] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(1);
  const [reachedLimit, setReachedLimit] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBetSlip = async () => {
    try {
      const response = await GET<Game[]>("Games");
      if (response.success) {
        const activeGames = response.data.filter((game) => game.status === 2);
        if (activeGames.length > 0) {
          const activeGame = activeGames[0];
          setGames(activeGame.matches);
          setBetslipGameId(activeGame.betSlipId);
          setBetslipGameStatus(activeGame.status);
        } else {
          setGames([]);
        }
      } else {
        console.error("Failed to fetch games:", response.errorMessage);
      }
    } catch (err) {
      console.error("Failed to fetch games:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBetSlip();
  }, []);

  if (isLoading) return <Loading />;
  if (games.length === 0) return <div>No active games available.</div>;

  const pickMatch = (index: number, gameResult: gameResultPicked) => {
    let arr = [...games];
    let game = arr[index];
    if (!game) return;
    switch (gameResult) {
      case gameResultPicked.home:
        game.homePicked = !game.homePicked;
        break;
      case gameResultPicked.draw:
        game.drawPicked = !game.drawPicked;
        break;
      case gameResultPicked.away:
        game.awayPicked = !game.awayPicked;
        break;
      default:
        return;
    }

    arr[index] = game;
    setGames(arr);

    setIsSendable(
      !arr.some((x) => !x.awayPicked && !x.homePicked && !x.drawPicked)
    );
    setReachedLimit(calcSum(arr) >= MAX_BETTING_PICKS);
  };

  const calcSum = (arr: Match[]) => {
    let priceSum = 1;
    let sum = 0;
    for (let a of arr) {
      let tempSum = 0;
      if (a.homePicked) tempSum++;
      if (a.drawPicked) tempSum++;
      if (a.awayPicked) tempSum++;

      priceSum *= tempSum || 1;
    }
    console.log(priceSum);
    setPrice(priceSum);
    return sum;
  };

  const renderCheckboxes = (game: Match, index: number) => {
    let homePickedClass = game.homePicked ? " checked" : "";
    let drawPickedClass = game.drawPicked ? " checked" : "";
    let awayPickedClass = game.awayPicked ? " checked" : "";
    return (
      <>
        <div
          className={`checkboxBorder text-sm flex justify-center items-center ${!game.homePicked && reachedLimit ? " disabled" : ""} ${homePickedClass}`}
          onClick={
            game.homePicked || !reachedLimit
              ? () => pickMatch(index, gameResultPicked.home)
              : () => {}
          }
        >
          <span>1</span>
        </div>
        <div
          className={`checkboxBorder text-sm flex justify-center items-center ${!game.drawPicked && reachedLimit ? " disabled" : ""} ${drawPickedClass}`}
          onClick={
            game.drawPicked || !reachedLimit
              ? () => pickMatch(index, gameResultPicked.draw)
              : () => {}
          }
        >
          <span>X</span>
        </div>
        <div
          className={`checkboxBorder text-sm flex justify-center items-center ${!game.awayPicked && reachedLimit ? " disabled" : ""} ${awayPickedClass}`}
          onClick={
            game.awayPicked || !reachedLimit
              ? () => pickMatch(index, gameResultPicked.away)
              : () => {}
          }
        >
          <span>2</span>
        </div>
      </>
    );
  };

  async function send() {
    try {
      return <Popup />;
    } catch (error) {}
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );
  } else {
    return (
      <>
        <div className="background font-ProLight">
          <div className="grid justify-center items-center p-8">
            <img
              src="/images/logo.png"
              alt="logo"
              className="cursor-pointer w-10 h-10 "
            />
          </div>

          <PoolInfo />
        </div>
        <div className="centeralized-container">
          <table className="custom-table table-auto border-separate games-tablet">
            <tbody>
              {games.map((game, index) => (
                <tr key={index} className="gameBorder p-2">
                  <td>
                    <div className="flex gap-1 items-center">
                      <p className="game-league text-xs md:text-sm">
                        {game.league}
                      </p>
                      <p className="game-time text-xs">
                        {game.startDate.toString()}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-end text-xs md:text-base items-center gap-2.5">
                      <p className="text-right">{game.opponent1}</p>
                    </div>
                  </td>
                  <td valign="middle" className="text-xs px-2.5 text-center">
                    <p>vs</p>
                  </td>
                  <td>
                    <div className="flex justify-start text-xs md:text-base items-center gap-2.5">
                      <p>{game.opponent2}</p>
                    </div>
                  </td>

                  <td valign="middle">
                    <div className="checkboxContainer">
                      {renderCheckboxes(game, index)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="custom-table table-fix border-separate games-mobile">
            <tbody>
              {games.map((game, index) => (
                <tr key={index} className="gameBorder p-2">
                  <td>
                    <div className="flex items-center gap-4">
                      <p className="game-league text-xs">{game.league}</p>
                      <p className="game-time text-xs">
                        {game.startDate.toString()}
                      </p>
                    </div>

                    <div
                      className="flex text-xs font-semibold items-center gap-1.5"
                      style={{ paddingTop: "10px" }}
                    >
                      <div className="flex items-center flex-col">
                        <p>{game.opponent1}</p>
                      </div>
                      <p style={{ whiteSpace: "pre" }}> - </p>
                      <div className="flex items-center flex-col">
                        <p>{game.opponent2}</p>
                      </div>
                    </div>
                  </td>

                  <td valign="middle" style={{ paddingLeft: "15px" }}>
                    <div className="checkboxContainer">
                      {renderCheckboxes(game, index)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-6 bg-green-500 hover:bg-green-700 active:bg-green-800 px-4 py-2 rounded-md text-white disabled:bg-[#e4e4e4] disabled:text-gray-500 disabled:cursor-not-allowed"
            onClick={send}
            disabled={!isSendable}
          >
            Create My PIX Slip
          </button>
        </div>
        <div className="sticky bottom-0 flex justify-center bg-slate-900 text-white mt-6 p-3">
          <p>current price {price} sol</p>
        </div>
      </>
    );
  }
};

export default BettingPage;
