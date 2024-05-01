import React, { useState } from "react";
import { IBetSlip } from "./model";
import "./Betting.css";
import { mockGames } from "./mockData";
import PoolInfo from "../../components/PoolInfo";
import Walletcode from "../../components/Walletcode";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../../firebase/firebase";
import Popup from "../../components/Popup";

const BettingPage = () => {
  const MAX_BETTING_PICKS = 10;
  const [games, setGames] = useState<IBetSlip[]>(mockGames);
  const [isSendable, setIsSendable] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [wallet, setWallet] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [reachedLimit, setReachedLimit] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const pickHomeMatch = (index: number) => {
    let arr = [...games];
    let game = arr[index];
    if (!game) return;

    game.homePicked = !game.homePicked;
    arr[index] = game;
    setGames(arr);

    setIsSendable(
      !arr.some((x) => !x.awayPicked && !x.homePicked && !x.drawPicked)
    );
    setReachedLimit(calcSum(arr) >= MAX_BETTING_PICKS);
  };

  const pickXMatch = (index: number) => {
    let arr = [...games];
    let game = arr[index];
    if (!game) return;

    game.drawPicked = !game.drawPicked;
    arr[index] = game;
    setGames(arr);

    setIsSendable(
      !arr.some((x) => !x.awayPicked && !x.homePicked && !x.drawPicked)
    );
    setReachedLimit(calcSum(arr) >= MAX_BETTING_PICKS);
  };

  const pickAwayMatch = (index: number) => {
    let arr = [...games];
    let game = arr[index];
    if (!game) return;

    game.awayPicked = !game.awayPicked;
    arr[index] = game;
    setGames(arr);
    setIsSendable(
      !arr.some((x) => !x.awayPicked && !x.homePicked && !x.drawPicked)
    );
    setReachedLimit(calcSum(arr) >= MAX_BETTING_PICKS);
  };

  const calcSum = (arr: IBetSlip[]) => {
    let sum = 0;
    for (let a of arr) {
      if (a.homePicked) sum++;
      if (a.drawPicked) sum++;
      if (a.awayPicked) sum++;
    }
    return sum;
  };

  const renderCheckboxes = (game: IBetSlip, index: number) => {
    let homePickedClass = game.homePicked ? " checked" : "";
    let drawPickedClass = game.drawPicked ? " checked" : "";
    let awayPickedClass = game.awayPicked ? " checked" : "";
    return (
      <>
        <div
          className={`checkboxBorder text-sm flex justify-center items-center ${!game.homePicked && reachedLimit ? " disabled" : ""} ${homePickedClass}`}
          onClick={
            game.homePicked || !reachedLimit
              ? () => pickHomeMatch(index)
              : () => {}
          }
        >
          <span>1</span>
        </div>
        <div
          className={`checkboxBorder text-sm flex justify-center items-center ${!game.drawPicked && reachedLimit ? " disabled" : ""} ${drawPickedClass}`}
          onClick={
            game.drawPicked || !reachedLimit
              ? () => pickXMatch(index)
              : () => {}
          }
        >
          <span>X</span>
        </div>
        <div
          className={`checkboxBorder text-sm flex justify-center items-center ${!game.awayPicked && reachedLimit ? " disabled" : ""} ${awayPickedClass}`}
          onClick={
            game.awayPicked || !reachedLimit
              ? () => pickAwayMatch(index)
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
      if (!code || code.length == 0) return;

      if (!wallet || wallet.length == 0) return;
      setIsSendable(false);
      setSending(true);
      const q = query(collection(db, "codes"), where("code", "==", code));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        // doc.data() is never undefined for query doc snapshots
        let data = document.data();
        if (data.used) {
          setSending(false);
          setStatus("Your code has already been used");
          return;
        }

        await writeData();
        await updateDoc(doc(db, "codes", document.id), {
          used: true,
        });

        setSending(false);
        setStatus("You successfully created the betslip");

        return <Popup />;
      });

      setSending(false);
      setStatus("Code not found");
    } catch (error) {
      setSending(false);
      setIsSendable(true);
      setStatus("Something went wrong, please try again later");
    }
  }

  async function writeData() {
    await addDoc(collection(db, "betslips"), {
      ...games,
      wallet: wallet,
      code: code,
    });
  }

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
        <div className="flex flex-wrap gap-10 justify-center pt-2 ">
          <div className="flex flex-col rounded-md">
            <input
              type="text"
              className="X-form-control"
              placeholder="Early access code"
              style={{ maxWidth: "200px" }}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 pb-3">
            <input
              type="text"
              className="X-form-control"
              placeholder="Wallet Address"
              style={{ maxWidth: "200px" }}
              onChange={(e) => setWallet(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="centeralized-container">
        <table className="custom-table table-auto border-separate games-tablet">
          <tbody>
            {games.map((game, index) => (
              <tr key={index} className="gameBorder p-2">
                <td>
                  <div className='flex items-center gap-1 items-center'>
                    <p className='game-league text-xs md:text-sm'>
                      {game.league}
                    </p>
                    <p className="game-time text-xs">{game.date}</p>
                  </div>
                </td>
                <td>
                  <div className='flex justify-end text-xs md:text-base items-center gap-2.5'>
                    <p className='text-right'>{game.homeTeam}</p>
                    <img className="object-contain" src={game.homeTeamLogo} alt="" style={{ width: 32, height: 32 }} />
                  </div>
                </td>
                <td valign="middle" className="text-xs px-2.5 text-center">
                  <p>vs</p>
                </td>
                <td >
                  <div className='flex justify-start text-xs md:text-base items-center gap-2.5'>
                    <img className="object-contain" src={game.awayTeamLogo} alt="" style={{ width: 32, height: 32 }} />
                    <p>{game.awayTeam}</p>
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
      </div>
      <div className="centeralized-container" style={{ padding: 0 }}>
        <table className="custom-table table-fix border-separate games-mobile">
          <tbody>
            {games.map((game, index) => (
              <tr key={index} className="gameBorder p-2">
                <td>
                  <div className="flex items-center gap-4">
                    <p className="game-league text-xs">{game.league}</p>
                    <p className="game-time text-xs">{game.date}</p>
                  </div>

                  <div className='flex text-xs font-semibold items-center gap-1.5' style={{ paddingTop: '10px' }}>
                    <p>{game.homeTeam}</p>
                    <img className="object-contain" src={game.homeTeamLogo} alt="" style={{ width: 16, height: 16 }} />
                    <p style={{ whiteSpace: 'pre' }}>   -   </p>
                    <img className="object-contain" src={game.awayTeamLogo} alt="" style={{ width: 16, height: 16 }} />
                    <p>{game.awayTeam}</p>
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
        {isSendable && (
          <button
            className="bg-green-500 hover:bg-green-700 active:bg-green-800 px-4 py-2 rounded-md text-white"
            onClick={send}
          >
            {" "}
            Create My PIX Slip{" "}
          </button>
        )}

        {!isSendable && (
          <button className="bg-[#e4e4e4] py-2 px-7 mx-4 rounded-full" disabled>
            {" "}
            Create My PIX Slip
          </button>
        )}
      </div>
    </>
  );
};

export default BettingPage;
