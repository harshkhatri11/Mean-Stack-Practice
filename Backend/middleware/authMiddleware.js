const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated!",
    });
  }
};

isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      Role.find({ _id: { $in: user.roles } })
        .then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
          res.status(403).json({ message: "Require Admin Role!" });
          return;
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
};

isModerator = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      Role.find({ _id: { $in: user.roles } })
        .then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
          res.status(403).json({ message: "Require Moderator Role!" });
          return;
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
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJwt;
