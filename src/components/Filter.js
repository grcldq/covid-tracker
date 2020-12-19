import { Dropdown } from 'semantic-ui-react';
import { filterContinents, sortOptions } from '../constants';

import './Filter.css';

function Filter(props) {
  return (
    <div className="row space-between">
      <div className="filter-container">
        <Dropdown
          options={filterContinents}
          placeholder="Filter Continents"
          search
          selection
          fluid
          multiple
          value={props.selectedFilters}
          onChange={props.filtersChange}
        />
      </div>
      <div className="sort-container">
        <Dropdown
          placeholder="Sort By"
          fluid
          selection
          value={props.sort}
          icon="sort"
          options={sortOptions}
          onChange={props.sortChange}
        />
      </div>
    </div>
  );
}

export default Filter;
