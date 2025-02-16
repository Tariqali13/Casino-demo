import { useEffect, useState } from 'react';

export default function Transactions({ authToken, role }) {
  const [toUserId, setToUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (authToken) {
      loadTransactions();
    }
  }, [authToken]);

  const loadTransactions = async () => {
    try {
      const res = await fetch('http://localhost:4000/transactions', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setTransactions(data);
      } else {
        alert('Failed to load transactions');
      }
    } catch (err) {
      console.error(err);
      alert('Error loading transactions');
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/transactions/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ toUserId, amount })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Transfer successful');
        loadTransactions();
      } else {
        alert(data.message || 'Transfer failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error transferring chips');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Transactions</h1>
      {role === 'PLAYER' ? (
        <p>Players cannot transfer chips. See your bet page instead.</p>
      ) : (
        <form onSubmit={handleTransfer}>
          <div>
            <label>To User ID:
              <input
                value={toUserId}
                onChange={(e) => setToUserId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Transfer</button>
        </form>
      )}
      <h2>Your Transactions</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            Type: {tx.transactionType}, Amount: {tx.amount}, fromUser: {tx.fromUserId}, toUser: {tx.toUserId}
          </li>
        ))}
      </ul>
    </div>
  );
}
