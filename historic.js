document.addEventListener("DOMContentLoaded", async () => {
  const stateSelect = document.getElementById("StateSelect");
  const chartElement = document.getElementById('Chart')
  const dayElements = chartElement.querySelectorAll('.day')
  const posBarElements = chartElement.querySelectorAll('.pos')
  const deathsBarElements = chartElement.querySelectorAll('.deaths')
  const dateElements = chartElement.querySelectorAll('.date')

  async function updateResults(location = stateSelect ? stateSelect.value : 'nj') {
    const getCovidData = async function (state = location) {
      const url = `https://api.covidtracking.com/v1/states/${state}/daily.json`;
      const response = await fetch(url);
      if (response.status !== 200) {
        console.log(
          "Looks like there was a problem. Status Code: " + response.status
        );
        return;
      }

      const data = await response.json();
      return data;
    };

    const formatResults = function (r) {
      const fieldsToDisplay = [
        "lastUpdateEt",
        "deathIncrease",
        "positiveIncrease",
      ];
      const week = r.slice(0, 7)
      const filteredResults = week.map(day => {
        const results = {}
        fieldsToDisplay.forEach(field => {
          results[field] = day[field]
        })
        return results
      })

      return filteredResults
    };

    const fetchResponse = await getCovidData(location);
    const formattedResults = formatResults(fetchResponse);

    const largestPos = formattedResults.reduce((acc, day) => {
      acc = day.positiveIncrease > acc ? day.positiveIncrease : acc
      return acc
    }, 0)
    const largestD = formattedResults.reduce((acc, day) => {
      acc = day.deathIncrease > acc ? day.deathIncrease : acc
      return acc
    }, 0)

    dayElements.forEach((day, index) => {
      posBarElements[index].style.height = `${formattedResults[index].positiveIncrease / largestPos * 100}%`
      posBarElements[index].dataset.total = `${formattedResults[index].positiveIncrease}`
      deathsBarElements[index].style.height = largestD > 0 ?
        `${formattedResults[index].deathIncrease / largestD * 100}%` :
        0
      deathsBarElements[index].dataset.total = `${formattedResults[index].deathIncrease}`
      dateElements[index].innerText = new Date(formattedResults[index].lastUpdateEt).toLocaleDateString()
    })
  }

  stateSelect.addEventListener("change", (evt) => {
    updateResults(evt.currentTarget.value);
  });

  updateResults();
});
