const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL, PORT} = process.env;

mongoose
    .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://127.0.0.1:5173",
        method: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
}));

app.use(express.json());
app.use('/', authRoute)

//down below to change

/*const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sdasdasdasqgqeggqeg';







app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt)
        });
        res.json(userDoc);
    } catch (err) {
        res.status(422).json(err);
    }
})

app.post('/login', async (req, res) => {
    const { email, password} = req.body;
    const userDoc = await User.findOne({ email});
    if(userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if(passOk) {
            jwt.sign(
                {
                    email:userDoc.email,
                    id: userDoc._id,
                },
                jwtSecret,
                {},
                (err, token) => {
                    if(err) throw err;
                    res.cookie('token', token).json(userDoc)
                });
        } else {
            res.status(422).json('pass not ok')
        }
    } else {
        res.json('not found');
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            const {name, email, _id} = await User.findById(userData.id)
            res.json({name, email, _id});
        })
    }else {
        res.json(null)
    }
});
app.post('/logout', (req, res) => {
   res.cookie('token', '').json(true);
});*/
