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
      updated,
    } = item;

    formatted.push({
      updated,
      country,
      continent,
      flag: countryInfo.flag,
      totalStats: [
        {
          title: 'Cases',
          key: 'cases',
          value: cases,
        },
        {
          title: 'Recoveries',
          key: 'recoveries',
          value: recovered,
        },
        {
          title: 'Deaths',
          key: 'deaths',
          value: deaths,
        },
        {
          title: 'Tests Conducted',
          key: 'tests',
          value: tests,
        },
        {
          title: 'Population',
          key: 'population',
          value: population,
        },
      ],
      currentStats: [
        {
          title: 'Active',
          key: 'active',
          value: active,
        },
        {
          title: 'Critical',
          key: 'critical',
          value: critical,
        },

        {
          title: 'Cases',
          key: 'todayCases',
          value: todayCases,
        },
        {
          title: 'Deaths',
          key: 'todayDeaths',
          value: todayDeaths,
        },
      ],
    });
  });

  return formatted;
}

export function formatContinents(data) {
  const formatted = [];

  data.forEach(item => {
    const {
      countries,
      active,
      updated,
      cases,
      continent,
      critical,
      deaths,
      recovered,
      todayCases,
      todayDeaths,
    } = item;

    formatted.push({
      continent,
      countries,
      updated,
      totalStats: [
        {
          title: 'Cases',
          key: 'cases',
          value: cases,
        },
        {
          title: 'Recoveries',
          key: 'recoveries',
          value: recovered,
        },
        {
          title: 'Deaths',
          key: 'deaths',
          value: deaths,
        },
      ],
      currentStats: [
        {
          title: 'Active',
          key: 'active',
          value: active,
        },
        {
          title: 'Critical',
          key: 'critical',
          value: critical,
        },

        {
          title: 'Cases',
          key: 'todayCases',
          value: todayCases,
        },
        {
          title: 'Deaths',
          key: 'todayDeaths',
          value: todayDeaths,
        },
      ],
    });
  });

  return formatted;
}
