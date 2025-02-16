import { useEffect } from 'react';
import useFinancialStore from '../store/financialStore';

const FinancialReport = () => {
  const { financialData, fetchFinancialData } = useFinancialStore();

  useEffect(() => {
    fetchFinancialData();
  }, [fetchFinancialData]);

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-xl mb-4">Financial Report</h2>
      <ul>
        {financialData.map((report, index) => (
          <li key={index} className="border-b py-2">
            {report.month} - Revenue: {report.revenue} - Expenses: {report.expenses}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialReport;