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

// Functions to calculate data based on element´s info and appending it to the element. Now using constants.

const addLackOfMass = element => {
  return {
    ...element,
    lackOfMass: (element.z * PROTON_WEIGHT_UMA + (element.n - element.z) * NEUTRON_WEIGHT_UMA - element.weight) * UMA_TO_KG
  };
};

const addBindingEnergy = element => {
  return {
    ...element,
    bindingEnergy: element.lackOfMass * Math.pow(SPEED_OF_LIGHT, 2)
  };
};

const addBindingEnergyPerNucleonInMeV = element => {
  return {
    ...element,
    bindingEnergyPerNucleon: (element.bindingEnergy / element.n) * JULE_TO_MEV
  };
};

// Input mapping
const enrichedData = data
  .map(addLackOfMass)
  .map(addBindingEnergy)
  .map(addBindingEnergyPerNucleonInMeV);

// Writing output
fs.writeFile(
  "./output/generatedData.json",
  JSON.stringify(enrichedData),
  err => {
    if (err) throw err;
    console.log("The file has been saved!");
  }
);
