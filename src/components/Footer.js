import React from 'react';
import { List } from 'semantic-ui-react';
import './Footer.css';

function Footer() {
  const items = [
    {
      id: 1,
      url: 'https://github.com/grcldq',
      name: 'GitHub',
    },
    {
      id: 2,
      url: 'https://geraldineatayan.com',
      name: 'Portfolio',
    },
    {
      id: 3,
      url: 'https://github.com/disease-sh/api',
      name: 'disease-sh api',
    },
    {
      id: 4,
      url: 'mailto:geraldineatayan@gmail.com',
      name: 'Contact Me',
    },
  ];

  return (
    <div className='footer--container'>
      <List bulleted horizontal link inverted size='small'>
        {items.map(item => (
          <List.Item as="a" key={item.id} href={item.url}>
            {item.name}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default Footer;
