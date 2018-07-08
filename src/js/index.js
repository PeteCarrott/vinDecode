import app from './app-functions';
import '../style/index.scss';

const demoBtn = document.querySelector(".footer--button");
demoBtn.addEventListener("click", showDemo);

// URL
const url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1G1ND52J9Y6186734?format=json";

// Check, fetch, filter, and store data
function fetchVinData(url) {
  // Fetch and filter data
  const data = app.fetchData(url).then(res => app.filterData(res));
  // Store data using local storage
  data.then(res => storeDataLocally(res));
}

function storeDataLocally(data) {
  //Check if local storage is available
  if (!app.storageAvailable('localStorage')) {
    // TODO : Create function to inform user of this.
    console.log("This page can't access your local storage. Please try another browser.");
  }

  console.log(data);
}

function showDemo() {
  const demoUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1G1ND52J9Y6186734?format=json";
  fetchVinData(demoUrl);
}