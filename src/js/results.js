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
  //** Start Building */
  //***************************************************************************

  //** Vin
  // Add vin to the element
  vin.innerText = localStorage.getItem('Vin');

  //! Vehicle content

  //** Year, Make, Model
  // Select keys, get data, build text node, mount to DOM.
  const vehicleKeys = ['Model Year', 'Make', 'Model'];
  const vehicleData = getData(vehicleKeys);
  const vehicleTextNode = document.createTextNode(buildText(vehicleData, joinWithSpaces));
  mountElement(vehicleContent, vehicleTextNode, mainDataClass);

  //** Age
  // Get year from vehicle data, determine age, build text node, mount to DOM.
  const year = Object.values(vehicleData)[0];
  const age = createAgeText(determineAge(year));
  const ageTextNode = document.createTextNode(buildText(age));
  mountElement(vehicleContent, ageTextNode, subDataClass);

  //! Powertrain content

  //** Engine Number of Cylinders
  const cylinders = localStorage.getItem('Engine Number of Cylinders');
  //TODO: Add formatter argument to the buildText call.
  const cylindersTextNode = document.createTextNode(buildText(cylinders));
  mountElement(powertrainContent, cylindersTextNode, mainDataClass);

  //Displacement(L)
  const displacementL = localStorage.getItem('Displacement (L)');
  const displacementTextNode = document.createTextNode(`Displacement : ${displacementL} L`);
  mountElement(powertrainContent, displacementTextNode, mainDataClass);

  //Engine Stroke Cycles

  //Engine Model

  //Fuel Type - Primary

  //Fuel Delivery / Fuel Injection Type

  //Engine Configuration

  //Cooling Type

  // Turbo

  // Transmission Style

  // Transmission Speeds

  // Drive Type

  // // TODO: Need to break this up in case localStorage key doesn't exist.

  // const displacementText = buildDisplacmentText(displacmentKeys);
  // const displacementTextNode = document.createTextNode(displacementText);
  //mountElement(powertrainContent, displacementTextNode, mainDataClass);

  //** Drivetrain config

  const driveTrainTextNode = createSingleWordText('Drive Type');
  //mountElement(powertrainContent, driveTrainTextNode, mainDataClass);

  //** Fuel type

  const fuelTextNode = createSingleWordText('Fuel Type - Primary');
  //mountElement(powertrainContent, fuelTextNode, subDataClass);

  //! Body content

  //** Vehicle type - format

  const vehicleTypeTextNode = createSingleWordText('Vehicle Type');
  //mountElement(bodyContent, vehicleTypeTextNode, mainDataClass);

  //** Body class

  const bodyClassTextNode = createSingleWordText('Body Class');
  //mountElement(bodyContent, bodyClassTextNode, mainDataClass);

  //** Steering location

  const steeringTextNode = createSingleWordText('Steering Location');
  //mountElement(bodyContent, steeringTextNode, mainDataClass);

  //** Trim

  const trimTextNode = createSingleWordText('Trim');
  //mountElement(bodyContent, trimTextNode, subDataClass);

  //! Build location content

  //** City, State

  //** Country

  //** Map

  //** Plant

  const plantName = localStorage.getItem('Plant Company Name');
  const plantTextNode = document.createTextNode(`Plant Company Name : ${plantName}`);
  //mountElement(buildContentAdditional, plantTextNode, mainDataClass);

  //** Manufacturer Name

  const manufacturer = localStorage.getItem('Manufacturer Name');
  const manufacturerTextNode = document.createTextNode(`Manufacturer Name : ${manufacturer}`);
  //mountElement(buildContentAdditional, manufacturerTextNode, mainDataClass);

  //! Additional content

  //** Serial Number
  const serialNumber = getSerialNumber(localStorage.getItem('Vin'));
  const serialTextNode = document.createTextNode(`Serial Number : ${serialNumber}`);
  //mountElement(additionalContent, serialTextNode, mainDataClass);

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
   * * createAgeText() builds a text node for an element.
   * @param string
   * Returns string
   */
  function createAgeText(age) {
    let text = '';
    if (age === '0') {
      text = 'Less than a year old';
    } else if (age === '1') {
      text = '1 year old';
    } else {
      text = `${age} years old`;
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
}

// Call the main function.
renderData();
