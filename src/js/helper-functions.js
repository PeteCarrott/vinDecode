// Decode
exports.decode = function () {
  const url = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/1G1ND52J9Y6186734?format=json";

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(error);
      return res.json();
    })
    .then((myJSON) => filterData(myJSON))
    .catch((error) => console.log("Error: ", error));
}

// Filter data
function filterData(data) {
  const info = data.Results;
  const arr = info.filter(function (element, index, array) {
    return element.Value !== null;
  }).filter(function (element, index, array) {
    return element.Value !== "";
  });
  console.log(arr);
}