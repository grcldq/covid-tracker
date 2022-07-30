import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

import { formatGlobalChartData } from '../utils';

const DataChart = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let updatedChartData = [];

    data &&
      formatGlobalChartData(data)
        .then(data => {
          updatedChartData = data;
        })
        .catch(() => {
          console.error('Something went wrong!');
        })
        .finally(() => {
          setLoading(false);
          setChartData(updatedChartData);
        });
  }, [data]);

  if (loading) {
    return <Loader active />;
  }

  const content = (
    <AreaChart data={chartData}>
      <defs>
        <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#f4aa69" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#f4aa69" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorDeaths" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ca2020" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ca2020" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#9cc98b" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#9cc98b" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" />
      <CartesianGrid strokeDasharray="3 3" />
      <Legend verticalAlign="top" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="cases"
        stroke="#f29544"
        fillOpacity={1}
        fill="url(#colorCases)"
      />
      <Area
        type="monotone"
        dataKey="deaths"
        stroke="#c50808"
        fillOpacity={1}
        fill="url(#colorDeaths)"
      />
      <Area
        type="monotone"
        dataKey="recovered"
        stroke="#84bc6f"
        fillOpacity={1}
        fill="url(#colorRecovered)"
      />
    </AreaChart>
  );

  return <ResponsiveContainer height={280}>{content}</ResponsiveContainer>;
};

DataChart.propTypes = {
  data: PropTypes.object,
};

export default DataChart;
