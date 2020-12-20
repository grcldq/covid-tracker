import { Dropdown } from 'semantic-ui-react';

import { filterOptions } from '../constants';
import './Filter.css';

function Filter(props) {
  return (
    <div className="row space-between">
      <div>
        <Dropdown
          placeholder="Filter By"
          fluid
          selection
          value={props.filter}
          options={filterOptions}
          onChange={props.filtersChange}
        />
      </div>
      <p>Last updated {new Date(props.updated).toLocaleString()}</p>
    </div>
  );
}

export default Filter;
