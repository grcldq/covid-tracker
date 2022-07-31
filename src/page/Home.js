import { Button, Container, Loader } from 'semantic-ui-react';
import React from 'react';
import Header from '../components/Header';
import Content from '../components/Content';
import Filter from '../components/Filter';
import Footer from '../components/Footer';
import useCovidData from '../hooks/useCovidData';
import { pageConfig } from '../constants';
import './Home.css';

const { NUMBER_OF_ROWS } = pageConfig;

const Home = () => {
  const {
    continentsData,
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
    filterByContinentCountries,
  } = useCovidData();
  const lastUpdate = globalStats.length && globalStats[0].updated;

  return (
    <>
      {isFetchingGlobalStats ? (
        <Loader active data-cy="loader" />
      ) : (
        <div>
          <Header
            data={
              isFilteredByContinent
                ? continentsData.filter(item => filteredContinent === item.name)
                : globalStats
            }
            lastUpdate={lastUpdate}
            filteredByContinent={isFilteredByContinent}
            filterSearch={handleSearch}
          />
          <Container className='home--container'>
            <Filter
              filter={filter}
              filteredContinent={filteredContinent}
              isFilteredByContinent={isFilteredByContinent}
              onFilterBtnClick={handleFilterChange}
            />
            <Content
              data={filteredData}
              loading={isFetchingData}
              isCountryView={isCountryView}
              isLoadingRows={isLoadingMore}
              handleFilterByContinentCountries={filterByContinentCountries}
              handleSort={handleSort}
              sort={sort}
              sortDirection={sortDirection}
            />
            {filteredData.length >= NUMBER_OF_ROWS && (
              <div className="home--load-more-btn-container">
                <Button
                  size="mini"
                  icon="refresh"
                  content="Load More"
                  onClick={loadMoreRows}
                  secondary
                  disabled={isLoadingMore}
                />
              </div>
            )}
          </Container>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
