import { useEffect, useState } from 'react';
import { api, pageConfig } from '../constants';
import { formatContinents, formatData } from '../utils';
import useFilters from './useFilters';

const { NUMBER_OF_ROWS } = pageConfig;

const useCovidData = () => {
  const [countryData, setCountryData] = useState([]);
  const [continentsData, setContinentsData] = useState([]);
  const [globalStats, setGlobalStats] = useState([]);
  const [isFetchingGlobalStats, setIsFetchingGlobalStats] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const filters = useFilters({ countryData, continentsData });

  const fetchData = () => {
    toggleDataLoading();

    fetch(`${api}countries?sort=${filters.sort}`)
      .then(response => response.json())
      .then(responseData => {
        const data = formatData(responseData);
        const filteredData = data.slice(0, NUMBER_OF_ROWS);

        setCountryData(data);
        filters.setFilteredData(filteredData);
      })
      .catch(() => {})
      .finally(() => toggleDataLoading());

    fetch(`${api}continents?sort=${filters.sort}`)
      .then(response => response.json())
      .then(responseData => {
        const data = formatContinents(responseData);

        setContinentsData(data);
      })
      .catch(() => toggleDataLoading());
  };

  const fetchGlobalData = () => {
    let globalStats = [];
    setIsFetchingGlobalStats(true);

    Promise.all(
      [`${api}all`, `${api}historical/all?lastdays=200`].map(url =>
        fetch(url).then(response => response.json())
      )
    )
      .then(responseData => (globalStats = [...globalStats, ...responseData]))
      .catch(() => {
        console.error('Something went wrong!');
      })
      .finally(() => {
        setGlobalStats(globalStats);
        setIsFetchingGlobalStats(false);
      });
  };

  const loadMoreRows = () => {
    const {
      isCountryView,
      filteredData,
      search,
      searchFilteredData,
      isFilteredByContinent,
    } = filters;
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
    setIsLoadingMore(true);
    const updatedFilteredData = search
      ? searchFilteredData.slice(0, filteredData.length + NUMBER_OF_ROWS)
      : countryData.slice(0, filteredData.length + NUMBER_OF_ROWS);
    setTimeout(() => {
      filters.setFilteredData(updatedFilteredData);
      setIsLoadingMore(false);
    }, 1000);
  };

  const toggleDataLoading = () => {
    setIsFetchingData(prev => !prev);
  };

  useEffect(() => {
    fetchData();
    fetchGlobalData();
  }, []);

  return {
    continentsData,
    countryData,
    globalStats,
    isFetchingGlobalStats,
    isFetchingData,
    isLoadingMore,
    loadMoreRows,
    ...filters,
  };
};

export default useCovidData;
