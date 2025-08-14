exports.calculateFuelEfficiency = (data) => {
  const fuelEfficiency = 0.85; // Replace with actual logic
  const maxRange = data.aircraftMass * 0.5;
  const cost = data.payload * 1000;
  return { fuelEfficiency, maxRange, cost };
};
