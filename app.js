const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Slot = require("./utils/slot");
const controller = require("./controllers/controller");

const app = express();
app.use(cors()); ///Allows requests from all origins
app.use(bodyParser.json()); //converts incomming requests into readable json format

app.post("/slots/add-slot", controller.addSlot);
app.get("/slots/get-slots", controller.getSlots);
app.delete("/slots/delete-slot/:id", controller.deleteSlot);

Slot.sync() // add Slot.sync({ force: true }) to force sync/over-ride the table
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(`ERROR CONNECTING TO DATABASE ${err}`);
  });
