import React from 'react';
import { Container, Loader } from 'semantic-ui-react';

import Header from './components/Header';
import Content from './components/Content';
import Filter from './components/Filter';
import { formatData } from './utils';
import { api } from './constants';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countryData: Array(9).fill(null),
      globalStats: [],
      isFetchingCountryData: true,
      isFetchingGlobalStats: true,
      sort: 'cases',
      filteredData: [],
    };
  }

  componentDidMount() {
    this.bindHandlers();
    this.fetchGlobalData();
    this.fetchCountryData();
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
              sort={this.state.sort}
              filtersAddition={this.handleFilterAddition}
              filtersChange={this.handleFilterChange}
              selectedFilters={this.state.selectedFilters}
              sortChange={this.handleSortChange}
            />
            <Content
              data={
                this.state.filteredData.length > 0
                  ? this.state.filteredData
                  : this.state.countryData
              }
              loading={this.state.isFetchingCountryData}
            />
          </div>
        )}
      </Container>
    );
  }

  bindHandlers() {
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  fetchCountryData() {
    fetch(`${api}countries?sort=${this.state.sort}`)
      .then(response => response.json())
      .then(data => {
        const countryData = formatData(data);

        this.setState({ countryData });
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
    const filteredData = this.state.countryData.filter(result =>
      value.includes(result.continent.toLowerCase())
    );

    this.setState({
      filteredData,
      selectedFilters: value,
    });
  }

  handleSortChange(e, { value }) {
    e.preventDefault();

    this.toggleDataLoading();
    this.setState({ sort: value }, () => this.fetchCountryData());
  }

  toggleDataLoading() {
    this.setState({ isFetchingCountryData: !this.state.isFetchingCountryData });
    console.log(this.state.isFetchingCountryData);
  }
}

export default App;
