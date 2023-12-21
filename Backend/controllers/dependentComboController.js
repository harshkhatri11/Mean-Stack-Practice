const DependentCombo = require("../models/dependentComboModel");
const mongoose = require("mongoose");

exports.getDependentCombo = async (req, res) => {

  try {
    const { comboID, dependentComboName } = req.body;
    const result = await DependentCombo.findOne({ comboID: comboID }, { _id: 0, comboID: 0 }).exec();
    const comboValues = result?.comboData.get(dependentComboName);
    res.status(200).json({
      data: comboValues,
      msgDisplay: false,
      error: "",
      message: "",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};


// db.dependentcombos.update(
//   { comboName: "Designation" },
//   {
//     $set: {
//       'comboData.Sales': [
//         { optionDesc: 'Sales Department', optionText: 'Sales Department', optionValue: 'Sales Department' },
//         { optionDesc: 'Business Development', optionText: 'Business Development', optionValue: 'Business Development' },
//         { optionDesc: 'Sales and Marketing', optionText: 'Sales and Marketing', optionValue: 'Sales and Marketing' },
//         { optionDesc: 'Customer Acquisition', optionText: 'Customer Acquisition', optionValue: 'Customer Acquisition' }
//       ],
//       'comboData.Customer Support': [
//         { optionDesc: 'Customer Support', optionText: 'Customer Support', optionValue: 'Customer Support' },
//         { optionDesc: 'Customer Service', optionText: 'Customer Service', optionValue: 'Customer Service' },
//         { optionDesc: 'Help Desk', optionText: 'Help Desk', optionValue: 'Help Desk' },
//         { optionDesc: 'Support and Success', optionText: 'Support and Success', optionValue: 'Support and Success' }
//       ],
//       'comboData.Product Development': [
//         { optionDesc: 'Product Development', optionText: 'Product Development', optionValue: 'Product Development' },
//         { optionDesc: 'Research and Development (R&D)', optionText: 'Research and Development (R&D)', optionValue: 'Research and Development (R&D)' },
//         { optionDesc: 'Product Management', optionText: 'Product Management', optionValue: 'Product Management' },
//         { optionDesc: 'Innovation', optionText: 'Innovation', optionValue: 'Innovation' }
//       ],
//       'comboData.Quality Assurance': [
//         { optionDesc: 'Quality Assurance (QA)', optionText: 'Quality Assurance (QA)', optionValue: 'Quality Assurance (QA)' },
//         { optionDesc: 'Quality Control', optionText: 'Quality Control', optionValue: 'Quality Control' },
//         { optionDesc: 'Testing and QA', optionText: 'Testing and QA', optionValue: 'Testing and QA' },
//         { optionDesc: 'Quality Management', optionText: 'Quality Management', optionValue: 'Quality Management' }
//       ],
//       'comboData.Legal': [
//         { optionDesc: 'Legal Department', optionText: 'Legal Department', optionValue: 'Legal Department' },
//         { optionDesc: 'Legal Affairs', optionText: 'Legal Affairs', optionValue: 'Legal Affairs' },
//         { optionDesc: 'Compliance', optionText: 'Compliance', optionValue: 'Compliance' },
//         { optionDesc: 'General Counsel', optionText: 'General Counsel', optionValue: 'General Counsel' }
//       ],
//       'comboData.Research and Analytics': [
//         { optionDesc: 'Research and Analytics', optionText: 'Research and Analytics', optionValue: 'Research and Analytics' },
//         { optionDesc: 'Market Research', optionText: 'Market Research', optionValue: 'Market Research' },
//         { optionDesc: 'Data Science', optionText: 'Data Science', optionValue: 'Data Science' },
//         { optionDesc: 'Business Intelligence', optionText: 'Business Intelligence', optionValue: 'Business Intelligence' }
//       ],
//       'comboData.Supply Chain/Logistics': [
//         { optionDesc: 'Supply Chain Management', optionText: 'Supply Chain Management', optionValue: 'Supply Chain Management' },
//         { optionDesc: 'Logistics', optionText: 'Logistics', optionValue: 'Logistics' },
//         { optionDesc: 'Procurement', optionText: 'Procurement', optionValue: 'Procurement' },
//         { optionDesc: 'Inventory Management', optionText: 'Inventory Management', optionValue: 'Inventory Management' }
//       ],
//       'comboData.Training and Development': [
//         { optionDesc: 'Training and Development', optionText: 'Training and Development', optionValue: 'Training and Development' },
//         { optionDesc: 'Learning and Development', optionText: 'Learning and Development', optionValue: 'Learning and Development' },
//         { optionDesc: 'Employee Training', optionText: 'Employee Training', optionValue: 'Employee Training' },
//         { optionDesc: 'Professional Development', optionText: 'Professional Development', optionValue: 'Professional Development' }
//       ]
//     }
//   }
// );