import React from 'react';
import { Container, Loader } from 'semantic-ui-react';

import Header from './components/Header';
import Content from './components/Content';
import Filter from './components/Filter';
import { formatContinents, formatData } from './utils';
import { api, pageConfig } from './constants';

import './App.css';

const { NUMBER_OF_ROWS } = pageConfig;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      globalStats: [],
      isFetchingData: true,
      isFetchingGlobalStats: true,
      isLoadingMoreData: false,
      isCountryView: true,
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
            <Header data={this.state.globalStats} />
            <Filter
              updated={this.state.data[0] && this.state.data[0].updated}
              filter={this.state.filter}
              filtersChange={this.handleFilterChange}
            />
            <Content
              data={this.state.filteredData}
              loading={this.state.isFetchingData}
              loadMoreRows={this.loadMoreRows}
              isCountryView={this.state.isCountryView}
              isLoadingRows={this.state.isLoadingMoreData}
            />
          </div>
        )}
      </Container>
    );
  }

  bindHandlers() {
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
  }

  fetchData(filter = this.state.filter) {
    const { sort } = this.state;

    fetch(`${api}${filter}?sort=${sort}`)
      .then(response => response.json())
      .then(responseData => {
        const data = this.state.isCountryView
          ? formatData(responseData)
          : formatContinents(responseData);
        const filteredData = this.state.isCountryView
          ? data.slice(0, NUMBER_OF_ROWS)
          : data;

        this.setState({ data, filteredData });
      })
      .catch(() => {})
      .finally(() => this.toggleDataLoading());
  }

  fetchGlobalData() {
    let globalStats = [];

    Promise.all(
      [`${api}all`, `${api}historical/all?lastdays=20`].map(url =>
        fetch(url).then(response => response.json())
      )
    )
      .then(responseData => (globalStats = [...globalStats, ...responseData]))
      .catch(e => {
        //TODO error handling
      })
      .finally(() => {
        this.setState({ globalStats, isFetchingGlobalStats: false });
      });
  }

  handleFilterChange(e, { value }) {
    e.preventDefault();

    this.setState({ isCountryView: value === 'countries', filter: value });
    this.toggleDataLoading();
    this.fetchData(value);
  }

  loadMoreRows() {
    if (
      !this.state.isCountryView ||
      this.state.filteredData.length === this.state.data.length
    ) {
      return;
    }

    this.setState({ isLoadingMoreData: true });

    const filteredData = this.state.data.slice(
      0,
      this.state.filteredData.length + NUMBER_OF_ROWS
    );

    setTimeout(() => {
      this.setState({ filteredData, isLoadingMoreData: false });
    }, 1000);
  }

  toggleDataLoading() {
    this.setState({ isFetchingData: !this.state.isFetchingData });
  }
}

export default App;
