const express = require("express");
const cors = require("cors");
const apiServices = require("./Routes/API_Services");
const app = express();
const port = 3001;
app.use(cors());
app.use("/apiServices", apiServices);

app.listen(port, () => console.log("server is Running on Port", port));
