import { Divider, Input, Icon, Header as Title, List } from 'semantic-ui-react';

import ContinentChart from './ContinentChart';
import DataChart from './DataChart';
import './Header.css';

import { gitUrl, statsKeys, statsTitle } from '../constants';

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

  const TitleContainer = (
    <div className="row space-between">
      <Title as="h2" data-cy="title">
        <Icon name="chart line" />
        <Title.Content>COVID-19 Tracker</Title.Content>
      </Title>
      <div className="row flex-horizontal">
        <a
          href={gitUrl}
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

        <div style={{ flex: 1 }}>
          <Input
            icon="search"
            placeholder="Search..."
            onChange={props.filterSearch}
            data-cy="search"
            fluid
            style={{ minWidth: '250px' }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="Header" data-cy="header">
      {TitleContainer}
      <Divider />
      <div className="row space-between">
        <List divided relaxed>
          <Title as="h3" style={{ paddingBottom: '.5rem' }}>
            <Title.Content>
              {props.filteredByContinent
                ? props.data[0].name
                : 'Global Statistics'}{' '}
            </Title.Content>
          </Title>
          {Object.keys(stats).map(key => {
            if (statsKeys.includes(key)) {
              return (
                <List.Item key={key}>
                  <List.Content>
                    <List.Header>{statsTitle[key]}</List.Header>
                    <List.Description>
                      {stats[key].toLocaleString()}
                    </List.Description>
                  </List.Content>
                </List.Item>
              );
            }
          })}
        </List>
        {props.filteredByContinent ? (
          <ContinentChart
            data={[props.data[0].currentStats, props.data[0].totalStats]}
          />
        ) : (
          <DataChart data={statsHistory} />
        )}
      </div>
    </div>
  );
}

export default Header;
