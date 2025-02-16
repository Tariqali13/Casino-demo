import { useEffect } from 'react';
import useStatisticsStore from '../store/statisticsStore';

const AgentStatistics = () => {
  const { agentStatistics, fetchStatistics } = useStatisticsStore();

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-xl mb-4">Agent Statistics</h2>
      <ul>
        {agentStatistics.map((stat, index) => (
          <li key={index} className="border-b py-2">
            {stat.agent} - {stat.revenue} - {stat.totalBets}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentStatistics;