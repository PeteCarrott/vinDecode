import app from './app-functions';
import '../style/index.scss';

// Set up listener on decode button
document.querySelector(".form--submit")
  .addEventListener("click", (e) => {
    getAndStoreData();
    e.preventDefault();
  });

// Set up listener on demo button
document.querySelector(".footer--button").addEventListener("click", getAndStoreData);

/**
 * getAndStoreData() is the starting function for the application.
 * Arguments : void
 * Returns : void
 */
function getAndStoreData() {

  const vin = document.querySelector(".form--input").value;

  let url = "";

  // If user clicked the demo button the input(vin) will be an empty string.
  if (vin === "") {
    // This is the demo url.
    url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1C3CCBBB6DN695936?format=json";
  } else {
    // Create a url from the passed in vin.
    url = app.createURL(vin);
  }

  // Use the url and start the process of gathering the data needed.
  app.getData(url)
    .then(unFilteredData => app.filterData(unFilteredData))
    .then(filterData => app.checkVin(filterData))
    .then(filteredData => storeDataLocally(filteredData))
    .catch((error) => handleError(error));
}

/**
 * storeDataLocally() stores the data in local storage if available.
 * Arguments : void
 * Returns : void
 */
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
  console.log("loading results page");
  // Load results page
  loadResultsPage();
}

/**
 * storeDataLocally() handles any errors throw during the application.
 * Arguments : String
 * Returns : void
 */
function handleError(error) {
  alert("Error : " + error);
}

/**
 * loadResults() redirects to the results page.
 * Arguments : Void
 * Returns : Void
 */
function loadResultsPage() {
  window.location.href = "./results.html";
}