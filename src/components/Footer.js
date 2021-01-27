import { List } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive';

function Footer() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  });
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1223px)',
  });

  return (
    <div className="footer" data-cy="footer">
      {isDesktopOrLaptop && (
        <div className="footer-container">
          <List floated="right" horizontal>
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
      )}
      {isTabletOrMobileDevice && (
        <div className="footer-container">
          <List>
            <List.Item disabled href="#">
              © Geraldine Atayan 2021
            </List.Item>
          </List>
          <List bulleted horizontal lin>
            <List.Item as="a" href="https://github.com/grcldq">
              GitHub
            </List.Item>
            <List.Item as="a" href="https://grcldq.github.io/">
              Portfolio
            </List.Item>
            <List.Item as="a" href="mailto:geraldineatayan@gmail.com">
              Contact
            </List.Item>
            <List.Item as="a" href="https://github.com/disease-sh/api">
              data from disease-sh
            </List.Item>
          </List>
        </div>
      )}
    </div>
  );
}

export default Footer;
