const express = require("express");
const cors = require("cors");
const winston = require("winston");
const calculateRoutes = require("./routes/calculateRoutes");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console()
  ]
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", calculateRoutes);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
}