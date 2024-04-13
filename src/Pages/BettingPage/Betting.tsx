import React, { useState } from 'react'
import { IBetSlip } from './model';
import './Betting.css';
import { mockGames } from './mockData';
import PoolInfo from './Components/PoolInfo';

const BettingPage = () => {
  const [games, setGames] = useState<IBetSlip[]>(mockGames);
  const [isSendable, setIsSendable] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [wallet, setWallet] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [reachedLimit, setReachedLimit] = useState<boolean>(false);

  const pickHomeMatch = (index: number) => {
    let arr = [...games];
    let game = arr[index];
    if (!game)
      return;

    game.homePicked = !game.homePicked;
    arr[index] = game;
    setGames(arr);

    setIsSendable(!arr.some(x => !x.awayPicked && !x.homePicked && !x.drawPicked))
    setReachedLimit(calcSum(arr) >= 15)
  }

  const pickXMatch = (index: number) => {
    let arr = [...games];
    let game = arr[index];
    if (!game)
      return;

    game.drawPicked = !game.drawPicked;
    arr[index] = game;
    setGames(arr);

    setIsSendable(!arr.some(x => !x.awayPicked && !x.homePicked && !x.drawPicked))
    setReachedLimit(calcSum(arr) >= 15)

  }

  const pickAwayMatch = (index: number) => {
    let arr = [...games];
    let game = arr[index];
    if (!game)
      return;

    game.awayPicked = !game.awayPicked;
    arr[index] = game;
    setGames(arr);
    setIsSendable(!arr.some(x => !x.awayPicked && !x.homePicked && !x.drawPicked))
    setReachedLimit(calcSum(arr) >= 15)

  }

  const calcSum = (arr: IBetSlip[]) => {
    let sum = 0;
    for (let a of arr) {
      if (a.homePicked)
        sum++;
      if (a.drawPicked)
        sum++;
      if (a.awayPicked)
        sum++;
    }
    return sum;
  }

  const renderCheckboxes = (game: IBetSlip, index: number) => {
    if (reachedLimit) {
      return (
        <>
          <div className={game.homePicked ? 'checkboxBorder checked' : 'checkboxBorder disabled'} onClick={game.homePicked ? () => pickHomeMatch(index) : () => { }}>1</div>
          <div className={game.drawPicked ? 'checkboxBorder checked' : 'checkboxBorder disabled'} onClick={game.drawPicked ? () => pickXMatch(index) : () => { }}>X</div>
          <div className={game.awayPicked ? 'checkboxBorder checked' : 'checkboxBorder disabled'} onClick={game.awayPicked ? () => pickAwayMatch(index) : () => { }}>2</div>
        </>
      )
    } else {
      return (
        <>
          <div className={game.homePicked ? 'checkboxBorder checked' : 'checkboxBorder'} onClick={() => pickHomeMatch(index)}>1</div>
          <div className={game.drawPicked ? 'checkboxBorder checked' : 'checkboxBorder'} onClick={() => pickXMatch(index)}>X</div>
          <div className={game.awayPicked ? 'checkboxBorder checked' : 'checkboxBorder'} onClick={() => pickAwayMatch(index)}>2</div>
        </>
      )
    }
  }

  const send = () => {

  }

  return (
    <div className='centeralized-container'>

      <PoolInfo />
      <table className="custom-table">
        <tbody>
          {games.map((game, index) => (
            <tr key={index} className='gameBorder'>
              <td style={{ width: '20%', paddingRight: 0 }}>
                <p style={{ color: 'gray' }}>{game.league}</p>
                <img src="/" alt="" />
                <p>{game.homeTeam}</p>
              </td>
              <td valign='middle'>
                <p>vs</p>
              </td>
              <td style={{ textAlign: 'right', paddingLeft: 0, width: '20%' }}>
                <p style={{ color: 'gray' }}>{game.date}</p>
                <img src="/" alt="" />
                <p>{game.awayTeam}</p>
              </td>
              <td valign='middle'>
                <div className='checkboxContainer'>
                  {renderCheckboxes(game, index)}

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='custom-table' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <label>Code</label>
          <input type="text" className='X-form-control' placeholder='code' style={{ maxWidth: '300px' }} onChange={(e) => setCode(e.target.value)} />
          <br />
          <label>Wallet</label>
          <input type="text" className='X-form-control' placeholder='wallet' style={{ maxWidth: '300px' }} onChange={(e) => setWallet(e.target.value)} />
        </div>
        {
          isSendable && (
            <button className="bg-green-500 hover:bg-green-700 active:bg-green-800 px-4 py-2 rounded-md text-white"> Send </button>
          )
        }

        {
          !isSendable && (
            <button className="bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50"> Send </button>
          )
        }
      </div>



    </div>
  );
};

export default BettingPage;