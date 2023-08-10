const User = require('../Models/user');
const Token = require('../Models/token');
const crypto = require("crypto");
const { sendEmail } = require("../util/sendEmail");
const ObjectID = require("mongoose").ObjectID;


module.exports.register = async (req, res) => {
    try {
        const { email, password, username, createAt} = req.body;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).send({ message: "User with given email already exists"});
       /*      await User.deleteOne({ _id: existingUser._id})*/
        }
        const user = await User.create({ email, password, username, createAt });

        console.log(user);

        res.cookie('jwt', user.token, {
            httpOnly: true,
            withCredentials: true,
            /*
            secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
            */
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
        res.status(201).send({
            message: "An Email sent to your account please verify",
        });
    } catch (error) {
        res.status(500).json({
            message: "User not successful created",
            error: error.mesage,
        })
    }
};


module.exports.emailVerify = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user) return res.status(400).send({ message: "Invalid link"});

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if(!Token) return res.status(400).send({ message: "Invalid link"});
        await User.updateOne({_id: {_id:user._id}},{ verified: true});
        await token.deleteOne();
        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error"});
    }
}