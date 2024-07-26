// index.js
const express = require("express");
const app = express();
const routes = require("./src/route");
const cors = require("cors");
require("dotenv").config();

if (process.env.NODE_ENV != "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use("/", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
