import app from './app-functions';
import '../style/index.scss';

// Set up listener on decode button
document.querySelector(".form--submit")
  .addEventListener("click", (e) => {
    getAndStoreData();
    e.preventDefault();
  });

// Set up listener on demo button
document.querySelector(".footer--button")
  .addEventListener("click", getAndStoreData);


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
    .then(filterData => app.checkVin(filterData))
    .then(filteredData => storeDataLocally(filteredData))
    .catch((vinError) => handleVinError(vinError));
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
  alert(error);
}

function handleVinError(vinError) {
  console.log(vinError);
}