const express = require('express');
const userProfileController = require('../controllers/userProfileController')

const router = express.Router();

router.post("/userProfileDetails",userProfileController.updateUserDetails);

module.exports = router;