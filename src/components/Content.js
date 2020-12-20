import { Card, Image, Loader, Placeholder, Table } from 'semantic-ui-react';

import { tableHeaders } from '../constants';

function Content({ data, loading, isCountryView }) {
  //TODO: lazy loading
  const placeholder = <Placeholder></Placeholder>;

  if (loading) return <Loader active />;

  //TODO: sort table
  const renderCountriesContent = () => (
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
            <Table.Cell>
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

  return isCountryView ? renderCountriesContent() : renderContinentsContent();
}

export default Content;
