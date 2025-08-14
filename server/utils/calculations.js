exports.calculateFuelEfficiency = (data) => {
  // Пример расчета, замените на реальную логику
  const fuelEfficiency = 0.85;
  const maxRange = data.aircraftMass * 0.5;
  const cost = data.payload * 1000;
  return { fuelEfficiency, maxRange, cost };
};
