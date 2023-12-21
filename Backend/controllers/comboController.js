const Combo = require("../models/comboModel");
const mongoose = require("mongoose");

exports.getCombo = async (req, res) => {
  try {
    const { comboID } = req.body;
    const comboValues = await Combo.findOne(
      { comboID: comboID },
      { _id: 0, comboID: 0 }
    ).exec();
    res.status(200).json({
      data: comboValues,
      msgDisplay: false,
      error: "",
      message: "",
    });
  } catch (err) {
    console.log(err);
    // res.status(500).json({ error: err.message });
  }
};

// Your controller logic
// exports.createCombo = async(req, res)=>{
//   try {
//     const newCombo = new ComboModel({ /* other fields */ });
//     await newCombo.save();
//     res.status(201).json(newCombo);
//   } catch (error) {
//     console.error('Error creating combo:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }

//  db.combos.updateOne({comboName:"Gender"}, {
//     "$set": {
//       "comboData":[
//         {
//           "optionDesc" : "male",
//           "optionText" : "male",
//           "optionValue" : "male"
//         },
//         {
//           "optionDesc" : "female",
//           "optionText" : "female",
//           "optionValue" : "female"
//         }
//       ]
//     }
//   })

//   db['blog.posts'].updateOne({"title":"blog posts"}, {
//     "$push": {
//       "comments": {
//         "comment": "good post",
//         "author": "john",
//         "votes": 0
//       }
//     }
//   })

// db.combos.insertOne(
//   { comboName: "Department",
//   comboID:500005, //put last comboId+1 in this field while inserting new combo
//    "comboData":[
//         {
//           "optionDesc" : "Executive Leadership",
//           "optionText" : "Executive Leadership",
//           "optionValue" : "Executive Leadership"
//         },
//         {
//           "optionDesc" : "Operations",
//           "optionText" : "Operations",
//           "optionValue" : "Operations"
//         },
//         {
//           "optionDesc" : "Finance",
//           "optionText" : "Finance",
//           "optionValue" : "Finance"
//         },
//         {
//           "optionDesc" : "Human Resources",
//           "optionText" : "Human Resources",
//           "optionValue" : "Human Resources"
//         },
//         {
//           "optionDesc" : "Marketing",
//           "optionText" : "Marketing",
//           "optionValue" : "Marketing"
//         },
//         {
//           "optionDesc" : "Sales",
//           "optionText" : "Sales",
//           "optionValue" : "Sales"
//         },
//         {
//           "optionDesc" : "IT/Technology",
//           "optionText" : "IT/Technology",
//           "optionValue" : "IT/Technology"
//         },
//         {
//           "optionDesc" : "Customer Support",
//           "optionText" : "Customer Support",
//           "optionValue" : "Customer Support"
//         },
//         {
//           "optionDesc" : "Product Development",
//           "optionText" : "Product Development",
//           "optionValue" : "Product Development"
//         },
//         {
//           "optionDesc" : "Quality Assurance",
//           "optionText" : "Quality Assurance",
//           "optionValue" : "Quality Assurance"
//         },
//         {
//           "optionDesc" : "Legal",
//           "optionText" : "Legal",
//           "optionValue" : "Legal"
//         },
//         {
//           "optionDesc" : "Research and Analytics",
//           "optionText" : "Research and Analytics",
//           "optionValue" : "Research and Analytics"
//         },
//         {
//           "optionDesc" : "Supply Chain/Logistics",
//           "optionText" : "Supply Chain/Logistics",
//           "optionValue" : "Supply Chain/Logistics"
//         },
//         {
//           "optionDesc" : "Training and Development",
//           "optionText" : "Training and Development",
//           "optionValue" : "Training and Development"
//         }
//       ]
//   }
// );

