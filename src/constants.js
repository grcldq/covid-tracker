const api = 'https://corona.lmao.ninja/v2/';
const filterOptions = [
  { key: 1, text: 'Countries', value: 'countries' },
  { key: 2, text: 'Continents', value: 'continents' },
];
const tableHeaders = [
  [
    {
      key: 1,
      text: 'Country',
      row: 2,
    },
    { key: 2, text: 'Total', col: 5 },
  ],
  [
    {
      key: 1,
      text: 'Cases',
    },
    {
      key: 2,
      text: 'Recoveries',
    },
    {
      key: 3,
      text: 'Deaths',
    },
    {
      key: 4,
      text: 'Tests Conducted',
    },
    {
      key: 5,
      text: 'Population',
    },
  ],
];

export { api, filterOptions, tableHeaders };
