import React, { useState } from 'react';
import { Grid, Input, Icon, Header as Title, Button } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import DataChart from './DataChart';
import './Header.css';

import { gitUrl, statsKeys, statsTitle } from '../constants';
import useStats from '../hooks/useStats';

const Header = ({ filteredByContinent, data, filterSearch }) => {
  const [showChart, setShowChart] = useState(false);
  const { stats, statsHistory } = useStats({ data, filteredByContinent });
  const isMobile = useMediaQuery({
    query: '(max-width: 1268px)',
  });

  const RenderHeaderTitle = () => (
    <div className="row space-between">
      <Title as="h3" data-cy="title">
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
          <Button icon>
            <Icon color='black' name="github" />
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
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <Grid
      style={{
        paddingBottom: '2rem',
        justifyContent: isMobile ? 'flex-start' : 'center',
      }}
    >
      {stats &&
        Object.keys(stats).map(key => {
          if (statsKeys.includes(key)) {
            const color = statsTitle[key].color;
            const style = color ? { color } : {};

            return (
              <Grid.Column
                key={key}
                style={{ paddingBottom: 0 }}
                mobile={5}
                tablet={4}
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
  );

  const renderGlobalStatsHeader = () => (
    <div style={{ paddingBottom: '.5rem', textAlign: 'center' }}>
      <Title as="h3">
        <Title.Content>
          {filteredByContinent ? data[0].name : 'Global Statistics'}
        </Title.Content>
      </Title>
      {!filteredByContinent && (
        <Button
          size="mini"
          icon={showChart ? 'hide' : 'unhide'}
          content={showChart ? 'Hide Chart' : 'Show Chart'}
          onClick={() => setShowChart(showChart => !showChart)}
          style={{ margin: '8px 0' }}
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
};

export default Header;
