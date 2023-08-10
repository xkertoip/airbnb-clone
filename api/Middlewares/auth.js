const jwt = require('jsonwebtoken');
const User = require('../Models/user');

module.exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({ message: "Not authorized"})
            } else {
                if(decodedToken.role !== "admin") {
                    return res.status(401).json({ message: "Not authorized"})
                } else {
                    next()
                }
            }
        })
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available"})
    }
}

module.exports.protect = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        try {
            const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = await User.findById(decodedToken.userId).select('-password');
            next();
        } catch ( error ) {
            console.log(error);
                res.status(401).json({
                    message: 'Not authorized, token failed'
                })
            }

    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available"})
    }

}