import { useState } from 'react';
import useGameStore from '../store/gameStore';

export default function Game() {
  const { balance, betAmount, setBetAmount, playGame, gameResult } = useGameStore();
  const [gameId] = useState(1);

  const handlePlay = () => {
    if (betAmount > 0) playGame(gameId, betAmount);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-xl mb-4">Casino Game</h2>
      <p>Balance: ${balance}</p>
      <input
        type="number"
        placeholder="Enter Bet Amount"
        className="p-2 border mt-2"
        onChange={(e) => setBetAmount(Number(e.target.value))}
      />
      <button className="bg-green-500 text-white p-2 mt-4" onClick={handlePlay}>
        Play
      </button>
      {gameResult && (
        <p className="mt-4 text-lg">{gameResult.result === 'win' ? `You won $${gameResult.winAmount}!` : 'You lost, try again!'}</p>
      )}
    </div>
  );
}