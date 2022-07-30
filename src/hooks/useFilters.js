import { useState } from 'react';
import Filter from '../constants/Filter';
import { filterByContinent, filterBySearch, sortTable } from '../utils';
import { pageConfig } from '../constants';
const { NUMBER_OF_ROWS } = pageConfig;
import Sort from '../constants/Sort';
import SortDirection from '../constants/SortDirection';

const useFilters = ({ countryData, continentsData }) => {
  const [filter, setFilter] = useState(Filter.COUNTRIES);
  const [filteredContinent, setFilteredContinent] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isCountryView, setIsCountryView] = useState(true);
  const [isFilteredByContinent, setIsFilteredByContinent] = useState(false);
  const [searchFilteredData, setSearchFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(Sort.CASES);
  const [sortDirection, setSortDirection] = useState(SortDirection.DESCENDING);

  const handleFilterChange = (e, { continent, value }) => {
    e.preventDefault();

    const countryView = value === Filter.COUNTRIES;
    let updatedData = [];

    if (countryView) {
      updatedData = continent
        ? filterByContinent(countryData, continent)
        : countryData.slice(0, NUMBER_OF_ROWS);
    } else {
      updatedData = continentsData;
    }

    setFilteredData(updatedData);
    setIsCountryView(countryView);
    setFilter(value);
    setFilteredContinent(updatedData[0].continent);
    setIsFilteredByContinent(!!continent);
  };

  const handleSearch = e => {
    e.preventDefault();

    const searchText = e.target.value;
    const rowCount =
      searchText.length === 1
        ? NUMBER_OF_ROWS
        : filteredData.length + NUMBER_OF_ROWS;
    let data = isCountryView ? countryData : continentsData;

    if (isFilteredByContinent) {
      data = filteredData;
    }

    const updatedSearchFilteredData = filterBySearch(data, searchText);
    const updatedFilteredData = updatedSearchFilteredData.slice(0, rowCount);

    setFilteredData(updatedFilteredData);
    setSearchFilteredData(updatedSearchFilteredData);
    setSearch(searchText);
  };

  const handleSort = sortProp => {
    if (sortProp === Sort.TOTAL) {
      return;
    }

    let updatedSortDirection = sortDirection;
    let data = isFilteredByContinent ? filteredData : countryData;

    if (sortProp.toLowerCase() === sort.toLowerCase()) {
      updatedSortDirection =
        updatedSortDirection === SortDirection.ASCENDING
          ? SortDirection.DESCENDING
          : SortDirection.ASCENDING;
    }

    let updatedFilterData = sortTable(data, sortProp, updatedSortDirection);

    if (!isFilteredByContinent) {
      updatedFilterData = updatedFilterData.slice(0, NUMBER_OF_ROWS);
    }

    setFilteredData(updatedFilterData);
    setSort(sortProp);
    setSortDirection(updatedSortDirection);
  };

  return {
    sort,
    isFilteredByContinent,
    filteredContinent,
    filter,
    filteredData,
    isCountryView,
    sortDirection,
    search,
    searchFilteredData,
    handleSort,
    setFilteredData,
    handleFilterChange,
    handleSearch,
  };
};

export default useFilters;
