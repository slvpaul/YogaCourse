const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {type: String, required: true},
    created: {type: Date, default: Date.now},
    isSubscribed: {type: Boolean, default: false},
    completedLesson: {type: Number, default: 0}
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hashPassword);
};

const User = module.exports = mongoose.model('User', userSchema);