/*  Now magic numbers are not magic anymore.
    They have been moved to a file where their meanings
    are shown explicitly.
*/

const data = require("./input/data.json");
const fs = require("fs");

const {
  SPEED_OF_LIGHT,
  PROTON_WEIGHT_UMA,
  NEUTRON_WEIGHT_UMA,
  UMA_TO_KG,
  JULE_TO_MEV
} = require("./constants");

// Functions to calculate data based on element´s info. Now using constants.

const getLackOfMass = (z, n, weight) =>
  (z * PROTON_WEIGHT_UMA + (n - z) * NEUTRON_WEIGHT_UMA - weight) * UMA_TO_KG;

const getBindingEnergy = lackOfMass => lackOfMass * Math.pow(SPEED_OF_LIGHT, 2);

const getBindingEnergyPerNucleonInMeV = (bindingEnergy, n) =>
  (bindingEnergy / n) * JULE_TO_MEV;

// Function to generate new element object with calculations attached to it
const elementInfoEnrichment = element => {
  const richElement = { ...element };
  richElement.lackOfMass = getLackOfMass(element.z, element.n, element.weight);
  richElement.bindingEnergy = getBindingEnergy(richElement.lackOfMass);
  richElement.bindingEnergyPerNucleon = getBindingEnergyPerNucleonInMeV(
    richElement.bindingEnergy,
    element.n
  );
  return richElement;
};

// Input mapping
const generatedData = data.map(elementInfoEnrichment);

// Writing output
fs.writeFile(
  "./output/generatedData.json",
  JSON.stringify(generatedData),
  err => {
    if (err) throw err;
    console.log("The file has been saved!");
  }
);
