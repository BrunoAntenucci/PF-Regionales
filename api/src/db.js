const mongoose = require('mongoose');
require('dotenv').config();
const {server , database} = process.env;


const connDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${server}/${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

module.exports = connDB