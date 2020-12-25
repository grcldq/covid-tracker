export function formatData(data) {
  const formattedData = [];

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

    formattedData.push({
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

  return formattedData;
}

export function formatContinents(data) {
  const formattedData = [];

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

    formattedData.push({
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
          color: 'teal',
          title: 'Recoveries',
          key: 'recoveries',
          value: recovered,
        },
        {
          color: 'red',
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
          title: 'Cases Today',
          key: 'todayCases',
          value: todayCases,
        },
        {
          color: 'red',
          title: 'Deaths Today',
          key: 'todayDeaths',
          value: todayDeaths,
        },
      ],
    });
  });

  return formattedData;
}

export function formatGlobalChartData(data) {
  const formattedData = [];

  return new Promise((resolve, reject) => {
    Object.entries(data).forEach(([parentKey, value]) => {
      Object.entries(value).forEach(([key, value], index) => {
        const date = new Date(key);
        const formattedDateString = `${date.toLocaleString('default', {
          month: 'short',
        })} ${date.getDate()}`;

        formattedData[index] = {
          ...formattedData[index],
          date: formattedDateString,
          name: key,
          [parentKey]: value,
        };
      });
    });

    resolve(formattedData);
  });
}

export function formatContinentChartData(data) {
  const formattedData = [];
  const [current, total] = data;

  const formatter = data => {
    let charts = [];

    Object.entries(data).forEach(([parentKey, parentValue]) => {
      const { key, title, value } = parentValue;

      if (key === 'active') return;

      charts.push({
        name: title,
        population: value,
      });
    });

    formattedData.push(charts);
  };

  return new Promise((resolve, reject) => {
    formatter(current);
    formatter(total);
    resolve(formattedData);
  });
}
