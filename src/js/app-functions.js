/**
 * createURL() takes the vin and places it within the template.
 * Arguments : String
 * Returns : String
 */
exports.createURL = (vin) => {
  return `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`;
}

/**
 * getData() takes the url in and fetches the data, then converts to JSON.
 * Arguments : String url
 * Returns : Promise
 */
exports.getData = (url) => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(error);
      return res.json();
    })
    .then((myJSON) => myJSON)
    .catch((error) => error);
}

/**
 * filterData() takes the data and removes null and empty values.
 * Arguments : Array of Objects
 * Returns : Promise
 */
exports.filterData = (data) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(data.Results
        .filter((ele) => ele.Value !== null)
        .filter((ele) => ele.Value !== ""));
    } catch (error) {
      reject(error);
    }
  });
};


/**
 * checkVin() takes the vinData and checks the error code.
 * Arguments : Array of Objects
 * Returns : Promise.
 * 
 * Possible Codes :
 * 0 - VIN decoded clean.Check Digit(9 th position) is correct
 * 1 - VIN decoded clean.Check Digit(9 th position) does not calculate properly.
 * 5 - VIN has errors in few positions.
 * 11 - Incorrect Model Year, decoded data may not be accurate!
 */
exports.checkVin = (vinData) => {
  return new Promise((resolve, reject) => {
    // Filter the data for the error code info.
    const errorCode = vinData.filter(ele => ele.Variable === "Error Code")[0].Value;
    // Split the error code string so we can get the code number.
    const code = errorCode.split(" ")[0];
    // Check the code number.
    if (code === "0" || code === "1") {
      resolve(vinData);
    } else {
      reject(errorCode);
    }
  });
}

/**
 * storageAvailable() check if the browser has local storage available.
 * Arguments : String ("localStorage" OR "sessionStorage")
 * Returns : Boolean
 */
exports.storageAvailable = (type) => {
  try {
    const storage = window[type];
    const test_sample = "storage_test";
    storage.setItem(test_sample, test_sample);
    storage.removeItem(test_sample);
    return true;
  } catch (error) {
    return error instanceof DOMException && (
        // everything except Firefox
        error.code === 22 ||
        // Firefox
        error.code === 1014 ||
        // Test name field
        // everything except Firefox
        error.name === "QuotaExceededError" ||
        // Firefox
        error.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // Acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0;
  }
};

/**
 * capitalize() makes only the first letter capitalized.
 * Argument : String
 * Return : String 
 */
exports.capitalize = str => {
  const firstLetter = str.charAt(0).toUpperCase();
  const restOfWord = str.slice(1).toLowerCase();
  return firstLetter + restOfWord;
};

/**
 * determineAge() returns the age based on the model year.
 * Argument : String
 * Return : String
 */
exports.determineAge = year => {
  const today = new Date().getFullYear();
  let age = today - year;
  // Just in case the vehicle is the next year model.
  if (age < 0) {
    age = 0;
  }
  return age.toString();
};