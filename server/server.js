const express = require("express");
const cors = require("cors");
const calculateRoutes = require("./routes/calculateRoutes");
const logger = require("./logger");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", calculateRoutes);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
}