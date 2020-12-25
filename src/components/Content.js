import React, { useRef, useEffect } from 'react';
import { Card, Image, Loader, Table } from 'semantic-ui-react';

import { tableHeaders } from '../constants';

function Content({
  data,
  loadMoreRows,
  loading,
  isCountryView,
  isLoadingRows,
}) {
  const ref = useRef();

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
            <Table.Row key={item.country}>
              <Table.Cell width={4}>
                <Image floated="left" size="mini" src={item.flag} />
                {item.country}
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

  // TODO: fix continents card
  const renderContinentsContent = () => (
    <Card.Group itemsPerRow={2}>
      {data.map(item => (
        <Card fluid key={item.continent}>
          <Card.Content>
            <Card.Header>{item.continent}</Card.Header>
            <Card.Meta>
              {item.countries.map((country, index) =>
                index === 0 ? country : ` | ${country}`
              )}
            </Card.Meta>
            <Card.Description></Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );

  const renderContent = () =>
    isCountryView ? renderCountriesContent() : renderContinentsContent();

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
