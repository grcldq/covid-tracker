import React from 'react';
import { Container, Loader } from 'semantic-ui-react';

import Header from './components/Header';
import Content from './components/Content';
import Filter from './components/Filter';
import Footer from './components/Footer';
import {
  filterByContinent,
  filterBySearch,
  formatContinents,
  formatContinentName,
  formatData,
  sortTable,
} from './utils';
import { api, pageConfig } from './constants';

import './App.css';

const { NUMBER_OF_ROWS } = pageConfig;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countryData: [],
      continentsData: [],
      filter: 'countries',
      filteredContinent: '',
      filteredData: [],
      globalStats: [],
      isCountryView: true,
      isFilteredByContinent: false,
      isFetchingData: true,
      isFetchingGlobalStats: true,
      isLoadingMoreData: false,
      search: '',
      searchFilteredData: [],
      sort: 'cases',
      sortDirection: 'descending',
    };
  }

  componentDidMount() {
    this.bindHandlers();
    this.fetchGlobalData();
    this.fetchData();
  }

  componentWillUnmount() {
    this.setState({
      countryData: [],
      continentsData: [],
      filter: 'countries',
      filteredData: [],
      isCountryView: true,
      isFilteredByContinent: false,
    });
  }

  render() {
    return (
      <Container data-cy="container">
        {this.state.isFetchingGlobalStats ? (
          <Loader active data-cy="loader" />
        ) : (
          <div>
            <Header
              data={
                this.state.isFilteredByContinent
                  ? this.state.continentsData.filter(
                      item => this.state.filteredContinent === item.name
                    )
                  : this.state.globalStats
              }
              filteredByContinent={this.state.isFilteredByContinent}
              filterSearch={this.handleSearch}
            />
            <Filter
              updated={
                this.state.countryData[0] && this.state.countryData[0].updated
              }
              filter={this.state.filter}
              filtersChange={this.handleFilterChange}
              filteredByContinent={this.state.isFilteredByContinent}
            />
            <Content
              data={this.state.filteredData}
              loading={this.state.isFetchingData}
              loadMoreRows={this.loadMoreRows}
              isCountryView={this.state.isCountryView}
              isLoadingRows={this.state.isLoadingMoreData}
              handleCountriesOfContinentClick={this.displayContinentCountries}
              handleSort={this.handleSort}
              sort={this.state.sort}
              sortDirection={this.state.sortDirection}
            />
            <Footer />
          </div>
        )}
      </Container>
    );
  }

  bindHandlers() {
    this.displayContinentCountries = this.displayContinentCountries.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
  }

  displayContinentCountries(e) {
    const continent = e && formatContinentName(e.target.dataset.continent);

    this.handleFilterChange(e, { continent, value: 'countries' });
  }

  fetchData() {
    const { sort } = this.state;

    fetch(`${api}countries?sort=${sort}`)
      .then(response => response.json())
      .then(responseData => {
        const data = formatData(responseData);
        const filteredData = data.slice(0, NUMBER_OF_ROWS);

        this.setState({ countryData: data, filteredData });
      })
      .catch(() => {})
      .finally(() => this.toggleDataLoading());

    fetch(`${api}continents?sort=${sort}`)
      .then(response => response.json())
      .then(responseData => {
        const data = formatContinents(responseData);

        this.setState({ continentsData: data });
      })
      .catch(() => {});
  }

  fetchGlobalData() {
    let globalStats = [];

    Promise.all(
      [`${api}all`, `${api}historical/all?lastdays=200`].map(url =>
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

  handleFilterChange(e, { continent, value }) {
    e.preventDefault();

    const isCountryView = value === 'countries';
    let filteredData = [];

    if (isCountryView) {
      filteredData = continent
        ? filterByContinent(this.state.countryData, continent)
        : this.state.countryData.slice(0, NUMBER_OF_ROWS);
    } else {
      filteredData = this.state.continentsData;
    }

    this.setState({
      filteredData,
      isCountryView,
      filter: value,
      filteredContinent: filteredData[0].continent,
      isFilteredByContinent: continent ? true : false,
    });
  }

  handleSearch(e) {
    e.preventDefault();

    const searchText = e.target.value;
    const rowCount =
      searchText.length === 1
        ? NUMBER_OF_ROWS
        : this.state.filteredData.length + NUMBER_OF_ROWS;
    let data = this.state.isCountryView
      ? this.state.countryData
      : this.state.continentsData;

    if (this.state.isFilteredByContinent) {
      data = this.state.filteredData;
    }

    const searchFilteredData = filterBySearch(data, searchText);
    const filteredData = searchFilteredData.slice(0, rowCount);

    this.setState({ searchFilteredData, filteredData, search: searchText });
  }

  handleSort(sort) {
    let sortDirection = this.state.sortDirection;

    if (sort === this.state.sort) {
      sortDirection =
        this.state.sort === 'ascending' ? 'descending' : 'ascending';
    }

    sortTable(this.state.filteredData, sort, sortDirection);
  }

  loadMoreRows() {
    const {
      isCountryView,
      filteredData,
      search,
      searchFilteredData,
      countryData,
      continentsData,
      isFilteredByContinent,
    } = this.state;

    // return if continents view
    if (
      !isCountryView ||
      isFilteredByContinent ||
      filteredData.length === continentsData.length
    ) {
      return;
    }

    // return if filtered length doesn't need more loading
    if (
      (search && searchFilteredData.length <= NUMBER_OF_ROWS) ||
      (search && searchFilteredData.length === filteredData.length)
    )
      return;

    this.setState({ isLoadingMoreData: true });

    const updatedFilteredData = search
      ? searchFilteredData.slice(0, filteredData.length + NUMBER_OF_ROWS)
      : countryData.slice(0, filteredData.length + NUMBER_OF_ROWS);

    setTimeout(() => {
      this.setState({
        filteredData: updatedFilteredData,
        isLoadingMoreData: false,
      });
    }, 1000);
  }

  toggleDataLoading() {
    this.setState({ isFetchingData: !this.state.isFetchingData });
  }
}

export default App;
