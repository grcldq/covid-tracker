import LabelStats from './LabelStats';
import './Header.css';

import { Grid } from 'semantic-ui-react';
import { Header as Title } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react'

function Header(props) {
  return (
    <div className="Header">
      <div className="row space-between">
        <Title as="h1">COVID-19 Tracker</Title>
        <Input icon='search' placeholder='Search...' />
      </div>
      <Grid columns={6} stackable>
        <LabelStats color="black" title="Cases" total={props.stats.cases} />
        <LabelStats
          color="olive"
          title="Recovered"
          total={props.stats.recovered}
        />
        <LabelStats color="red" title="Deaths" total={props.stats.deaths} />
        <LabelStats
          color="grey"
          title="Tests Conducted"
          total={props.stats.tests}
        />
        <LabelStats
          color="yellow"
          title="Active"
          total={props.stats.active}
        />
        <LabelStats
          color="orange"
          title="Critical"
          total={props.stats.critical}
        />
      </Grid>
    </div>
  );
}

export default Header;
