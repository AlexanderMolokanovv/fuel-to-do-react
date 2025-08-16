const { calculateFuelEfficiency } = require("../utils/calculations");

exports.calculate = async (req, res) => {
  try {
    const data = req.body;
    const result = await calculateFuelEfficiency(data);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};