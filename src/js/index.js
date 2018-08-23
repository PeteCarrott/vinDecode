import app from './app-functions';
import axios from 'axios';
import '../style/index.scss';

// Set up listener on decode button
const vinForm = document.querySelector('.form');
const vinInput = document.querySelector('.form__input');
const vinError = document.querySelector('.form__error');

// Form validation
vinForm.addEventListener('submit', e => {
  if (vinInput.validity.tooShort) {
    vinError.textContent = "I need a vin of 17 characters between I try decoding.";
  } else if (vinInput.validity.patternMismatch) {
    vinError.textContent = "Only use letters and numbers, no spaces or special characters."
  } else {
    // Run main function
    getAndStoreData();
  }
  e.preventDefault();
}, false);

// Set up listener on demo button
document.querySelector('.footer__button').addEventListener('click', getAndStoreData);

/**
 * * getAndStoreData() is the starting function for the application.
 * @param void
 * Returns void
 */
function getAndStoreData() {
  const vin = document.querySelector('.form__input').value;
  // This array will store an object containing the vin.
  const vinArr = [];
  let url = '';

  // If user clicked the demo button the input(vin) will be an empty string.
  if (vin === '') {
    localStorage.clear();
    //const sampleVin = '1C3CCBBB6DN695936'; // Chrysler 200 // No map data
    //const sampleVin = 'JF1GPAD60D1803590'; // Subaru
    const sampleVin = '5YJSA1H12FFP71790'; // Tesla
    //const sampleVin = '1HD1GP4558K319097'; // Harley Davidson
    //const sampleVin = 'SCFEBBELXDGD17560'; // Aston Martin
    //const sampleVin = '1FV3GFBC0YHA74039'; // Daimler Large Truck
    //const sampleVin = 'JH4KA2650HC000268'; // Honda

    // This is the demo url.
    url = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${sampleVin}?format=json`;
    // Save vin in array to use with storeDataLocally();
    vinArr.push({
      Variable: 'Vin',
      Value: sampleVin
    });
  } else {
    // Create a url from the passed in vin.
    url = app.createURL(vin);
    // Save vin in array to use with storeDataLocally();
    vinArr.push({
      Variable: 'Vin',
      Value: vin
    });
  }

  // Use the url and start the process of gathering the data needed.

  axios.get(url)
    .then(res => {
      if (res.status !== 200) throw new Error(error);
      return res;
    })
    .then(unFilteredData => app.filterData(unFilteredData))
    .then(filterData => app.checkVin(filterData))
    .then(filteredData => storeDataLocally(filteredData, vinArr))
    .then(() => loadResultsPage())
    .catch((error) => {
      console.log("in .catch");
      handleError(error);
    });

  //app
  //.getData(url)
  // .then(unFilteredData => app.filterData(unFilteredData))
  // .then(filterData => app.checkVin(filterData))
  // .then(filteredData => storeDataLocally(filteredData, vinArr))
  // .then(() => loadResultsPage())
  // .catch(error => handleError(error));
}

/**
 * * storeDataLocally() stores the data in local storage if available.
 * @param array of objects in the form of [{Variable: "", Value: ""}, ...]
 * Returns promise
 */
function storeDataLocally(data, vinArr) {
  return new Promise((resolve, reject) => {
    try {
      //Check if local storage is available
      if (app.storageAvailable('localStorage')) {
        // Store vin
        localStorage.setItem(vinArr[0].Variable, vinArr[0].Value);
        // Store vin data
        data.forEach(ele => {
          localStorage.setItem(ele.Variable, ele.Value);
        });
      }
      resolve('done');
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * * loadResults() redirects to the results page.
 * @param void
 * Returns void
 */
function loadResultsPage() {
  window.location.href = './results.html';
}

/**
 * * storeDataLocally() handles any errors throw during the application.
 * @param string
 * Returns void
 */
function handleError(error) {
  // Errors
  const networkProblem = "Error: Network Error";
  const code5 = "5 - VIN has errors in few positions.";
  const code11 = "11 - Incorrect Model Year, decoded data may not be accurate";

  if (error == networkProblem) {
    console.log("Axios" + networkProblem);
  } else if (error === code5) {
    console.log("Code5", code5);
  } else if (error === code11) {
    console.log("Code11", code11);
  } else {
    console.log(error);
  }

  // Select element
  // Set message
  // Toggle class
  // Run timer
  // Toggle class off after timer
}