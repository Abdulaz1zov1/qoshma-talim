const mongoose = require('mongoose')
const connectDB = async () => {  
    await mongoose.connect(process.env.MONGO_URL, {   
        useNewUrlParser: true,
    });

        console.log(`MongoDB Connected`);

};
module.exports = connectDB;