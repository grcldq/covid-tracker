import { Button, Dropdown, Icon } from 'semantic-ui-react';

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
          />
        )}
      </div>
      <p>Last updated {new Date(props.updated).toLocaleString()}</p>
    </div>
  );
}

export default Filter;
