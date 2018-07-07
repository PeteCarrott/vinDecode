import app from './app-functions';
import '../style/index.scss';

const demoBtn = document.querySelector(".footer--button");
demoBtn.addEventListener("click", showDemo);

// URL
const url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1G1ND52J9Y6186734?format=json";

// Check, fetch, filter, and store data
function decode(url) {
  // TODO: Check for correct vin input before trying to decode

  // Fetch and filter data
  const data = app.fetchData(url).then(res => app.filterData(res));

  // TODO: Call next function to apply data to page.
  data.then(res => console.log(res));
}

// TODO: Make function to apply data to page.

function showDemo() {
  const demoUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1G1ND52J9Y6186734?format=json";
  decode(demoUrl);
}