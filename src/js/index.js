import app from './app-functions';
import '../style/index.scss';

// Decode Button
document.querySelector(".form--submit").addEventListener("click", (event) => {
  event.preventDefault();
  console.log(event);
});

// Demo Button
document.querySelector(".footer--button").addEventListener("click", getAndStoreData);

// Check, fetch, filter, and store data
function getAndStoreData() {
  const input = document.querySelector(".form--input");

  let url = "";

  // Value will be empty if demo button was clicked
  if (input.value === "") {
    url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1C3CCBBB6DN695936?format=json";
  } else {
    url = app.createURL(input.value);
  }

  // Fetch, filter and store data
  app.getData(url)
    .then(unFilteredData => app.filterData(unFilteredData))
    .then(filteredData => storeDataLocally(filteredData))
}

function storeDataLocally(data) {
  //Check if local storage is available
  if (app.storageAvailable('localStorage')) {
    data.forEach((ele) => {
      localStorage.setItem(ele.Variable, ele.Value);
    });
  } else {
    const error = "This page can't access your local storage. Please try another browser.";
    handleError(error);
  }
}

function handleError(error) {
  console.log(error);
}