
const ObjectId = require("mongodb").ObjectId;
const User = require("../../models/userModel");
const mongoose = require("mongoose");

exports.getUser = async (req, res) => {
  try {

    let currentUserLoggedIn;
    let usersProjection = {
      _id: 0,
      email: 1,
      lastLogin: 1,
      avatar: 1,
      roles: 1,
      basicDetails: 1,
    };
    currentUserLoggedIn = await User.findOne(
      {
        _id: new mongoose.Types.ObjectId(req.body.id),
      },
      usersProjection
    ).populate("roles", "-__v -_id");

    res.status(200).json({
      data: currentUserLoggedIn,
      msgDisplay: false,
      error: "",
      message: "",
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


exports.updateUser = async (req, res) => {
  try {
    const { id, firstName, middleName, lastName, phone, gender, dob } = req.body;
    await User.findByIdAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          "basicDetails.firstName": firstName,
          "basicDetails.middleName": middleName,
          "basicDetails.lastName": lastName,
          "basicDetails.phone": phone,
          "basicDetails.sex": gender,
          "basicDetails.dob": dob,
          "avatar":`https://ui-avatars.com/api/?size=128&name=${firstName} ${lastName}`,
        },
      }
    );
    res.status(200).json({
      msgDisplay: true,
      error: "",
      message: "User Details Updated Successfully",
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


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};