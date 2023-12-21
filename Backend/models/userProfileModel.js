const mongoose = require('mongoose');


const userProfileSchema = mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true},
});

module.exports = mongoose.model('User-Profile', userProfileSchema);