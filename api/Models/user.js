const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"]
    },
    password: {
        type: String,
        required: [true, "Your password is required"]
    },
    verified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "Basic",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id },
        process.env.TOKEN_KEY, {
            expiresIn: 3 * 24 * 60 * 60,
        });

    return token;
}

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }3
})
userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 12);
})

module.exports = mongoose.model("User", userSchema);
