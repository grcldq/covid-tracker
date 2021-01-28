export function formatData(data) {
  const formattedData = [];

  data.forEach(item => {
    const {
      active,
      cases,
      continent,
      countryInfo,
      critical,
      deaths,
      population,
      recovered,
      tests,
      todayCases,
      todayDeaths,
      updated,
      country: name,
    } = item;

    formattedData.push({
      updated,
      name,
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
      critical,
      deaths,
      recovered,
      todayCases,
      todayDeaths,
      continent: name,
    } = item;

    formattedData.push({
      name,
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

  return new Promise(resolve => {
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

  return new Promise(resolve => {
    formatter(current);
    formatter(total);
    resolve(formattedData);
  });
}

export function filterBySearch(data, text) {
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(text.trim().toLowerCase())
  );

  return filteredData;
}

export function filterByContinent(data, continent) {
  const filteredData = data.filter(
    item => item.continent && formatContinentName(item.continent) === continent
  );

  return filteredData;
}

export function formatContinentName(continent) {
  return continent.replace(/\s+/g, '').toLowerCase();
}

export function sortTable(data, sortBy, sortDirection) {
  const sortedData = data.sort((itemA, itemB) => {
    const { totalStats: statsArrayA } = itemA;
    const { totalStats: statsArrayB } = itemB;
    let statsA = 0,
      statsB = 0;

    statsArrayA.forEach(stat => {
      if (stat.title.toLowerCase() === sortBy.toLowerCase()) {
        statsA = stat.value;
      }
    });

    statsArrayB.forEach(stat => {
      if (stat.title.toLowerCase() === sortBy.toLowerCase()) {
        statsB = stat.value;
      }
    });

    console.log(statsB < statsA);
    return sortDirection === 'ascending' ? statsA < statsB : statsB < statsA;
  });

  console.log(sortedData);

  return sortedData;
}
