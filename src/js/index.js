import app from './app-functions';
import '../style/index.scss';

// URL with vin
const url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1G1ND52J9Y6186734?format=json";

// Set up decode button
const decodeBtn = document.querySelector('.decode-btn');
// Add click listener
decodeBtn.addEventListener('click', decode);

// Fetch, filter, and store data
function decode() {
  const data = app.fetchData(url).then(res => app.filterData(res));
  data.then(res => console.log(res));
}