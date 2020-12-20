import React from 'react';
import { Container, Loader } from 'semantic-ui-react';

import Header from './components/Header';
import Content from './components/Content';
import Filter from './components/Filter';
import { formatContinents, formatData } from './utils';
import { api } from './constants';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: Array(9).fill(null),
      globalStats: [],
      isFetchingData: true,
      isFetchingGlobalStats: true,
      filter: 'countries',
      sort: 'cases',
      filteredData: [],
    };
  }

  componentDidMount() {
    this.bindHandlers();
    this.fetchGlobalData();
    this.fetchData();
  }

  componentWillUnmount() {
    this.setState({ globalStats: {} });
  }

  render() {
    return (
      <Container>
        {this.state.isFetchingGlobalStats ? (
          <Loader active />
        ) : (
          <div>
            <Header stats={this.state.globalStats} />
            <Filter
              updated={this.state.data[0] && this.state.data[0].updated}
              filter={this.state.filter}
              filtersChange={this.handleFilterChange}
            />
            <Content
              data={
                this.state.filteredData.length > 0
                  ? this.state.filteredData
                  : this.state.data
              }
              loading={this.state.isFetchingData}
              isCountryView={this.state.filter === 'countries'}
            />
          </div>
        )}
      </Container>
    );
  }

  bindHandlers() {
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  fetchData(filter = this.state.filter) {
    const { sort } = this.state;

    fetch(`${api}${filter}?sort=${sort}`)
      .then(response => response.json())
      .then(responseData => {
        const data =
          filter === 'countries'
            ? formatData(responseData)
            : formatContinents(responseData);

        this.setState({ data });
      })
      .catch(() => {})
      .finally(() => this.toggleDataLoading());
  }

  fetchGlobalData() {
    fetch(`${api}all`)
      .then(response => response.json())
      .then(globalStats => this.setState({ globalStats }))
      .catch(() => {})
      .finally(() => this.setState({ isFetchingGlobalStats: false }));
  }

  handleFilterChange(e, { value }) {
    e.preventDefault();

    this.setState({ filter: value });
    this.toggleDataLoading();
    this.fetchData(value);
  }

  toggleDataLoading() {
    this.setState({ isFetchingData: !this.state.isFetchingData });
  }
}

export default App;
