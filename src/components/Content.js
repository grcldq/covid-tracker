import {
  Card,
  Image,
  Loader,
  Placeholder,
  Statistic,
} from 'semantic-ui-react';

function Content({ data, loading }) {
  //TODO: lazy loading
  const placeholder = (
    <Placeholder>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line length="medium" />
        <Placeholder.Line length="short" />
        <Placeholder.Line length="short" />
      </Placeholder.Paragraph>
    </Placeholder>
  );

  if (loading) return <Loader active />;

  console.log(data);

  return (
    <Card.Group itemsPerRow={3} stackable>
      {data.map((item, index) => (
        <Card
          key={(item && item.country) || index}
          color="teal"
          style={{ height: loading ? '200px' : 'auto' }}
        >
          <Card.Content>
            <Image floated="left" size="mini" src={item.flag} />
            <Card.Header>{item.country}</Card.Header>
            <Card.Description>
              <Statistic.Group horizontal size="mini">
                {item.stats.map(statistic => (
                  <Statistic key={statistic.title}>
                    <Statistic.Value>
                      {statistic.value.toLocaleString()}
                    </Statistic.Value>
                    <Statistic.Label>{statistic.title}</Statistic.Label>
                  </Statistic>
                ))}
              </Statistic.Group>
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
}

export default Content;
