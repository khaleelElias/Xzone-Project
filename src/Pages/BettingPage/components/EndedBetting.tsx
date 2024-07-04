import PoolInfo from "@/components/PoolInfo";
import { Match, MatchResult } from "../viewModel/BetslipGame";

export interface IEndedBetting {
    games: Match[];
}
export const EndedBetting = (props: IEndedBetting) => {
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
                        {props.games.map((game, index) => (
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
                                        <div className={`checkboxBorder select-none text-sm flex justify-center items-center ${game.result == MatchResult.First && 'checked'}`}>
                                            <span>1</span>
                                        </div>
                                        <div className={`checkboxBorder select-none text-sm flex justify-center items-center ${game.result == MatchResult.Equal && 'checked'}`}>
                                            <span>X</span>
                                        </div>
                                        <div className={`checkboxBorder select-none text-sm flex justify-center items-center ${game.result == MatchResult.Second && 'checked'}`}>
                                            <span>2</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="custom-table table-fix border-separate games-mobile">
                    <tbody>
                        {props.games.map((game, index) => (
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
                                        <div className={`checkboxBorder select-none text-sm flex justify-center items-center ${game.homePicked && 'checked'}`}>
                                            <span>1</span>
                                        </div>
                                        <div className={`checkboxBorder select-none text-sm flex justify-center items-center ${game.drawPicked && 'checked'}`}>
                                            <span>X</span>
                                        </div>
                                        <div className={`checkboxBorder select-none text-sm flex justify-center items-center ${game.awayPicked && 'checked'}`}>
                                            <span>2</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    );
}