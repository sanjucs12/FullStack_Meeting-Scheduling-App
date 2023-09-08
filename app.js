const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./BACKEND/utils/database");
const slotRoutes = require("./BACKEND/routes/slot-router");

const app = express();
app.use(cors()); ///Allows requests from all origins
app.use(bodyParser.json()); //converts incomming requests into readable json format

app.use(slotRoutes);
sequelize
  .sync() // add sequelize.sync({ force: true }) to force sync/over-ride the table
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(`ERROR CONNECTING TO DATABASE ${err}`);
  });
