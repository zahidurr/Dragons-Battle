const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const corsOptions = require("./config/corsOptions");
const rateLimiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use(rateLimiter);
app.use("/", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
