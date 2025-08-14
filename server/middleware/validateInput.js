module.exports = (req, res, next) => {
  const { vehicleType, engineType, aircraftMass } = req.body;
  if (!vehicleType || !engineType || !aircraftMass) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  next();
};
