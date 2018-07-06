import app from './app-functions';
import '../style/index.scss';

// Set up decode button

// Add click listener

// TODO: Set up vin input

// TODO: Set up data elements

// URL
// TODO: Make a string template.
const url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1G1ND52J9Y6186734?format=json";

// Check, fetch, filter, and store data
function decode() {
  // TODO: Check for correct vin input before trying to decode

  // Fetch and filter data
  const data = app.fetchData(url).then(res => app.filterData(res));

  // TODO: Call next function to apply data to page.
  data.then(res => console.log(res));
}

// TODO: Make function to apply data to page.