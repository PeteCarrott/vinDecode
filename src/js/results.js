import '../style/results.scss';


function displayData() {
  // Set up dom selectors
  const vin = document.querySelector(".vin__value");
  const vehicleContent = document.querySelector(".vehicle-content");
  const powertrainContent = document.querySelector(".powertrain-content");
  const bodyContent = document.querySelector(".body-content");
  const buildContentMain = document.querySelector(".build-content-main");
  const buildContentAdditional = document.querySelector(".build-content-additional");
  const additionalContent = document.querySelector(".additional-content");

  // Add vin to the element
  vin.innerText = localStorage.getItem("Vin");

  //** Vehicle content
  // Year, Make, Model
  // Age
  //** Powertrain content
  // Number of Cylinders
  // Displacement in different units
  // Drivetrain config
  // Fuel type
  //** Body content
  // Vehicle type - format
  // Body class
  // Steering location
  // Trim
  //** Build location content
  // City, State
  // Country
  // Map
  // Plant
  // Manufacturer Name
  //** Additional content
  // Serial Number
};

displayData();