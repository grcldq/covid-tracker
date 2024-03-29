import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Button,
  Card,
  Icon,
  Item,
  Image,
  Label,
  Loader,
  Table,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ContinentChart from './ContinentChart';

import { statsTitle, tableHeaders } from '../constants';
import SortDirectionTypes from '../constants/SortDirectionTypes';

function Content({
  data,
  handleFilterByContinentCountries,
  handleSort,
  isCountryView,
  isLoadingRows,
  loading,
  sort,
  sortDirection,
}) {
  const [cardsInfoEnabled, setCardsInfoEnabled] = useState(Array(6).fill(true));
  const [showCountriesEnabled] = useState(Array(6).fill(false));
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1223px)',
  });

  const desktopContent = isDesktopOrLaptop && (
    <Table selectable sortable singleLine>
      <Table.Header>
        {tableHeaders.map((headers, index) => {
          return (
            <Table.Row key={index}>
              {headers.map(item => (
                <Table.HeaderCell
                  key={item.key}
                  colSpan={item.col}
                  rowSpan={item.row}
                  onClick={() => handleSort(item.text)}
                  sorted={
                    sort.toLowerCase() === item.text.toLowerCase()
                      ? sortDirection
                      : SortDirectionTypes.DESCENDING
                  }
                  style={{ borderLeft: 'none' }}
                >
                  {item.text}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          );
        })}
      </Table.Header>
      <Table.Body data-cy="tableBody">
        {data.length > 0 ? (
          data.map(item => (
            <Table.Row key={item.name}>
              <Table.Cell width={4}>
                <Image floated="left" size="mini" src={item.flag} />
                {item.name}
              </Table.Cell>
              {item.totalStats.map(statistic => (
                <Table.Cell
                  key={statistic.key}
                  negative={statistic.key === 'deaths'}
                  positive={statistic.key === 'recoveries'}
                  warning={statistic.key === 'cases'}
                >
                  {statistic.value ? statistic.value.toLocaleString() : '-'}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell>No results found.</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );

  const mobileContent = isTabletOrMobileDevice && (
    <Item.Group divided unstackable>
      {data.length > 0 ? (
        data.map(item => (
          <Item key={item.name}>
            <Item.Content verticalAlign="middle">
              <Item.Header>{item.name}</Item.Header>
              {item.totalStats.map(statistic => {
                const color = statsTitle[statistic.key].color;
                const style = color ? { color } : {};

                return (
                  <Item.Description key={statistic.key} style={style}>
                    <b>{statsTitle[statistic.key].title} | </b>
                    {statistic.value.toLocaleString() || '-'}
                  </Item.Description>
                );
              })}
            </Item.Content>
            <div>
              <Item.Image size="tiny" src={item.flag} />
            </div>
          </Item>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </Item.Group>
  );

  const renderCountriesContent = () => (
    <div data-cy="content">
      {desktopContent}
      {mobileContent}
      {isLoadingRows ? <Loader active inline="centered" /> : ''}
    </div>
  );

  const renderContinentsContent = () => (
    <Card.Group
      itemsPerRow={data.length > 0 ? 2 : 1}
      doubling
      data-cy="content"
    >
      {data.length > 0 ? (
        data.map((item, index) => (
          <Card fluid key={item.name}>
            <Card.Content>
              <Card.Header className="row space-between">
                <div style={{ flex: '1' }}>{item.name} </div>
                <div>
                  <Button
                    color="grey"
                    data-key={index}
                    data-continent={item.name}
                    onClick={handleFilterByContinentCountries}
                    size='small'
                  >
                    {showCountriesEnabled[index]
                      ? 'Hide countries'
                      : 'Show countries'}
                  </Button>
                  <Button
                    color="blue"
                    icon
                    data-key={index}
                    onClick={updateCardsState}
                    size='small'
                  >
                    <Icon
                      data-key={index}
                      onClick={updateCardsState}
                      name={cardsInfoEnabled[index] ? 'chart bar' : 'info'}
                    />
                  </Button>
                </div>
              </Card.Header>
              <Card.Meta>
                {showCountriesEnabled[index] &&
                  item.countries.map((country, index) =>
                    index === 0 ? country : ` | ${country}`
                  )}
              </Card.Meta>
              <Card.Description>
                {cardsInfoEnabled[index] ? (
                  <Label.Group size="medium">
                    {item.currentStats.map(stat => (
                      <Label key={stat.title} color={stat.color}>
                        {stat.title}
                        <Label.Detail>{stat.value}</Label.Detail>
                      </Label>
                    ))}
                    {item.totalStats.map(stat => (
                      <Label key={stat.title} color={stat.color}>
                        {stat.title}
                        <Label.Detail>{stat.value}</Label.Detail>
                      </Label>
                    ))}
                  </Label.Group>
                ) : (
                  <ContinentChart data={[item.currentStats, item.totalStats]} />
                )}
              </Card.Description>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Card>
          <Card.Description textAlign="center" style={{ padding: '4rem 0' }}>
            <p>No results found.</p>
          </Card.Description>
        </Card>
      )}
    </Card.Group>
  );

  const renderContent = () =>
    isCountryView ? renderCountriesContent() : renderContinentsContent();

  const updateCardsState = e => {
    e.preventDefault();

    const index = e.target.dataset.key;
    const arrCopy = cardsInfoEnabled.slice();

    arrCopy[index] = !arrCopy[index];

    setCardsInfoEnabled(arrCopy);
  };

  return <div>{loading ? <Loader active /> : renderContent()}</div>;
}

Content.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  isCountryView: PropTypes.bool,
  isLoadingRows: PropTypes.bool,
  handleFilterByContinentCountries: PropTypes.func,
  handleSort: PropTypes.func,
  sort: PropTypes.string,
  sortDirection: PropTypes.string,
};

export default Content;
