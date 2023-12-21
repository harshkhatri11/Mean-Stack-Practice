const express = require("express");
const ComboController = require("../controllers/comboController");

const comboRouter = express.Router();

comboRouter.post("/getCombo", ComboController.getCombo);

module.exports = comboRouter;
