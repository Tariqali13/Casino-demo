import { useEffect, useState } from 'react';

export default function Bet({ authToken, role }) {
  const [games, setGames] = useState([]);
  const [gameId, setGameId] = useState('');
  const [betAmount, setBetAmount] = useState('');

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch('http://localhost:4000/games', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setGames(data);
      } else {
        alert('Failed to load games');
      }
    } catch (err) {
      console.error(err);
      alert('Error loading games');
    }
  };

  const handleBet = async (e) => {
    e.preventDefault();
    if (!authToken) return alert('Not logged in');
    if (role !== 'PLAYER') return alert('Only PLAYER can bet!');
    try {
      const res = await fetch('http://localhost:4000/games/bet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ gameId, betAmount })
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Bet placed. Result: ${data.bet.result}, Win Amount: ${data.bet.winAmount}`);
      } else {
        alert(data.message || 'Bet failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error placing bet');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Bet Page (for Players)</h1>
      <form onSubmit={handleBet}>
        <div>
          <label>Game:
            <select value={gameId} onChange={(e) => setGameId(e.target.value)}>
              <option value="">Select game</option>
              {games.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>Bet Amount:
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Place Bet</button>
      </form>
    </div>
  );
}
