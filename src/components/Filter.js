import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { filterOptions } from '../constants';
import FilterTypes from '../constants/FilterTypes';
import './Filter.css';

const Filter = ({
  filter,
  filteredContinent,
  isFilteredByContinent,
  onFilterBtnClick,
  updated,
}) => {
  const highlightBtn =
    (filter === FilterTypes.COUNTRIES && !isFilteredByContinent) ||
    filter === FilterTypes.CONTINENTS;

  return (
    <div className="row space-between">
      <div className="row">
        {filterOptions.map(option => (
          <Button
            key={option.key}
            className="filter-button"
            primary={option.value === filter && highlightBtn}
            onClick={() => onFilterBtnClick({ filterOption: option.value })}
          >
            {option.text}
          </Button>
        ))}
        {isFilteredByContinent && filteredContinent && (
          <div className="filter-country-container">
            <Header as="h4" color="blue" className="filter-country">
              Countries in {filteredContinent}
            </Header>
          </div>
        )}
      </div>
      <p>Last updated {new Date(updated).toLocaleString()}</p>
    </div>
  );
};

Filter.propTypes = {
  filteredContinent: PropTypes.string,
  filter: PropTypes.string,
  onFilterBtnClick: PropTypes.func,
  updated: PropTypes.number,
  isFilteredByContinent: PropTypes.bool,
};

export default Filter;
