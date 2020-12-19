import { Grid, Label, LabelDetail } from 'semantic-ui-react';
import './LabelStats.css';

function LabelStats({ title, color, total }) {
  return (
    <Grid.Column className="stat-grid" style={{ width: 'max-content !important' }}>
      <Label color={color} className="stat-info" size="large">
        {title}
        <LabelDetail>{total && total.toLocaleString()}</LabelDetail>
      </Label>
    </Grid.Column>
  );
}

export default LabelStats;
