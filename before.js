/* A magic number is a numeric value that’s encountered 
in the source but has no obvious meaning. 
This “anti-pattern” makes it harder to understand the program and refactor the code.

Yet more difficulties arise when you need to change this magic number. 
Find and replace won’t work for this: the same number may be used for 
different purposes in different places, meaning that 
you will have to verify every line of code that uses this number. */

const data = require("./input/data.json");
const fs = require("fs");

// Functions to calculate data based on element´s info. Many numbers without obvious meaning.

const getLackOfMass = (z, n, weight) =>
  (z * 1.0076 + (n - z) * 1.0089 - weight) * 1.66 * Math.pow(10, -27);

const getBindingEnergy = lackOfMass =>
  lackOfMass * Math.pow(3 * Math.pow(10, 8), 2);

const getBindingEnergyPerNucleonInMeV = (bindingEnergy, n) =>
  (bindingEnergy / n) * 6.242 * Math.pow(10, 12);

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
