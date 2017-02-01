var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost:27017/tam';

mongoose.connect(connectionString, () => {
  console.log("Mongoose running");
});

const mongocon = {
    connection: connectionString,
    mongoose: mongoose
};

module.exports = mongocon;
