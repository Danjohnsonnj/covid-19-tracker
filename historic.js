document.addEventListener("DOMContentLoaded", async () => {
  const stateSelect = document.getElementById("StateSelect");
  const chartElements = document.querySelectorAll('.chart')
  const dayElements = document.querySelectorAll('.day')
  const posBarElements = document.querySelectorAll('.pos')
  const deathsBarElements = document.querySelectorAll('.deaths')
  const dateElements = document.querySelectorAll('.date')

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

    formattedResults.forEach((result, index) => {
      const posBarEl = posBarElements[index]
      posBarEl.style.height = `${result.positiveIncrease / largestPos * 100}%`
      posBarEl.dataset.total = `${result.positiveIncrease}`
      posBarEl.nextElementSibling.innerText = new Date(result.lastUpdateEt).toLocaleDateString()

      const deathsBarEl = deathsBarElements[index]
      deathsBarEl.style.height = largestD > 0 ?
        `${result.deathIncrease / largestD * 100}%` :
        0
      deathsBarEl.dataset.total = `${result.deathIncrease}`
      deathsBarEl.nextElementSibling.innerText = new Date(result.lastUpdateEt).toLocaleDateString()
    })
  }

  stateSelect.addEventListener("change", (evt) => {
    updateResults(evt.currentTarget.value);
  });

  updateResults();
});
