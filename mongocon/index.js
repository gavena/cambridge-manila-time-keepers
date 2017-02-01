const mongoose = require('mongoose');
const connectionString = `mongodb://localhost:27017/tam`;

mongoose.connect(connectionString);

const mongocon = {
    connection: connectionString,
    mongoose: mongoose
};

module.exports = mongocon;
