import React, { useState } from "react";
import { IBetSlip } from "./model";
import "./Betting.css";
import { mockGames } from "./mockData";
import PoolInfo from "./Components/PoolInfo";
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
import Popup from "./Components/Popup";

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
    if (reachedLimit) {
      return (
        <>
          <div
            className={
              game.homePicked
                ? "checkboxBorder checked"
                : "checkboxBorder disabled"
            }
            onClick={game.homePicked ? () => pickHomeMatch(index) : () => {}}
          >
            1
          </div>
          <div
            className={
              game.drawPicked
                ? "checkboxBorder checked"
                : "checkboxBorder disabled"
            }
            onClick={game.drawPicked ? () => pickXMatch(index) : () => {}}
          >
            X
          </div>
          <div
            className={
              game.awayPicked
                ? "checkboxBorder checked"
                : "checkboxBorder disabled"
            }
            onClick={game.awayPicked ? () => pickAwayMatch(index) : () => {}}
          >
            2
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className={
              game.homePicked ? "checkboxBorder checked" : "checkboxBorder"
            }
            onClick={() => pickHomeMatch(index)}
          >
            1
          </div>
          <div
            className={
              game.drawPicked ? "checkboxBorder checked" : "checkboxBorder"
            }
            onClick={() => pickXMatch(index)}
          >
            X
          </div>
          <div
            className={
              game.awayPicked ? "checkboxBorder checked" : "checkboxBorder"
            }
            onClick={() => pickAwayMatch(index)}
          >
            2
          </div>
        </>
      );
    }
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
      <div className="background">
        <div className="flex justify-center items-center">
          <img
            src="/images/logo.png"
            alt="logo"
            className="cursor-pointer p-9 h-40  w-20 md:w-10 lg:w-48"
          />
        </div>

        <div className=" flex justify-center items-center">
          <div className="grid grid-cols-2 gap-1">
            <div>
              <img
                src="/images/user.png"
                alt="logo"
                className="cursor-pointer"
              />
            </div>
            <div>01</div>
            <div>09</div>
          </div>
        </div>
        <PoolInfo />

        <div className="flex flex-wrap gap-4 justify-center pt-5">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="X-form-control"
              placeholder="code"
              style={{ maxWidth: "200px" }}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="X-form-control"
              placeholder="wallet"
              style={{ maxWidth: "200px" }}
              onChange={(e) => setWallet(e.target.value)}
            />
          </div>
        </div>
        <div className="centeralized-container">
          <table className="custom-table">
            <tbody>
              {games.map((game, index) => (
                <tr key={index} className="gameBorder">
                  <td style={{ width: "20%", paddingRight: 0 }}>
                    <p style={{ color: "gray" }}>{game.league}</p>
                    <img src="/" alt="" />
                    <p>{game.homeTeam}</p>
                  </td>
                  <td valign="middle">
                    <p>vs</p>
                  </td>
                  <td
                    style={{ textAlign: "right", paddingLeft: 0, width: "20%" }}
                  >
                    <p style={{ color: "gray" }}>{game.date}</p>
                    <img src="/" alt="" />
                    <p>{game.awayTeam}</p>
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

          <div>
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
              <button
                className="bg-[#e4e4e4] py-2 px-7 m-6 mx-4 rounded-full"
                disabled
              >
                {" "}
                Create My PIX Slip
              </button>
            )}
          </div>

          <div
            className="custom-table"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p>{status}</p>
            {sending && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BettingPage;
