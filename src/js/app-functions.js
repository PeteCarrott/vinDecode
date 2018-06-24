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

// Handle error
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