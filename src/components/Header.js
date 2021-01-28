import React from 'react';
import {
  Divider,
  Grid,
  Input,
  Icon,
  Header as Title,
  List,
} from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';

import ContinentChart from './ContinentChart';
import DataChart from './DataChart';
import './Header.css';

import { gitUrl, statsKeys, statsTitle } from '../constants';

function Header(props) {
  let stats = 0,
    statsHistory;
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-width: 1223px)',
  });

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
          rel="noreferrer"
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

  const mobileSummaryContent = isTabletOrMobileDevice && (
    <div>
      <Title as="h3" style={{ paddingBottom: '.5rem' }}>
        <Title.Content>
          {props.filteredByContinent ? props.data[0].name : 'Global Statistics'}
        </Title.Content>
      </Title>
      <Grid columns={3} style={{ paddingBottom: '2rem' }}>
        {Object.keys(stats).map(key => {
          if (statsKeys.includes(key)) {
            const color = statsTitle[key].color;
            const style = color ? { color } : {};

            return (
              <Grid.Column key={key} style={{ paddingBottom: 0 }}>
                <b style={style}>{statsTitle[key].title}</b>
                <br />
                {stats[key].toLocaleString()}
              </Grid.Column>
            );
          }
        })}
      </Grid>
    </div>
  );

  const desktopSummaryContent = isDesktopOrLaptop && (
    <List relaxed>
      <Title as="h3" style={{ paddingBottom: '.5rem' }}>
        <Title.Content>
          {props.filteredByContinent ? props.data[0].name : 'Global Statistics'}
        </Title.Content>
      </Title>
      {Object.keys(stats).map(key => {
        if (statsKeys.includes(key)) {
          const color = statsTitle[key].color;
          const style = color ? { color } : {};

          return (
            <List.Item key={key}>
              <List.Content>
                <List.Header style={style}>{statsTitle[key].title}</List.Header>
                <List.Description>
                  {stats[key].toLocaleString()}
                </List.Description>
              </List.Content>
            </List.Item>
          );
        }
      })}
    </List>
  );

  return (
    <div className="Header" data-cy="header">
      {TitleContainer}
      <Divider />
      <div className="row space-between">
        {mobileSummaryContent}
        {desktopSummaryContent}
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

Header.propTypes = {
  data: PropTypes.array,
  filteredByContinent: PropTypes.bool,
  filterSearch: PropTypes.func,
};

export default Header;
