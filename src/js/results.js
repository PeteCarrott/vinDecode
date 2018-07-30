import { capitalize, determineAge, getSerialNumber } from './app-functions';
import '../style/results.scss';

function renderData() {
  // Set up dom selectors
  const vin = document.querySelector('.vin__value');
  const vehicleContent = document.querySelector('.vehicle-content');
  const powertrainContent = document.querySelector('.powertrain-content');
  const bodyContent = document.querySelector('.body-content');
  const buildContentMain = document.querySelector('.build-content-main');
  const buildContentAdditional = document.querySelector('.build-content-additional');
  const safetyContent = document.querySelector('.safety-content');
  const additionalContent = document.querySelector('.additional-content');

  // Classes for elements
  const mainDataClass = 'main-data-class';
  const subDataClass = 'sub-data-class';

  //***************************************************************************
  //** Format Data */
  //***************************************************************************

  // Fix uppercase values from api.
  const vehicleType_formatted = capitalize(localStorage.getItem('Vehicle Type'));
  localStorage.setItem('Vehicle Type', vehicleType_formatted);

  const make_formatted = capitalize(localStorage.getItem('Make'));
  localStorage.setItem('Make', make_formatted);

  // Format numbers for displacement
  //TODO: Format liters too.
  let dispCC = localStorage.getItem('Displacement (CC)');
  let dispCI = localStorage.getItem('Displacement (CI)');

  if (dispCC !== null) {
    const cc_formatted = parseFloat(localStorage.getItem('Displacement (CC)'), 10);
    localStorage.setItem('Displacement (CC)', cc_formatted);
  }

  if (dispCI !== null) {
    const ci_formatted = parseFloat(localStorage.getItem('Displacement (CI)'), 10).toFixed(0);
    localStorage.setItem('Displacement (CI)', ci_formatted);
  }

  //***************************************************************************
  //** Structure Data */
  //***************************************************************************

  const vinData = localStorage.getItem('Vin');

  // Keys for local storage
  const vehicleKeys = ['Model Year', 'Make', 'Model'];
  const buildKeys = ['Plant Company Name', 'Manufacturer Name'];
  const bodyKeys = ['Vehicle Type', 'Body Class', 'Note', 'Series', 'Trim2', 'Doors', 'Steering Location'];
  const engineKeys = [
    'Engine Model',
    'Engine Config',
    'Engine Number of Cylinders',
    'Engine Stroke Cycles',
    'Fuel Delivery / Fuel Injection Type',
    'Displacement (L)',
    'Displacement (CC)',
    'Displacement (CI)',
    'Engine Brake (hp)',
    'Value Train Design',
    'Cooling Type'
  ];
  const transKeys = ['Transmission Style', 'Transmission Speeds', 'Drive Type'];
  const hybridKeys = ['Battery Type', 'Battery Info', 'EV Drive Model'];
  const safetyKeys = [
    'Seat Belts Type',
    'Front Air Bag Locations',
    'Knee Air Bag Locations',
    'Side Air Bag Locations',
    'Driver Assist',
    'Adaptive Cruise Control (ACC)',
    'Anti-lock Braking System (ABS)',
    'Crash Imminent Braking (CIB)',
    'Blind Spot Detection (BSD)',
    'Electronic Stability Control (ESC)',
    'Traction Control',
    'Forward Collision Warning (FCW)',
    'Lane Departure Warning (LDW)',
    'Lane Keeping Support (LKS)',
    'Rear Visibility System (RSV)',
    'TPMS',
    'Dynamic Brake Support (DBS)',
    'Pedestrian Automatic Emergency Braking (PAEB)',
    'Daytime Running Lights (DRL)',
    'Keyless Ignition'
  ];

  // Data Arrays
  const vehicleDataArr = sectionData(vehicleKeys);
  const engineDataArr = sectionData(engineKeys);
  const transDataArr = sectionData(transKeys);
  const hybridDataArr = sectionData(hybridKeys);
  const bodyDataArr = sectionData(bodyKeys);
  const buildDataArr = sectionData(buildKeys);
  const safetyDataArr = sectionData(safetyKeys);

  //Todo: Check for empty arrays and data. Hide empty sections.

  //***************************************************************************
  //** Start Building */
  //***************************************************************************

  //** Vin

  // Add vin to the element
  vin.innerText = vinData;

  //! Vehicle content

  //** Year, Make, Model

  // Build a text str from the array
  vehicleDataArr.then(arr => {
    let vehStr = '';
    // Concat the string with spaces
    arr.forEach(ele => {
      vehStr += ele.value + ' ';
    });

    // Use the new string for the text node
    const vehTextNode = document.createTextNode(vehStr);
    // Place info in the DOM
    mountElement(vehicleContent, vehTextNode, mainDataClass);

    //** Age

    // Use model year to determine age
    const vehicleAge = determineAge(arr[0].value);
    // Create text node for age
    const vehAgeTextNode = document.createTextNode(vehicleAge);
    /// Place age in DOM
    mountElement(vehicleContent, vehAgeTextNode, subDataClass);
  });

  //! Powertrain content

  //** Engine Data except Fuel Type
  // Build text nodes and mount.
  engineDataArr.then(arr => {
    processData(arr, powertrainContent, mainDataClass);
  });

  //** Fuel Type
  // Get fuel type
  const fuelType = localStorage.getItem('Fuel Type - Primary');

  if (fuelType !== null) {
    // Build text node
    const fuelTextNode = document.createTextNode(`Fuel Type : ${fuelType}`);
    // Mount to DOM
    mountElement(powertrainContent, fuelTextNode, subDataClass);
  }

  //** Drivetrain config
  // Build text nodes and mount.
  transDataArr.then(arr => {
    processData(arr, powertrainContent, mainDataClass);
  });

  //** Hybrid Data
  // Build text nodes and mount.
  hybridDataArr.then(arr => {
    processData(arr, powertrainContent, mainDataClass);
  });

  //! Body content

  //** Body Data except Trim

  // Build text nodes and mount.
  bodyDataArr.then(arr => {
    processData(arr, bodyContent, mainDataClass);
  });

  //**  Vehicle Trim
  const vehTrim = localStorage.getItem('Trim');

  if (vehTrim !== null) {
    // Build text node
    const trimTextNode = document.createTextNode(`Trim: ${vehTrim}`);
    // Mount to DOM
    mountElement(bodyContent, trimTextNode, subDataClass);
  }

  //! Build location content

  //** City, State

  // Build text nodes and mount.
  const buildCity = localStorage.getItem('Plant City');
  const buildState = localStorage.getItem('Plant State');

  if (buildCity && buildState !== null) {
    // Build text node for city, state
    const buildTextNode = document.createTextNode(`${buildCity}, ${buildState}`);
    // Mount to DOM
    mountElement(buildContentMain, buildTextNode, mainDataClass);
  }

  //** Country

  const buildCountry = localStorage.getItem('Plant Country');

  if (buildCountry !== null) {
    // Build text node
    const countryTextNode = document.createTextNode(buildCountry);
    // Mount to DOM
    mountElement(buildContentMain, countryTextNode, subDataClass);
  }

  //** Map

  // Check if info for map is available.
  if (buildCity !== null && buildState !== null && buildCountry !== null) {
    console.log('We can attempt to build a map with', buildCity, buildState, buildCountry);
  }

  //** Plant and Manufacturer Name

  // Build text nodes and mount.
  buildDataArr.then(arr => {
    processData(arr, buildContentAdditional, mainDataClass);
  });

  //! Safety content

  // Build text nodes and mount.
  safetyDataArr.then(arr => {
    processData(arr, safetyContent, mainDataClass);
  });

  //! Additional content

  //** Serial Number
  const serialNum = getSerialNumber(vinData);

  if (serialNum !== null) {
    // Build text node
    const serialTextNode = document.createTextNode(`Serial Number : ${serialNum}`);
    // Mount to DOM
    mountElement(additionalContent, serialTextNode, mainDataClass);
  }

  //**********************************************************************

  /**
   * * sectionData() takes in an array of string keys for local storage and returns
   * * and array of objects with the key value pairs.
   * @param arr of strings
   * Returns arr of objects
   */
  function sectionData(arr) {
    return new Promise((resolve, reject) => {
      try {
        let sectionArr = [];
        arr.forEach(key => {
          const value = localStorage.getItem(key);
          if (value !== null) {
            sectionArr.push({ key, value });
          } else {
            //TODO: Delete this!
            console.log('Key : ' + key + ' : ' + value);
          }
        });
        resolve(sectionArr);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * * processData() creates elements and mounts each to the DOM.
   * @param arr The data arr after the promise is resolved.
   * @param parentElement The parent element each new element will be placed in.
   * @param cssClass The class attached to each new element.
   */
  function processData(arr, parentElement, cssClass) {
    arr.forEach(ele => {
      // For each element build text nodes
      let textNode = document.createTextNode(`${ele.key} : ${ele.value}`);
      // Mount to DOM
      mountElement(parentElement, textNode, cssClass);
    });
  }

  /**
   * * mountElement() creates a element and places it in the dom.
   * @param string parent element
   * @param textNode textNode
   * @param string childClass - the css class to attach
   * Returns void
   */
  function mountElement(parentElement, textNode, childClass) {
    if (textNode.textContent.length === 0) return;
    const newElement = document.createElement('p');
    newElement.classList.add(childClass);
    newElement.appendChild(textNode);
    parentElement.appendChild(newElement);
  }

  //**********************************************************************
}

// Call the main function.
renderData();
