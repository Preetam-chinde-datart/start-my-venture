const express = require("express");
const cors = require("cors");
const router = require("./routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("Server is  on PORT", PORT);
});
