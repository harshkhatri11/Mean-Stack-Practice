const path = require('path');
const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');

const userRoutes = require('./routes/user');
const userDetailsRoutes = require('./routes/userProfile');
const comboRoutes = require('./routes/combo');
const dependentComboRoutes = require('./routes/dependentCombo');
const Role = require('./models/roleModel');
const Combo = require('./models/comboModel');
const DependentCombo = require('./models/dependentComboModel');
const User = require('./models/comboModel');

const crypto = require('crypto');


const app = express();

const connectDB = async () => {
  try {
    /*When the strict option is set to true, Mongoose will ensure that only the fields that are specified in your schema 
    will be saved in the database, and all other fields will not be saved (if some other fields are sent).*/
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb+srv://harsh:" + process.env.MONGO_ATLAS_PW + "@authentication.xrjjhug.mongodb.net/test")
    console.log("Connected to database!");
    // initial()

  } catch (error) {
    console.log(error);
  }
}

connectDB();
app.use(cors());

/* By default, $ and . characters are removed completely from user-supplied input in the following places:
req.body,req.params,req.headers,req.query*/
app.use(mongoSanitize());

// parse requests of content-type - application/json
app.use(express.json());

app.use('/user', userRoutes);
app.use('/userDetails', userDetailsRoutes);
app.use('/combo', comboRoutes);
app.use('/combo', dependentComboRoutes);

//Globally handle error
app.use((err, req, res, next) => {
  console.log(err.stack);
  if (err.status) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send('Internal Server Error');
  }
});

function initial() {
  // Role.estimatedDocumentCount((err, count) => {
  //   if (!err && count === 0) {
  //     new Role({
  //       name: "user"
  //     }).save(err => {
  //       if (err) {
  //         console.log("error", err);
  //       }

  //       console.log("added 'user' to roles collection");
  //     });

  //     new Role({
  //       name: "moderator"
  //     }).save(err => {
  //       if (err) {
  //         console.log("error", err);
  //       }

  //       console.log("added 'moderator' to roles collection");
  //     });

  //     new Role({
  //       name: "admin"
  //     }).save(err => {
  //       if (err) {
  //         console.log("error", err);
  //       }

  //       console.log("added 'admin' to roles collection");
  //     });
  //   }
  // });


  // Combo.estimatedDocumentCount((err, count) => {
  //   if (!err && count === 0) {
  //     new Combo({
  //       optionDesc: "",
  //       optionText: 'Yes',
  //       optionValue: 'Yes'
  //     }).save(err => {
  //       if (err) {
  //         console.log("error", err);
  //       }

  //       console.log("added 'user' to roles collection");
  //     });

  // new Role({
  //   name: "moderator"
  // }).save(err => {
  //   if (err) {
  //     console.log("error", err);
  //   }

  //   console.log("added 'moderator' to roles collection");
  // });

  // new Role({
  //   name: "admin"
  // }).save(err => {
  //   if (err) {
  //     console.log("error", err);
  //   }

  //   console.log("added 'admin' to roles collection");
  // });
  // }
  // });



  // try {
  //   const combo = DependentCombo.create({
  //     comboID: 600000,
  //     comboName: 'Designation',
  //     comboData: {
  //       'Executive Leadership': [
  //         { optionDesc: 'Chief Executive Office', optionText: 'Chief Executive Office', optionValue: 'Chief Executive Office' },
  //         { optionDesc: 'Office of the CEO', optionText: 'Office of the CEO', optionValue: 'Office of the CEO' },
  //         { optionDesc: 'Executive Management', optionText: 'Executive Management', optionValue: 'Executive Management' },
  //       ],
  //       'Human Resources': [
  //         { optionDesc: 'Human Resources', optionText: 'Human Resources', optionValue: 'Human Resources' },
  //         { optionDesc: 'People and Culture', optionText: 'People and Culture', optionValue: 'People and Culture' },
  //         { optionDesc: 'Talent Acquisition', optionText: 'Talent Acquisition', optionValue: 'Talent Acquisition' },
  //       ],
  //       'IT/Technology': [
  //         { optionDesc: 'Information Technology ', optionText: 'Information Technology ', optionValue: 'Information Technology ' },
  //         { optionDesc: 'Technology Department', optionText: 'Technology Department', optionValue: 'Technology Department' },
  //         { optionDesc: 'Software Development', optionText: 'Software Development', optionValue: 'Software Development' },
  //         { optionDesc: 'IT Operations', optionText: 'IT Operations', optionValue: 'IT Operations' }
  //       ],
  //       'Operations':[
  //         { optionDesc: 'Operations Department ', optionText: 'Operations Department ', optionValue: 'Operations Department ' },
  //         { optionDesc: 'Operations and Logistics', optionText: 'Operations and Logistics', optionValue: 'Operations and Logistics' },
  //         { optionDesc: 'Facilities Management', optionText: 'Facilities Management', optionValue: 'Facilities Management' },
  //         { optionDesc: 'Administration', optionText: 'Administration', optionValue: 'Administration' }
  //       ]
  //     },
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
}

module.exports = app;

