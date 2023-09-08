const Slot = require("../models/slot");

exports.addSlot = async (req, res, next) => {
  //   console.log(req.body);
  if (!req.body.name || !req.body.email || !req.body.time || !req.body.link) {
    console.log(`ERROR IN line 6 controllers/controller.js : ${err}`);
    return res.status(400).send({ message: "SOME FIELDS ARE MISSING" });
  }
  try {
    const slot = {
      name: req.body.name,
      email: req.body.email,
      time: req.body.time,
      link: req.body.link,
    };

    const newSlot = await Slot.create(slot);
    res.status(201).send(newSlot);
    console.log(`SLOT ADDED : ${newSlot}`);
  } catch (err) {
    res.status(409).send(`ERROR ADDING SLOT : ${err}`);
    console.log(`ERROR IN line 22 controllers/controller.js : ${err}`);
  }
};

exports.getSlots = async (req, res, next) => {
  try {
    const slots = await Slot.findAll();
    res.status(200).send(slots);
  } catch (err) {
    console.log(`ERROR IN line 31 controllers/controller.js : ${err}`);
    res.status(500).send(`ERROR RETRIEVING DATA ${err}`);
  }
};

exports.deleteSlot = async (req, res, next) => {
  try {
    const slotId = req.params.id; //req.params is an object which contains the details which we pass as a dynamic route
    await Slot.destroy({ where: { id: slotId } });
    res.status(200).send(`SUCCESS : Meeting cancelled for ${slotId}`);
    console.log(`SLOT REMOVED FROM DATABASE`);
  } catch (err) {
    console.log(`ERROR IN line 43 controllers/controller.js : ${err}`);
    res.status(500).send(err);
  }
};
