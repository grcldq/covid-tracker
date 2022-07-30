import { Container, Loader } from 'semantic-ui-react';
import React from 'react';
// import Header from '../components/Header';
import Content from '../components/Content';
import Filter from '../components/Filter';
import Footer from '../components/Footer';
import useCovidData from '../hooks/useCovidData';
import './Home.css';

const Home = () => {
  const {
    continentsData,
    countryData,
    globalStats,
    isFetchingGlobalStats,
    isFilteredByContinent,
    filteredContinent,
    filter,
    filteredData,
    isCountryView,
    sortDirection,
    sort,
    handleSort,
    isFetchingData,
    handleFilterChange,
    handleSearch,
    isLoadingMore,
    loadMoreRows,
  } = useCovidData();
  const lastUpdate = globalStats.length && globalStats[0].updated;

  return (
    <Container data-cy="container">
      {isFetchingGlobalStats ? (
        <Loader active data-cy="loader" />
      ) : (
        <div>
          {/* <Header
            data={
              isFilteredByContinent
                ? continentsData.filter(item => filteredContinent === item.name)
                : globalStats
            }
            filteredByContinent={isFilteredByContinent}
            filterSearch={handleSearch}
          /> */}
          <Filter
            updated={lastUpdate}
            filter={filter}
            filtersChange={handleFilterChange}
            filteredByContinent={isFilteredByContinent}
          />
          <Content
            data={filteredData}
            loading={isFetchingData}
            loadMoreRows={loadMoreRows}
            isCountryView={isCountryView}
            isLoadingRows={isLoadingMore}
            // handleCountriesOfContinentClick={this.displayContinentCountries}
            handleSort={handleSort}
            sort={sort}
            sortDirection={sortDirection}
          />
          <Footer />
        </div>
      )}
    </Container>
  );
};

export default Home;
