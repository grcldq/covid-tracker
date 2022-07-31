import React, { useState } from 'react';
import { Grid, Input, Icon, Header as Title, Button } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import DataChart from './DataChart';
import './Header.css';

import { gitUrl, statsKeys, statsTitle } from '../constants';
import useStats from '../hooks/useStats';

const Header = ({ filteredByContinent, data, filterSearch, lastUpdate }) => {
  const [showChart, setShowChart] = useState(false);
  const { stats, statsHistory } = useStats({ data, filteredByContinent });
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const RenderHeaderTitle = () => (
    <div className="header--row row space-between header--top-bar">
      <Title as="h3" data-cy="title" inverted className="header--title">
        <Icon name="chart line" />
        <Title.Content>COVID-19 Tracker</Title.Content>
      </Title>
      <div className="header--row row flex-horizontal">
        <a
          href={gitUrl}
          target="_blank"
          rel="noreferrer"
          className="header--icon-btn"
        >
          <Button icon size="mini">
            <Icon color="black" name="github" />
          </Button>
        </a>

        <div style={{ flex: 1 }}>
          <Input
            icon="search"
            placeholder="Search..."
            onChange={filterSearch}
            data-cy="search"
            fluid
            style={{ minWidth: '250px' }}
            inverted
            size="mini"
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="header--grid-container">
      <Grid
        style={{
          justifyContent: isMobile ? 'flex-start' : 'center',
        }}
        className="header--grid"
      >
        {stats &&
          Object.keys(stats).map(key => {
            if (statsKeys.includes(key)) {
              const color = statsTitle[key].color;
              const style = color ? { color } : {};

              return (
                <Grid.Column
                  key={key}
                  className="header--grid-col"
                  mobile={5}
                  tablet={2}
                  computer={2}
                >
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

  const renderGlobalStatsHeader = () => (
    <div className="header--global-stats">
      <Title as="h3">
        <Title.Content>
          {filteredByContinent ? data[0].name : 'Global Statistics'}
        </Title.Content>
      </Title>
      <Title sub className="header--date">
        as of{' '}
        {new Date(lastUpdate).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </Title>
      {!filteredByContinent && (
        <Button
          size="mini"
          icon={showChart ? 'hide' : 'unhide'}
          content={showChart ? 'Hide Chart' : 'Show Chart'}
          onClick={() => setShowChart(showChart => !showChart)}
          className="header--chart-btn"
        />
      )}
    </div>
  );

  return (
    <div className="Header" data-cy="header">
      {RenderHeaderTitle()}
      {renderGlobalStatsHeader()}
      {renderSummary()}
      {showChart && !filteredByContinent && <DataChart data={statsHistory} />}
    </div>
  );
};

Header.propTypes = {
  data: PropTypes.array,
  filteredByContinent: PropTypes.bool,
  filterSearch: PropTypes.func,
  lastUpdate: PropTypes.string,
};

export default Header;
