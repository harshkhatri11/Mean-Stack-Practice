const mongoose = require("mongoose");

const depedentComboSchema = mongoose.Schema({
  comboID: { type: Number, unique: true },
  comboName: { type: String,unique:true},
  comboData: {
    type: Map,
    of: [
      {
        optionDesc: String,
        optionText: String,
        optionValue: String
      },
    ],
  },
});

module.exports = mongoose.model("DependentCombo", depedentComboSchema);
