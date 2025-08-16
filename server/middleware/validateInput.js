const logger = require('../logger');

module.exports = (req, res, next) => {
  logger.info("ValidateInput received request:", JSON.stringify(req.body, null, 2));
  console.log("ValidateInput received request:", JSON.stringify(req.body, null, 2));
  const { vehicleType, engineType, aircraftMass } = req.body;
  if (vehicleType == null || engineType == null || aircraftMass == null) {
    logger.error("Validation failed - Request body:", JSON.stringify(req.body, null, 2));
    console.error("Validation failed - Request body:", JSON.stringify(req.body, null, 2));
    return res.status(400).json({ error: "Missing required fields" });
  }
  logger.info("Validation passed - Request body:", JSON.stringify(req.body, null, 2));
  console.log("Validation passed - Request body:", JSON.stringify(req.body, null, 2));
  next();
};