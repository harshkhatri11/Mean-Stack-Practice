const UserProfile = require('../models/userProfileModel');


exports.updateUserDetails = (req, res, next) => {
    let fetchedUserDetails = req.body;
    const userProfileDetails = new UserProfile({
        name:fetchedUserDetails.name,
        dob:fetchedUserDetails.dob
    });
    userProfileDetails.save().then(result => {
        res.status(201).json({
            message: 'Details inserted successfully',
            result: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Something went wrong !!"
        });
    })
}