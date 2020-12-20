import { Grid, Input, Header as Title } from 'semantic-ui-react';

import GlobalStats from './GlobalStats';
import DataChart from './DataChart';
import './Header.css';

function Header(props) {
  const [ dailyStats, statsHistory ] = props.data;

  return (
    <div className="Header">
      <div className="row space-between">
        <Title as="h1">COVID-19 Tracker</Title>
        <Input icon="search" placeholder="Search..." />
      </div>
      <div className="row space-between">
        <Grid columns={1} stackable padded="vertically">
          <GlobalStats color="yellow" title="Cases" total={dailyStats.cases} />
          <GlobalStats
            color="olive"
            title="Recovered"
            total={dailyStats.recovered}
          />
          <GlobalStats color="red" title="Deaths" total={dailyStats.deaths} />
          <GlobalStats
            color="grey"
            title="Tests Conducted"
            total={dailyStats.tests}
          />
          <GlobalStats
            color="black"
            title="Active"
            total={dailyStats.active}
          />
          <GlobalStats
            color="orange"
            title="Critical"
            total={dailyStats.critical}
          />
        </Grid>
        <DataChart data={statsHistory} />
      </div>
    </div>
  );
}

export default Header;
