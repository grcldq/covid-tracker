import { useEffect, useState } from 'react';

const useStats = ({ data, filteredByContinent }) => {
  const [stats, setStats] = useState();
  const [statsHistory, setStatsHistory] = useState(data.totalStats);

  useEffect(() => {
    if (filteredByContinent) {
      const [{ currentStats, totalStats }] = data;

      setStats({
        active: currentStats[0].value,
        cases: totalStats[0].value,
        critical: currentStats[1].value,
        deaths: totalStats[2].value,
        recovered: totalStats[1].value,
        tests: 'n/a -',
      });
    } else {
      const [currentStats, totalStats] = data;

      setStats(currentStats);
      setStatsHistory(totalStats);
    }
  }, [data]);

  return { stats, statsHistory };
};

export default useStats;
