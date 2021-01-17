import { Divider, Grid, Input, Icon, Header as Title } from 'semantic-ui-react';

import GlobalStats from './GlobalStats';
import ContinentChart from './ContinentChart';
import DataChart from './DataChart';
import './Header.css';

function Header(props) {
  let stats = 0,
    statsHistory;

  if (props.filteredByContinent) {
    const { currentStats, totalStats } = props.data[0];

    stats = {
      active: currentStats[0].value,
      cases: totalStats[0].value,
      critical: currentStats[1].value,
      deaths: totalStats[2].value,
      recovered: totalStats[1].value,
      tests: 'n/a -',
    };
  } else {
    const [currentStats, totalStats] = props.data;

    stats = currentStats;
    statsHistory = totalStats;
  }

  return (
    <div className="Header">
      <div className="row space-between">
        <Title as="h1">
          <Icon name="chart line" />
          <Title.Content>COVID-19 Tracker</Title.Content>
        </Title>
        <div style={{ flex: 1 }}>
          <a
            href="https://github.com/grcldq/covid-tracker"
            target="_blank"
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'flex-end',
              marginRight: '1rem',
            }}
          >
            <Icon name="github" size="large" />
          </a>
        </div>
        <Input
          icon="search"
          placeholder="Search..."
          onChange={props.filterSearch}
        />
      </div>
      <Divider />
      <div className="row space-between">
        <div className="col space-between" style={{ alignSelf: 'center' }}>
          <Grid columns={1} stackable padded="vertically">
            <Title as="h2" style={{ paddingBottom: '.5rem' }}>
              <Title.Content>
                {props.filteredByContinent
                  ? props.data[0].name
                  : 'Global Statistics'}{' '}
              </Title.Content>
            </Title>
            <GlobalStats
              color="black"
              title="Tests Conducted"
              total={stats.tests}
            />
            <GlobalStats color="yellow" title="Cases" total={stats.cases} />
            <GlobalStats
              color="olive"
              title="Recovered"
              total={stats.recovered}
            />
            <GlobalStats color="grey" title="Active" total={stats.active} />
            <GlobalStats color="red" title="Deaths" total={stats.deaths} />
            <GlobalStats
              color="orange"
              title="Critical"
              total={stats.critical}
            />
          </Grid>
        </div>
        {props.filteredByContinent ? (
          <ContinentChart
            data={[props.data[0].currentStats, props.data[0].totalStats]}
            row={true}
          />
        ) : (
          <DataChart data={statsHistory} />
        )}
      </div>
    </div>
  );
}

export default Header;
