import { Grid, Input, Icon, Header as Title } from 'semantic-ui-react';

import GlobalStats from './GlobalStats';
import DataChart from './DataChart';
import './Header.css';

function Header(props) {
  const [dailyStats, statsHistory] = props.data;

  return (
    <div className="Header">
      <div className="row space-between">
        <Title as="h1">
          <Icon name="chart line" />
          <Title.Content>COVID-19 Tracker</Title.Content>
        </Title>
        <Input icon="search" placeholder="Search..." />
      </div>
      <div className="row space-between">
        <div className="col space-between">
          <div style={{ flex: 1 }}>
            <a
              href="https://github.com/grcldq/covid-tracker"
              target="_blank"
              style={{
                display: 'flex',
                alignContent: 'center',
                marginTop: '1rem',
              }}
            >
              <Icon name="github" size="large" />
              <p>GitHub</p>
            </a>
          </div>
          <Grid columns={1} stackable padded="vertically">
            <Title as="h2" style={{ paddingBottom: '.5rem' }}>
              <Title.Content>Global Statistics</Title.Content>
            </Title>
            <GlobalStats
              color="black"
              title="Tests Conducted"
              total={dailyStats.tests}
            />
            <GlobalStats
              color="yellow"
              title="Cases"
              total={dailyStats.cases}
            />
            <GlobalStats
              color="olive"
              title="Recovered"
              total={dailyStats.recovered}
            />
            <GlobalStats
              color="grey"
              title="Active"
              total={dailyStats.active}
            />
            <GlobalStats color="red" title="Deaths" total={dailyStats.deaths} />
            <GlobalStats
              color="orange"
              title="Critical"
              total={dailyStats.critical}
            />
          </Grid>
        </div>
        <DataChart data={statsHistory} />
      </div>
    </div>
  );
}

export default Header;
