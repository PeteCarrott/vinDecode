import app from './app-functions';
import '../style/index.scss';

// Set up listener on decode button
document.querySelector('.form--submit').addEventListener('click', e => {
  getAndStoreData();
  e.preventDefault();
});

// Set up listener on demo button
document.querySelector('.footer--button').addEventListener('click', getAndStoreData);

/**
 * * getAndStoreData() is the starting function for the application.
 * @param void
 * Returns void
 */
function getAndStoreData() {
  const vin = document.querySelector('.form--input').value;
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
    vinArr.push({ Variable: 'Vin', Value: sampleVin });
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
  app
    .getData(url)
    .then(unFilteredData => app.filterData(unFilteredData))
    .then(filterData => app.checkVin(filterData))
    .then(filteredData => storeDataLocally(filteredData, vinArr))
    .then(() => loadResultsPage())
    .catch(error => handleError(error));
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
  // TODO: Inform the user.
  alert('Error : ', error);
}
