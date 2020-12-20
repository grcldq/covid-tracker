import { Grid, Input, Header as Title } from 'semantic-ui-react';

import GlobalStats from './GlobalStats';
import './Header.css';

function Header(props) {
  return (
    <div className="Header">
      <div className="row space-between">
        <Title as="h1">COVID-19 Tracker</Title>
        <Input icon="search" placeholder="Search..." />
      </div>
      <Grid columns={1} stackable padded="vertically">
        <GlobalStats color="yellow" title="Cases" total={props.stats.cases} />
        <GlobalStats
          color="olive"
          title="Recovered"
          total={props.stats.recovered}
        />
        <GlobalStats color="red" title="Deaths" total={props.stats.deaths} />
        <GlobalStats
          color="grey"
          title="Tests Conducted"
          total={props.stats.tests}
        />
        <GlobalStats color="black" title="Active" total={props.stats.active} />
        <GlobalStats
          color="orange"
          title="Critical"
          total={props.stats.critical}
        />
      </Grid>
    </div>
  );
}

export default Header;
