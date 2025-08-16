const logger = require('../logger');
const path = require('path');

let fuelComponents;
try {
  fuelComponents = require(path.join(__dirname, '../data/fuelComponents.json'));
  logger.info("fuelComponents.json loaded successfully, length:", fuelComponents.length);
  console.log("fuelComponents.json loaded successfully, length:", fuelComponents.length);
} catch (error) {
  logger.error("Failed to load fuelComponents.json:", error.message);
  console.error("Failed to load fuelComponents.json:", error.message);
  fuelComponents = [];
}

exports.calculateFuelEfficiency = async (data) => {
  logger.info("Received data in calculations.js:", JSON.stringify(data, null, 2));
  console.log("Received data in calculations.js:", JSON.stringify(data, null, 2));
  const { vehicleType, engineType, aircraftMass, fuelTankVolume, payload, wsmCoefficients, limitingParameters } = data;

  logger.info("Loaded fuelComponents length:", fuelComponents.length);
  console.log("Loaded fuelComponents length:", fuelComponents.length);
  logger.info("First component example:", fuelComponents[0] ? JSON.stringify(fuelComponents[0].compatibleWith) : 'No components loaded');
  console.log("First component example:", fuelComponents[0] ? JSON.stringify(fuelComponents[0].compatibleWith) : 'No components loaded');

  logger.info("Input types:", { vehicleType: typeof vehicleType, engineType: typeof engineType });
  console.log("Input types:", { vehicleType: typeof vehicleType, engineType: typeof engineType });

  const components = fuelComponents.filter(c => c.compatibleWith.includes(vehicleType) && c.compatibleWith.includes(engineType));
  logger.info("Filtered component names:", components.map(c => c.name));
  console.log("Filtered component names:", components.map(c => c.name));

  if (!components.length) {
    logger.error(`No compatible components for vehicleType: ${vehicleType}, engineType: ${engineType}`);
    console.error(`No compatible components for vehicleType: ${vehicleType}, engineType: ${engineType}`);
    throw new Error('No compatible fuel components found');
  }

  const totalComponents = Math.min(components.length, 6);
  const proportions = [0.50, 0.20, 0.15, 0.10, 0.03, 0.02].slice(0, totalComponents);
  const sumProportions = proportions.reduce((sum, p) => sum + p, 0);
  const normalizedProportions = proportions.map(p => p / sumProportions);
  const mixture = components.slice(0, totalComponents).map((component, index) => ({
    name: component.name,
    proportion: normalizedProportions[index] || 0
  }));
  logger.info("Selected mixture:", JSON.stringify(mixture, null, 2));
  console.log("Selected mixture:", JSON.stringify(mixture, null, 2));

  const properties = {
    freezingTemp: 0,
    density: 0,
    viscosity: 0,
    combustionHeat: 0,
    coolingResource: 0,
    thermalConductivity: 0,
    heatCapacity: 0,
    inductionPeriod: 0,
    burningRate: 0,
    vaporPressure: 0
  };
  Object.keys(properties).forEach(prop => {
    properties[prop] = mixture.reduce((sum, m) => {
      const comp = components.find(c => c.name === m.name);
      return sum + (comp ? m.proportion * comp[prop] : 0);
    }, 0);
    logger.info(`Calculated ${prop}: ${properties[prop]}`);
    console.log(`Calculated ${prop}: ${properties[prop]}`);
  });

  let valid = true;
  const failedProperties = [];
  Object.keys(limitingParameters).forEach(key => {
    const { min, max } = limitingParameters[key];
    if (isNaN(min) || isNaN(max)) {
      logger.error(`Invalid min/max for ${key}: min=${min}, max=${max}`);
      console.error(`Invalid min/max for ${key}: min=${min}, max=${max}`);
      valid = false;
    } else if (min === max && min === 0) {
      return;
    } else if (properties[key] < min || properties[key] > max) {
      logger.error(`Property ${key} (${properties[key]}) outside range [${min}, ${max}]`);
      console.error(`Property ${key} (${properties[key]}) outside range [${min}, ${max}]`);
      failedProperties.push({ key, value: properties[key], min, max });
      valid = false;
    }
  });
  if (!valid) {
    logger.error("Failed properties:", JSON.stringify(failedProperties, null, 2));
    console.error("Failed properties:", JSON.stringify(failedProperties, null, 2));
    throw new Error('No valid mixture found');
  }

  const energyDensity = properties.combustionHeat / properties.density;
  const fuelEfficiency = 0.85 + (wsmCoefficients.range / 100) * 0.15;
  const maxRange = (energyDensity * fuelTankVolume / aircraftMass) * 0.5;
  const cost = payload * 1000 * properties.density;

  const viscosityTemps = [-20, -10, 0, 10, 20, 30];
  const viscosityData = viscosityTemps.map(temp => {
    const dataPoint = { temp };
    mixture.forEach((comp, i) => {
      const component = fuelComponents.find(c => c.name === comp.name);
      if (component) {
        const viscosity = component.viscosity * (1 - 0.02 * (temp + 20) / 10);
        dataPoint[`sample${i + 1}`] = Number(viscosity.toFixed(2));
      }
    });
    return dataPoint;
  });

  const heatCapacityPoints = [1, 2, 3, 4, 5, 6];
  const heatCapacityData = heatCapacityPoints.map(point => {
    const dataPoint = { temp: point * 100 };
    mixture.forEach((comp, i) => {
      const component = fuelComponents.find(c => c.name === comp.name);
      if (component) {
        const variation = 1 + (Math.random() - 0.5) * 0.1;
        dataPoint[`sample${i + 1}`] = Number((component.heatCapacity * variation / 1000).toFixed(2));
      }
    });
    return dataPoint;
  });

  return {
    mixture,
    properties,
    fuelEfficiency,
    maxRange,
    cost,
    graphData: {
      viscosity: viscosityData,
      heatCapacity: heatCapacityData
    }
  };
};