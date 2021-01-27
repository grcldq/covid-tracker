import { List } from 'semantic-ui-react';

function Footer() {
  return (
    <div>
      <List floated="right" horizontal data-cy="footer">
        <List.Item disabled href="#">
          © Geraldine Atayan 2021
        </List.Item>
        <List.Item as="a" href="https://github.com/grcldq">
          GitHub
        </List.Item>
        <List.Item as="a" href="https://grcldq.github.io/">
          Portfolio
        </List.Item>
        <List.Item as="a" href="mailto:geraldineatayan@gmail.com">
          Contact
        </List.Item>
      </List>
      <List horizontal>
        <List.Item as="a" href="https://github.com/disease-sh/api">
          data from disease-sh
        </List.Item>
      </List>
    </div>
  );
}

export default Footer;
