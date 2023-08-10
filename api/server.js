const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {connectDB} = require('./config/db')
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { adminAuth, protect} = require("./Middlewares/auth");
const userRoutes = require('./Routes/auth')

const { PORT} = process.env;

connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_CORS_URL,
        method: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
}));

app.use('/api', userRoutes);
app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", protect, (req, res) => res.send("User Route"));

/*if(process.env.NODE_ENV === 'production') {
        const __dirname = path.resolve();
        app.use(express.static(path.join(__dirname, '/client/dist')));

        app.get('*', (req, res) =>
            res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
        );
} else {
        app.get('/', (res, req) => {
                res.json('API is running....')
        })
}*/


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));



