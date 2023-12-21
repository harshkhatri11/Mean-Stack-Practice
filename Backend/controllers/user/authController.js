const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const Role = require("../../models/roleModel");

exports.createUser = async (req, res) => {
  try {
    const { email, password, roles } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      return res.status(409).json({
        msgDisplay: true,
        error: "User already exists",
        message: "",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({ email, password: hashedPassword });

    newUser
      .save()
      .then((user) => {
        if (roles) {
          Role.find({ name: { $in: roles } })
            .then((roles) => {
              user.roles = roles.map((role) => role._id);
              user
                .save()
                .then((response) => {
                  res.status(201).json({
                    msgDisplay: true,
                    error: "",
                    message: "User registered successfully",
                  });
                })
                .catch((err) => {
                  res.status(500).send({ message: err });
                  return;
                });
            })
            .catch((err) => {
              res.status(500).send({ message: err });
              return;
            });
        } else {
          Role.findOne({ name: "user" })
            .then((role) => {
              user.roles = [role._id];
              user
                .save()
                .then((response) => {
                  res.status(201).json({
                    msgDisplay: true,
                    error: "",
                    message: "User registered successfully",
                  });
                })
                .catch((err) => {
                  res.status(500).send({ message: err });
                  return;
                });
            })
            .catch((err) => {
              res.status(500).send({ message: err });
              return;
            });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err });
        return;
      });
  } catch (error) {
    res.status(400).json({
      msgDisplay: true,
      error: "",
      message: "Error while creating user",
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    let authorities = [];
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).populate("roles", "-__v");

    if (!user) {
      return res.status(401).json({
        msgDisplay: true,
        error: "Invalid credentials",
        message: "",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        msgDisplay: true,
        error: "Invalid credentials",
        message: "",
      });
    }

    await User.findOneAndUpdate(
      { email: req.body.email },
      { lastLogin: Date.now() }
    );

    user.roles.forEach((element) => {
      authorities.push("ROLE_" + element.name.toUpperCase());
    });

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
        role: authorities,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).send({
      token: token,
      userId: user._id,
      expiresIn: 3600,
      roles: authorities,
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
