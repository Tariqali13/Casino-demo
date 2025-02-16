import { useEffect, useState } from 'react';
import axios from '../utils/api';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/transactions/user');
        setTransactions(response.data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-xl mb-4">Transaction History</h2>
      <ul>
        {transactions.map((tx, index) => (
          <li key={index} className="border-b py-2">
            {tx.type} - ${tx.amount} ({tx.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;