import {
  capitalize,
  determineAge
} from "./app-functions";
import '../style/results.scss';


function renderData() {
  // Set up dom selectors
  const vin = document.querySelector(".vin__value");
  const vehicleContent = document.querySelector(".vehicle-content");
  const powertrainContent = document.querySelector(".powertrain-content");
  const bodyContent = document.querySelector(".body-content");
  const buildContentMain = document.querySelector(".build-content-main");
  const buildContentAdditional = document.querySelector(".build-content-additional");
  const additionalContent = document.querySelector(".additional-content");

  // Classes for elements
  const mainDataClass = "main-data-class";
  const subDataClass = "sub-data-class";

  //***************************************************************************
  //** Start Building */
  //***************************************************************************

  //** Vin
  // Add vin to the element
  vin.innerText = localStorage.getItem("Vin");

  //! Vehicle content

  //** Year, Make, Model
  // Select keys, build text node, build element
  const vehicleKeys = ["Model Year", "Make", "Model"];
  const vehicleTextNode = createMultiWordText(vehicleKeys, " ");
  buildElement(vehicleContent, vehicleTextNode, mainDataClass);

  //** Age
  // Get age, build text node, build element
  const vehicleAge = determineAge(localStorage.getItem("Model Year"));
  const vehicleAgeTextNode = createAgeText(vehicleAge);
  buildElement(vehicleContent, vehicleAgeTextNode, subDataClass);

  //! Powertrain content

  //** Number of Cylinders
  // Build text node, build element
  const cylindersTextNode = createSingleWordText("Engine Number of Cylinders", " Cylinder(s)");
  buildElement(powertrainContent, cylindersTextNode, mainDataClass);

  //** Displacement in different units
  // Select keys, build text, build text node, build element
  const displacmentKeys = ["Displacement (L)", "Displacement (CC)", "Displacement (CI)"];

  // TODO: Need to break this up in case localStorage key doesn't exist.
  function buildDisplacmentText(displacmentKeys) {
    let liters = parseFloat(localStorage.getItem(displacmentKeys[0]), 10).toFixed(1);
    let cc = parseFloat(localStorage.getItem(displacmentKeys[1]), 10).toFixed(0);
    let ci = parseFloat(localStorage.getItem(displacmentKeys[2]), 10).toFixed(0);
    return `${liters} L / ${cc} CC / ${ci} CI`;
  }

  const displacementText = buildDisplacmentText(displacmentKeys);
  const displacementTextNode = document.createTextNode(displacementText);
  buildElement(powertrainContent, displacementTextNode, mainDataClass);

  //! Drivetrain config

  //** Fuel type

  //! Body content

  //** Vehicle type - format

  //** Body class

  //** Steering location

  //** Trim

  //! Build location content

  //** City, State

  //** Country

  //** Map

  //** Plant

  //** Manufacturer Name

  //! Additional content

  //** Serial Number

  //**********************************************************************

  /**
   * createSingleWordText() takes a key for local storage in and builds
   * a text node from the value, a symbol or word can be added to the end as-well.
   * Arguments : String, String
   * Return : TextNode
   */
  function createSingleWordText(key, symbol) {
    // Get the value from local storage with the given key.
    let text = capitalize(localStorage.getItem(key));
    // Check if something needs to be added to string.
    if (symbol === undefined) {
      // Return the node
      return document.createTextNode(text);
    } else {
      // Add to string
      text = text + symbol;
      // Return node
      return document.createTextNode(text);
    }
  }

  /**
   * createMultiWordText() take in the keys for local storage and builds a * text node from the value. It also allows a custom character
   * to be placed between each word.
   * Arguments : String, String
   * Return : TextNode
   */
  function createMultiWordText(keys, customChar) {
    // Empty string
    let text = "";
    // Loop over each key
    keys.forEach((key) => {
      // Get the value in local storage
      let word = localStorage.getItem(key);
      // Add value to string with custom character to separate
      text = text + capitalize(word) + customChar;
    });
    // Return the node
    return document.createTextNode(text);
  }

  /**
   * createAgeText() builds a text node for an element.
   * Arguments : String
   * Return : TextNode
   */
  function createAgeText(age) {
    let text = "";
    if (age === "0") {
      text = "Less than a year old";
    } else if (age === "1") {
      text = "1 year old";
    } else {
      text = `${age} years old`;
    }
    return document.createTextNode(text);
  }

  /**
   * buildElement() creates a element and places it in the dom.
   * Arguments : String, TextNode, String
   * Return : Void
   */
  function buildElement(parentElement, textNode, childClass) {
    const newElement = document.createElement('p');
    newElement.classList.add(childClass);
    newElement.appendChild(textNode);
    parentElement.appendChild(newElement);
  }

};

// Call the main function.
renderData();