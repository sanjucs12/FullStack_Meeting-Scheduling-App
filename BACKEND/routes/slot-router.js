const express = require("express");
const controller = require("../controllers/slots-controller");

const router = express.Router();

router.post("/slots/add-slot", controller.addSlot);
router.get("/slots/get-slots", controller.getSlots);
router.delete("/slots/delete-slot/:id", controller.deleteSlot);

module.exports = router;
