const api = 'https://corona.lmao.ninja/v2/';
const filterContinents = [
  { key: '1', text: 'Africa', value: 'africa' },
  { key: '2', text: 'Asia', value: 'asia' },
  { key: '3', text: 'Australia', value: 'australia/oceania' },
  { key: '4', text: 'Europe', value: 'europe' },
  { key: '5', text: 'North America', value: 'north america' },
  { key: '6', text: 'South America', value: 'south america' },
];
const selectedFilters = [
  'africa',
  'asia',
  'australia/oceania',
  'europe',
  'north america',
  'south america',
];
const sortOptions = [
  { key: 1, text: 'Country', value: 'country' },
  { key: 2, text: 'Total Cases', value: 'cases' },
  { key: 3, text: 'Total Recovered', value: 'recovered' },
  { key: 4, text: 'Total Deaths', value: 'deaths' },
  { key: 5, text: 'Total Conducted', value: 'tests' },
];

export { api, filterContinents, selectedFilters, sortOptions };
