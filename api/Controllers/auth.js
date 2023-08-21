const User = require("../Models/user");
const Token = require("../Models/token");
const { sendEmail }  = require("../util/sendEmail")
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

module.exports.login = async ( req, res) => {
    try {
        const {email, password} = req.body.props;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email or Password not present'
            });
        }
        const existingUser = await User.findOne({email: email});
        if (!existingUser) return res.status(401).json({message: 'Incorrect email or password'});

        const validPassword = await existingUser.matchPassword(password);
        if (!validPassword) return res.status(401).json({message: "Incorrect email or password"});
        const payload = {
            id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username
        }

        if (!existingUser.verified) {
            const tokenExisting = await Token.findOne({userId: existingUser._id});
            if (!tokenExisting) {
                const token = await new Token({
                    userId: existingUser._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();

                const url = `${process.env.BASE_URL}/${existingUser._id}/verify/${token.token}`;
                await sendEmail(existingUser.email, "Verify Email", url);
            }
            return res
                .status(400)
                .send({message: "An Email sent to our account please verify"})
        }
        const access_token = existingUser.generateAuthToken();
        res
            .cookie('access_token', access_token, {
            httpOnly: true,
            /*
            secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
            */
            maxAge: 60 * 60 * 24 * 30
        })
            .status(200).json({
                success: true,
                user: {
                    username: existingUser.username,
                    email: existingUser.email,
                    role: existingUser.role
                },
                message: `Hello, ${payload.username} !`
            });
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

module.exports.private = async (req, res) => {
    return json.status(201).send({
        user: { id: req.userId, role: req.role}
    })
}
module.exports.getCurrentProfile = async (req, res) => {
    const existingUser = await User.findById(req.body._id);
    if(!existingUser) return res.status(401).send({ message: "Not authorized" });

    return res.status(200).send({
            message: `Welcome, ${existingUser.username}`,
            user: {
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.role
            }
    })
}

module.exports.logout = async (req, res) => {
    res.clearCookie("access_token");
    res.send('cookie cleared');

}

module.exports.update = async(req, res, next) => {
    const {role, id} = req.body;
    if(role && id) {
        if(role === "admin") {
            await User.findById(id)
                .then((user) => {
                    if(user.role !== "admin") {
                        user.role = role;
                        user.save((err) => {
                            if(err) {
                                res.status(401)
                                    .json({ message: "An error occured", error: err.message});
                                process.exit(1);
                            }
                            res.status(201).json({ message: "Update successful", user});
                        });
                    } else {
                        res.status(400).json({message: "User is already an Admin"})
                    }
                }).catch((error) => {
                    res
                        .status(400)
                        .json({ message: "An error occurred", error: error.message });
                })
        } else {
            res.status(400).json({
                message: "Role is not admin"
            })
        }
    } else {
        res.status(400).json({
            message: "Role or Id not present"
        })
    }
}

module.exports.deleteUser = async (req, res, next) => {
    const { id} = req.body;
    await User.findById(id)
        .then(user => user.remove())
        .then(user =>
        res.status(201).json({ message: "User, successfully delated", user})
        )
        .catch(error => res.status(400)
            .json({ message: "An error occured", error: error.message}))
}

module.exports.getUser = async ( req, res, next) => {
    await User.find({})
        .then(users => {
            const userFunction = user.map(user => {
                const container = {}
                container.username = user.username;
                container.role = user.role;
                return container
            })
            res.status(200).json({user: userFunction})
        })
        .catch(err => res.status(401).json({ message: "Not succesful", error: err.message}))
}