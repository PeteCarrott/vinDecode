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

  //** Vin
  // Add vin to the element
  vin.innerText = localStorage.getItem("Vin");

  //** Vehicle content
  // Keys for local storage
  const vehicleKeys = ["Model Year", "Make", "Model"];
  // Text node for element
  const vehicleTextNode = createMultiWordText(vehicleKeys, " ");
  // Build the element for the dom
  buildElement(vehicleContent, vehicleTextNode, "test-class");

  //** Age
  // Get age
  const vehicleAge = determineAge(localStorage.getItem("Model Year"));
  // Build text node
  const vehicleAgeTextNode = createAgeText(vehicleAge);
  // Build element
  buildElement(vehicleContent, vehicleAgeTextNode, 'sub-test-class');

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

  //**********************************************************************

  /**
   * createSingleWordText() takes a key for local storage in and builds
   * a text node from the value.
   * Arguments : String
   * Return : TextNode
   */
  function createSingleWordText(key) {
    // Get the value from local storage with the given key.
    const text = capitalize(localStorage.getItem(key));
    // Return the node
    return document.createTextNode(text);
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