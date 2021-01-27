import { useMediaQuery } from 'react-responsive';

const api = 'https://corona.lmao.ninja/v2/';
const gitUrl = 'https://github.com/grcldq/covid-tracker';
const pageConfig = {
  NUMBER_OF_ROWS: 35,
};
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
const statsKeys = [
  'active',
  'cases',
  'critical',
  'deaths',
  'recovered',
  'tests',
];
const statsTitle = {
  active: 'Active',
  cases: 'Cases',
  critical: 'Critical',
  deaths: 'Deaths',
  recovered: 'Recovered',
  tests: 'Tests Conducted',
};
const screen = {
  isDesktopOrLaptop: () =>
    useMediaQuery({
      query: '(min-device-width: 1224px)',
    }),
  isTabletOrMobile: () => useMediaQuery({ query: '(max-width: 1224px)' }),
};

export {
  api,
  filterOptions,
  gitUrl,
  pageConfig,
  screen,
  statsKeys,
  statsTitle,
  tableHeaders,
};
