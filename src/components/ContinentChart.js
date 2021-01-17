import React from 'react';
import { Loader } from 'semantic-ui-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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

    const displayHorizontal = this.props.row ? true : false;

    return (
      <div style={displayHorizontal ? { display: 'flex', flex: 1 } : {}}>
        <ResponsiveContainer
          width="100%"
          height={displayHorizontal ? 300 : 250}
        >
          <BarChart data={this.state.currentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name">
              <Label
                value="Historical Data Today"
                offset={-2}
                position="insideBottom"
              />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Bar dataKey="population" fill="#b54e34" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer
          width="100%"
          height={displayHorizontal ? 300 : 250}
        >
          <BarChart data={this.state.totalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name">
              <Label
                value="Historical Data (From the beginning)"
                offset={-2}
                position="insideBottom"
              />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Bar dataKey="population" fill="#e7b14a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default ContinentChart;
