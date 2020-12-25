import React, { useRef, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Icon,
  Image,
  Label,
  Loader,
  Table,
} from 'semantic-ui-react';
import ContinentChart from './ContinentChart';

import { tableHeaders } from '../constants';

function Content({
  data,
  loadMoreRows,
  loading,
  isCountryView,
  isLoadingRows,
}) {
  const ref = useRef();
  const [cardsInfoEnabled, setCardsInfoEnabled] = useState(Array(6).fill(true));
  const [showCountriesEnabled, setShowCountriesEnabled] = useState(
    Array(6).fill(false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        loadMoreRows();
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);

  //TODO: sort table
  const renderCountriesContent = () => (
    <div>
      <Table celled selectable>
        <Table.Header>
          {tableHeaders.map((headers, index) => (
            <Table.Row key={index}>
              {headers.map(item => (
                <Table.HeaderCell
                  key={item.key}
                  colSpan={item.col}
                  rowSpan={item.row}
                >
                  {item.text}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {data.map(item => (
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
                  {statistic.value.toLocaleString()}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {isLoadingRows ? <Loader active inline="centered" /> : ''}
    </div>
  );

  const renderContinentsContent = () => (
    <Card.Group itemsPerRow={2}>
      {data.map((item, index) => (
        <Card fluid key={item.name}>
          <Card.Content>
            <Card.Header className="row space-between">
              <div style={{ flex: '1' }}>{item.name} </div>
              <div>
                <Button
                  color="grey"
                  data-key={index}
                  onClick={updateCountriesDisplayedState}
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
                <Label.Group size="large">
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
      ))}
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

  const updateCountriesDisplayedState = e => {
    e.preventDefault();

    const index = e.target.dataset.key;
    const arrCopy = showCountriesEnabled.slice();

    arrCopy[index] = !arrCopy[index];

    setShowCountriesEnabled(arrCopy);
  };

  return (
    <div>
      {loading ? <Loader active /> : renderContent()}
      <div ref={ref} style={{ visibility: 'hidden' }}>
        Observer
      </div>
    </div>
  );
}

export default Content;
