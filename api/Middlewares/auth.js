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

module.exports.userAuth = async (req, res, next) => {
    try {
            const access_token = req.cookies.access_token;
            if(!access_token) return;

            const decodedToken = jwt.verify(access_token, process.env.TOKEN_KEY);
            if(!decodedToken) return res.status(401).send({ message: "Not authorized" });
            if(decodedToken.role !== "Basic") return res.status(401).send({ message: "Not authorized" });
            req.body._id = decodedToken._id;
            req.body.role = decodedToken.role;
            next();

    } catch ( error ) {
        return res
            .status(401)
            .json({ message: "Not authorized"})
    }

}