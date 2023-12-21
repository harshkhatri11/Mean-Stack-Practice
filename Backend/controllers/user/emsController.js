const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;
const User = require("../../models/userModel");
const mongoose = require("mongoose");
const Role = require("../../models/roleModel");

exports.getAllEmployee = async (req, res) => {
  try {
    let usersProjection = {
      _id: 1,
      email: 1,
      roles: 1,
      basicDetails: 1,
      empDetails: 1,
      avatar: 1,
    };
    const employees = await User.find({}, usersProjection).populate(
      "roles",
      "-__v -_id"
    );
    res.status(200).json({
      data: employees,
      msgDisplay: false,
      error: "",
      message: "",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateEmployeePersonalData = async (req, res) => {
  try {
    const {
      id,
      firstName,
      middleName,
      lastName,
      phoneNumber,
      gender,
      dateOfBirth,
    } = req.body;
    await User.findByIdAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          "basicDetails.firstName": firstName,
          "basicDetails.middleName": middleName,
          "basicDetails.lastName": lastName,
          "basicDetails.phone": phoneNumber,
          "basicDetails.sex": gender,
          "basicDetails.dob": dateOfBirth,
          avatar: `https://ui-avatars.com/api/?size=128&name=${firstName} ${lastName}`,
        },
      }
    );
    res.status(200).json({
      msgDisplay: true,
      error: "",
      message: "Employee Personal Details Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msgDisplay: true,
      error: "Something went Wrong !!!",
      message: "",
    });
  }
};

exports.updateEmployeeProfessionalData = async (req, res) => {
  try {
    const {
      id,
      departmentName,
      designationName,
      dateOfJoining,
      employmentStatus,
      employmentType,
    } = req.body;
    await User.findByIdAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          "empDetails.department": departmentName,
          "empDetails.designation": designationName,
          "empDetails.dateOfJoining": dateOfJoining,
          "empDetails.isStatusActive": employmentStatus,
          "empDetails.employeementType": employmentType,
        },
      }
    );
    res.status(200).json({
      msgDisplay: true,
      error: "",
      message: "Employee Professional Details Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msgDisplay: true,
      error: "Something went Wrong !!!",
      message: "",
    });
  }
};

exports.updateEmployeeSettingsControlsData = async (req, res) => {
  try {
    const { id, role } = req.body;
    await User.findByIdAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          roles: await Role.findOne({ name: role }).then((role) => {
            return role._id;
          }),
        },
      }
    );
    res.status(200).json({
      msgDisplay: true,
      error: "",
      message: "Employee Settings & Controls details Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msgDisplay: true,
      error: "Something went Wrong !!!",
      message: "",
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({
      msgDisplay: true,
      error: "",
      message: "Employee Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msgDisplay: true,
      error: "Something went Wrong !!!",
      message: "",
    });
  }
};

exports.isEmailExist = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email: email });
    const response = {
      isEmailExist: userData ? true : false,
    };
    if (userData) {
      res.status(200).json({
        data: response,
        msgDisplay: true,
        error: "Email already exist",
        message: "",
      });
    } else {
      res.status(200).json({
        data: response,
        msgDisplay: false,
        error: "",
        message: "",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msgDisplay: true,
      error: "Something went Wrong !!!",
      message: "",
    });
  }
};

exports.onboardNewEmployee = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      gender,
      phoneNumber,
      dateOfBirth,
      departmentName,
      designationName,
      dateOfJoining,
      employmentType,
      employmentStatus,
      email,
      password,
      role,
    } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newEmployee = {
      email: email,
      password: hashedPassword,
      avatar: `https://ui-avatars.com/api/?size=128&name=${firstName} ${lastName}`,
      "basicDetails.firstName": firstName,
      "basicDetails.middleName": middleName,
      "basicDetails.lastName": lastName,
      "basicDetails.phone": phoneNumber,
      "basicDetails.sex": gender,
      "basicDetails.dob": dateOfBirth,
      "empDetails.department": departmentName,
      "empDetails.designation": designationName,
      "empDetails.dateOfJoining": dateOfJoining,
      "empDetails.isStatusActive": employmentStatus,
      "empDetails.employeementType": employmentType,
    };

    User.create(newEmployee).then((user) => {
      Role.findOne({ name: role }).then((role) => {
        user.roles = [role._id];
        user.save();
      });
    });
    res.status(201).json({
      msgDisplay: true,
      error: "",
      message: "Employee registered successfully",
    });
  } catch (error) {
    res.status(400).json({
      msgDisplay: true,
      error: "Error while creating new Employee",
      message: "",
    });
  }
};
