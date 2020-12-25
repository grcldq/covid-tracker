import React from 'react';
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

class DataChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      chartData: [],
    };
  }

  componentDidMount() {
    let chartData = [];

    formatGlobalChartData(this.props.data)
      .then(data => (chartData = data))
      .catch(e => {
        // TODO: error handling
      })
      .finally(() => {
        this.setState({ chartData, loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <Loader active />;
    }

    return (
      <ResponsiveContainer width="70%" height={300}>
        <AreaChart data={this.state.chartData}>
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
      </ResponsiveContainer>
    );
  }
}

export default DataChart;
