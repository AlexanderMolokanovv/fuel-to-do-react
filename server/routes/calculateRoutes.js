const express = require("express");
const router = express.Router();
const calculateController = require("../controllers/calculateController");
const validateInput = require("../middleware/validateInput");

router.post("/calculate", validateInput, calculateController.calculate);

module.exports = router;
