const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    avatar: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    lastLogin: { type: Date, default: Date.now() },
    isAdmin: { type: Boolean, default: false },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    basicDetails: {
      firstName: String,
      middleName: String,
      lastName: String,
      phone: String,
      sex: String,
      dob: Date
    },
    empDetails: {
      // organization:String,
      // empId: Number,
      department:String,
      designation: String,
      dateOfJoining: Date,
      isStatusActive: { type: Boolean, default: false },
      employeementType:String,
    }
  },
  { timestamps: true });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);