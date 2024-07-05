import PoolInfo from "@/components/PoolInfo";
import { useContext, useState } from "react";
import { Match } from "../viewModel/BetslipGame";
import { AuthContext } from "@/context/authContext";
import { POST } from "@/services/api";
import { PaymentResult, useApp } from "@/context/appContext";
import { toast } from "react-toastify";

export interface IActiveBetting {
    betslipGameId: string;
    games: Match[];
}

type preSubmitDto = {
    gameId: string;
    predictions: betPrediction[];
}

type betPrediction = {
    matchId: string;
    first: boolean;
    equal: boolean;
    second: boolean;
}

type preSubmitViewModel = {
    betSlipId: string;
    encodedTransaction: string;
}

enum gameResultPicked {
    home,
    draw,
    away,
}

export const ActiveBetting = (props: IActiveBetting) => {

    const authContext = useContext(AuthContext);
    const MAX_BETTING_PICKS = 10;

    const [reachedLimit, setReachedLimit] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(1);
    const [isSendable, setIsSendable] = useState<boolean>(false);
    const [games, setGames] = useState<Match[]>(props.games);
    const { handlePay } = useApp();


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

    const submitBetSlip = async () => {
        if (!authContext.walletConnected()) {
            authContext.connectWallet();
            return;
        }

        let preSubmitResponse = await POST<preSubmitViewModel>('betslip/pre-submit', { gameId: props.betslipGameId, predictions: games.map((x) => ({ first: x.homePicked, equal: x.drawPicked, second: x.awayPicked, matchId: x.matchId })) } as preSubmitDto)

        if (!preSubmitResponse.success) {
            return;
        }

        let paymentResponse = await handlePay(preSubmitResponse.data.encodedTransaction) as PaymentResult;

        if (!paymentResponse.success) {
            toast.error(paymentResponse.message);
            return;
        }

        let submitResponse = await POST('betslip/submit', { betSlipId: preSubmitResponse.data.betSlipId, signature: paymentResponse.signature })

        if (!submitResponse.success) {
            //TODO: roll back payment
            //TODO: handle submit error
            return;
        }

        toast.success("Successfully created pix slip! 🚀");
    }

    const renderCheckboxes = (game: Match, index: number) => {
        let homePickedClass = game.homePicked ? " checked" : "";
        let drawPickedClass = game.drawPicked ? " checked" : "";
        let awayPickedClass = game.awayPicked ? " checked" : "";
        return (
            <>
                <div
                    className={`checkboxBorder select-none text-sm flex justify-center items-center ${!game.homePicked && reachedLimit ? " disabled" : ""} ${homePickedClass}`}
                    style={{ cursor: 'pointer' }}
                    onClick={
                        game.homePicked || !reachedLimit
                            ? () => pickMatch(index, gameResultPicked.home)
                            : () => { }
                    }
                >
                    <span>1</span>
                </div>
                <div
                    className={`checkboxBorder select-none text-sm flex justify-center items-center ${!game.drawPicked && reachedLimit ? " disabled" : ""} ${drawPickedClass}`}
                    style={{ cursor: 'pointer' }}
                    onClick={
                        game.drawPicked || !reachedLimit
                            ? () => pickMatch(index, gameResultPicked.draw)
                            : () => { }
                    }
                >
                    <span>X</span>
                </div>
                <div
                    className={`checkboxBorder select-none text-sm flex justify-center items-center ${!game.awayPicked && reachedLimit ? " disabled" : ""} ${awayPickedClass}`}
                    style={{ cursor: 'pointer' }}
                    onClick={
                        game.awayPicked || !reachedLimit
                            ? () => pickMatch(index, gameResultPicked.away)
                            : () => { }
                    }
                >
                    <span>2</span>
                </div>
            </>
        );
    };

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
                    onClick={() => submitBetSlip()}
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