const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({
    UserId: { type: Number, required: true, integer: true},
    UserName: { type: String, required: true },
    UserPassword: { type: String, required: true},
    Gender: { type: String },
    Location: { type: String, default: ""},
    Bio: { type: String, default: ""},
    EmailAddress: { type: String, required: true, unique: true },
    RegistrationDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
