const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const comboSchema = mongoose.Schema({
    comboID: { type: Number, unique: true },
    comboName: { type: String,unique:true},
    comboData: {
        // type: Array,
        optionDesc: String,
        optionText: String,
        optionValue: String
    }
});

// comboSchema.pre('save', async function (next) {
//     const doc = this;
//     console.log(doc);
//     if (!doc.comboID) {
//       doc.comboID = await generateUniqueNumber();
//     }
//     next();
//   });
  
//   async function generateUniqueNumber() {
//     console.log("run");
//     const lastDoc = await YourModel.findOne({}, {}, { sort: {comboID: -1 } });
//     const lastId = lastDoc ? lastDoc.comboID : 50000;
//     return lastId + 1;
//   }

module.exports = mongoose.model('Combo', comboSchema);