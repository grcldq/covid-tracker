import { Grid, Statistic } from 'semantic-ui-react';
import './GlobalStats.css';

function GlobalStats({ title, color, total }) {
  return (
    <Grid.Column style={{ width: 'max-content !important' }}>
      <Statistic size="mini" horizontal color={color}>
        <Statistic.Value>{total && total.toLocaleString()}</Statistic.Value>
        <Statistic.Label>{title}</Statistic.Label>
      </Statistic>
    </Grid.Column>
  );
}

export default GlobalStats;
