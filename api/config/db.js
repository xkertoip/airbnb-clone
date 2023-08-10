const  mongoose = require('mongoose');

module.exports.connectDB = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, connectionParams);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1)
    }
}