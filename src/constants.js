const api = 'https://disease.sh/v2/';
const gitUrl = 'https://github.com/grcldq/covid-tracker';
const pageConfig = {
  NUMBER_OF_ROWS: 15,
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
  active: {
    color: '#a88d08',
    title: 'Active',
  },
  cases: {
    color: '#ea804f',
    title: 'Cases',
  },
  critical: {
    color: '#ea5e48',
    title: 'Critical',
  },
  deaths: {
    color: '#B03060',
    title: 'Deaths',
  },
  population: {
    title: 'Population',
  },
  recovered: {
    color: '#68990d',
    title: 'Recovered',
  },
  recoveries: {
    color: '#68990d',
    title: 'Recoveries',
  },
  tests: {
    title: 'Tested',
  },
};

export {
  api,
  filterOptions,
  gitUrl,
  pageConfig,
  statsKeys,
  statsTitle,
  tableHeaders,
};
