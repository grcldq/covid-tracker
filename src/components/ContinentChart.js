import React from 'react';
import { Loader } from 'semantic-ui-react';
import {
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

import { formatContinentChartData } from '../utils';

class ContinentChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      totalData: [],
      currentData: [],
    };
  }

  componentDidMount() {
    let totalData = [];
    let currentData = [];

    formatContinentChartData(this.props.data)
      .then(data => {
        currentData = data[0];
        totalData = data[1];
      })
      .catch(e => {
        // TODO: error handling
      })
      .finally(() => {
        this.setState({ currentData, totalData, loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <Loader active />;
    }

    return (
      <div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={this.state.currentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="critical" fill="#b54e34" />
            <Bar dataKey="todayCases" fill="#e9a265" />
            <Bar dataKey="todayDeaths" fill="#520a1e" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={this.state.totalData} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cases" fill="#e7b14a" />
            <Bar dataKey="deaths" fill="#780000" />
            <Bar dataKey="recoveries" fill="#14755d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default ContinentChart;
