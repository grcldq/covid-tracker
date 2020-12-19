import { selectedFilters } from './constants';

export function formatData(data) {
  const formatted = [];

  data.forEach(item => {
    const {
      active,
      cases,
      continent,
      country,
      countryInfo,
      critical,
      deaths,
      population,
      recovered,
      tests,
      todayCases,
      todayDeaths,
    } = item;

    formatted.push({
      country,
      continent,
      flag: countryInfo.flag,
      stats: [
        {
          title: 'Total',
          value: cases,
        },
        {
          title: 'Active',
          value: active,
        },
        // {
        //   title: 'Critical',
        //   value: critical,
        // },
        {
          title: 'Deaths',
          value: deaths,
        },
        // {
        //   title: 'Population',
        //   value: population,
        // },
        // {
        //   title: 'Recoveries',
        //   value: recovered,
        // },
        // {
        //   title: 'Tests Conducted',
        //   value: tests,
        // },
        // {
        //   title: 'New Cases',
        //   value: todayCases,
        // },
        // {
        //   title: 'New Deaths',
        //   value: todayDeaths,
        // },
      ],
    });
  });

  return formatted;
}
