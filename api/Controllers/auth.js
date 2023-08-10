const User = require("../Models/user");
const Token = require("../Models/token");
const { sendEmail }  = require("../util/sendEmail")
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

module.exports.login = async ( req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).send({
                message: 'Email or Password not present'
            });
        }
        const user = await User.findOne({email: email});
        if (!user) return res.status(401).send({message: 'Incorrect email or password'});

        const validPassword = await user.matchPassword(password);
        if (!validPassword) return res.status(401).send({message: "Incorrect email or password"});

        if (!user.verified) {
            const tokenExisting = await Token.findOne({userId: user._id});
            if (!tokenExisting) {
                const token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();

                const url = `${process.env.BASE_URL}/${user._id}/verify/${token.token}`;
                await sendEmail(user.email, "Verify Email", url);
            }
            return res
                .status(400)
                .send({message: "An Email sent to our account please verify"})
        }
        const token = user.generateAuthToken();
        res.cookie('jwt', token, {
            httpOnly: true,
            withCredentials: true,
            /*
            secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
            */
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        res.status(200).send({data: token, message: "logged in successfully"});
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"});
    }
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

module.exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id)
        .then((user) => {
            res.status(201).json({
                user: user
            })
        })
        .catch (err => res.status(404).json({ message: 'User not found'}))

}

module.exports.logout = async (req, res) => {
    res.clearCookie("jwt");
    res.send('cookie cleared');
}