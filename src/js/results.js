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

  //***************************************************************************
  //** Structure Data */
  //***************************************************************************

  const vinData = localStorage.getItem('Vin');

  // Keys for local storage
  const vehicleKeys = ['Model Year', 'Make', 'Model'];
  const buildKeys = ['Plant City', 'Plant State', 'Plant Country', 'Manufacturer Name'];
  const bodyKeys = ['Vehicle Type', 'Body Class', 'Note', 'Series', 'Trim', 'Trim2', 'Doors', 'Steering Location'];
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
    'Cooling Type',
    'Fuel Type - Primary'
  ];
  const transKeys = ['Transmission Style', 'Transmission Speeds', 'Drive Type'];
  const hybridKeys = ['Battery Type', 'Battery Info', 'EV Drive Model'];
  const safetyKeys = [
    'Seat Belts Type',
    'Other Restraint System Info',
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
  const buildDataArr = sectionData(buildKeys);
  const bodyDataArr = sectionData(bodyKeys);
  const engineDataArr = sectionData(engineKeys);
  const transDataArr = sectionData(transKeys);
  const hybridDataArr = sectionData(hybridKeys);
  const safetyDataArr = sectionData(safetyKeys);

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
  });

  //** Age

  const vehicleAge = '';

  // mountElement(vehicleContent, ageTextNode, subDataClass);

  //! Powertrain content

  //** Engine Number of Cylinders

  //mountElement(powertrainContent, cylindersTextNode, mainDataClass);

  //mountElement(powertrainContent, displacementTextNode, mainDataClass);

  //mountElement(powertrainContent, displacementTextNode, mainDataClass);

  //** Drivetrain config

  ///mountElement(powertrainContent, driveTrainTextNode, mainDataClass);

  //** Fuel type

  //mountElement(powertrainContent, fuelTextNode, subDataClass);

  //! Body content

  //** Vehicle type - format

  //mountElement(bodyContent, vehicleTypeTextNode, mainDataClass);

  //** Body class

  //mountElement(bodyContent, bodyClassTextNode, mainDataClass);

  //** Steering location

  //mountElement(bodyContent, steeringTextNode, mainDataClass);

  //** Trim

  //mountElement(bodyContent, trimTextNode, subDataClass);

  //! Build location content

  //** City, State

  //** Country

  //** Map

  //** Plant

  //mountElement(buildContentAdditional, plantTextNode, mainDataClass);

  //** Manufacturer Name

  //mountElement(buildContentAdditional, manufacturerTextNode, mainDataClass);

  //! Additional content

  //** Serial Number

  //mountElement(additionalContent, serialTextNode, mainDataClass);

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
            console.log('Key : ' + key + ' is null');
          }
        });
        resolve(sectionArr);
      } catch (error) {
        reject(error);
      }
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

  // Formating functions to take an object in and return a single string.

  //TODO: Need to refactor this function or remove it.
  /**
   * * defaultFormatter() is used when on a single key value pair is
   * in the object and no formatting is needed.
   * @param object
   * Returns string
   */
  function defaultFormatter(obj) {
    let text = '';
    for (let prop in obj) {
      text = text + obj[prop];
    }
    return text;
  }

  /**
   * * joinWithSpaces() joins key values together with spaces between each value.
   * @param object
   * Returns string
   */
  function joinWithSpaces(obj) {
    let text = '';
    for (let prop in obj) {
      text = text + obj[prop] + ' ';
    }
    return text;
  }

  /**
   * * getData() returns an object fill with the key value pairs from local storage.
   * This function also formats the values to only have the first char capitalized.
   * @param array of string keys you want from local storage.
   * Returns object
   */
  function getData(keys) {
    const dataObj = {};
    // Loop through the keys, get data and add to object if valid.
    keys.forEach(ele => {
      if (localStorage.getItem(ele) !== null) {
        dataObj[ele] = capitalize(localStorage.getItem(ele));
      }
    });
    return dataObj;
  }

  //TODO: Need to refactor this function to check if we want to run a custom function.
  /**
   * * buildText() takes in an object and runs a function on the data, then returns text.
   * @param object of data, function for the data.
   * Returns string
   */
  function buildText(dataObj, formatter = defaultFormatter) {
    let text = '';
    // Check for custom function
    text = formatter(dataObj);
    return text;
  }

  /**
   * * createSingleWordText() takes a key for local storage in and builds
   * a text node from the value, a symbol or word can be added to the end as-well.
   * @param string key
   * @param string symbol (ie. " " or " / ")
   * Returns textNode
   */
  function createSingleWordText(key, symbol) {
    // Get the value from local storage with the given key.
    let text = capitalize(localStorage.getItem(key));
    // Check if something needs to be added to string.
    if (symbol === undefined) {
      // Return the node
    } else {
      // Add to string
      text = text + symbol;
      // Return node
      return document.createTextNode(text);
    }
  }

  /**
   * * createMultiWordText() take in the keys for local storage and builds a * text node from the value. It also allows a custom character
   * to be placed between each word.
   * @param array keys
   * @param string symbol (ie. " / " or " ")
   * Returns textNode
   */
  function createMultiWordText(keys, customChar) {
    // Empty string
    let text = '';
    // Loop over each key
    keys.forEach(key => {
      // Get the value in local storage
      let word = localStorage.getItem(key);
      // Add value to string with custom character to separate
      text = text + capitalize(word) + customChar;
    });
    // Return the node
    return document.createTextNode(text);
  }
}

// Call the main function.
renderData();
