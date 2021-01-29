import React from 'react';
import { Button, Dropdown, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { filterOptions } from '../constants';
import './Filter.css';

function Filter(props) {
  return (
    <div className="row space-between">
      <div>
        {props.filteredByContinent ? (
          <Button
            icon
            labelPosition="left"
            value={props.filter}
            onClick={props.filtersChange}
            data-cy="backButton"
          >
            <Icon name="arrow left" />
            Go Back
          </Button>
        ) : (
          <Dropdown
            placeholder="Filter By"
            fluid
            selection
            value={props.filter}
            options={filterOptions}
            onChange={props.filtersChange}
            data-cy="filterDropdown"
          />
        )}
      </div>
      <p>Last updated {new Date(props.updated).toLocaleString()}</p>
    </div>
  );
}

Filter.propTypes = {
  filteredByContinent: PropTypes.bool,
  filter: PropTypes.string,
  filtersChange: PropTypes.func,
  updated: PropTypes.number,
};

export default Filter;
