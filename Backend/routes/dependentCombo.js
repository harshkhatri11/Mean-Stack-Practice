const express = require("express");
const DependentComboController = require("../controllers/dependentComboController");

const dependentComboRouter = express.Router();

dependentComboRouter.post("/getDependentCombo", DependentComboController.getDependentCombo);

module.exports = dependentComboRouter;