// Fetch data
exports.fetchData = (url) => {
  // Fetch
  return fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(error);
      return res.json();
    })
    // .then((myJSON) => filterData(myJSON))
    .then((myJSON) => myJSON)
    .catch((error) => handleError(error));
}

// Handle error by return an obj with data
const handleError = (error) => {
  return {
    hasError: true,
    errorData: error
  };
}

// Filter data
exports.filterData = (data) => {
  return data.Results.filter((ele) => ele.Value !== null).filter((ele) => ele.Value !== "");
};

// Check if the app can use browser's local storage
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