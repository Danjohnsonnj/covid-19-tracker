(async () => {
  const getCovidData = async function (url) {
    let response = await fetch(url)
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }

    let data = await response.json()
    return data;
  };
  const fetchResponse = await getCovidData('https://covidtracking.com/api/v1/states/nj/current.json');

  const formatResults = function (r) {
    const deprecatedData = [
      'checkTimeEt',
      'commercialScore',
      'dateChecked',
      'dateModified',
      'grade',
      'hash',
      'hospitalized',
      'negativeIncrease',
      'negativeRegularScore',
      'negativeScore',
      'posNeg',
      'positiveScore',
      'score',
      'total',
    ]
    const filteredResults = Object.keys(r).reduce((acc, key) => {
      if (!deprecatedData.includes(key)) {
        acc[key] = r[key];
      }
      return acc;
    }, {});
    console.log(filteredResults)

    const date = new Date(filteredResults.lastUpdateEt);
    const updated = `${date.toDateString()}<br>at ${date.toLocaleTimeString()}`;
    const results = {
      updated,
      positiveCases: filteredResults.positiveCasesViral,
      positiveIncrease: filteredResults.positiveIncrease,
      recovered: filteredResults.recovered,
      death: filteredResults.death,
      deathIncrease: filteredResults.deathIncrease,
      hospitalizedCurrently: filteredResults.hospitalizedCurrently,
      hospitalizedIncrease: filteredResults.hospitalizedIncrease,
      inIcuCurrently: filteredResults.inIcuCurrently,
    };
    return results;
  }

  const formattedResults = formatResults(fetchResponse);
  console.log(formattedResults);

  const dataTable = document.getElementById('CurrentData');
  Object.keys(formattedResults).forEach(key => {
    dataTable.querySelector(`.${key}`).innerHTML = formattedResults[key];
  });
})()