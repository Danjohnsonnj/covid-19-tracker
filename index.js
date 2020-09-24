document.addEventListener("DOMContentLoaded", async () => {
  const stateSelect = document.getElementById("StateSelect");

  async function updateResults(location = stateSelect.value) {
    const getCovidData = async function (state = location) {
      const url = `https://api.covidtracking.com/v1/states/${state}/current.json`;
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
      const deprecatedData = [
        "checkTimeEt",
        "commercialScore",
        "dateChecked",
        "dateModified",
        "grade",
        "hash",
        "hospitalized",
        "negativeIncrease",
        "negativeRegularScore",
        "negativeScore",
        "posNeg",
        "positiveScore",
        "score",
        "total"
      ];
      const filteredResults = Object.keys(r).reduce((acc, key) => {
        if (!deprecatedData.includes(key)) {
          acc[key] = r[key] || "not reported";
        }
        return acc;
      }, {});

      const date = new Date(filteredResults.lastUpdateEt);
      const updated = `Updated on ${date.toDateString()} at ${date.toLocaleTimeString()}.`;
      const results = {
        updated,
        positiveCases: filteredResults.positiveCasesViral,
        positiveIncrease: filteredResults.positiveIncrease,
        recovered: filteredResults.recovered,
        death: filteredResults.death,
        deathIncrease: filteredResults.deathIncrease,
        hospitalizedCurrently: filteredResults.hospitalizedCurrently,
        hospitalizedIncrease: filteredResults.hospitalizedIncrease,
        inIcuCurrently: filteredResults.inIcuCurrently
      };
      return results;
    };

    const fetchResponse = await getCovidData(location);
    const formattedResults = formatResults(fetchResponse);
    console.log(formattedResults);

    Object.keys(formattedResults).forEach((key) => {
      document.getElementById(`${key}`).innerHTML = formattedResults[key];
    });
  }

  stateSelect.addEventListener("change", (evt) => {
    console.log(evt.currentTarget.value);
    updateResults(evt.currentTarget.value);
  });

  updateResults();
});
