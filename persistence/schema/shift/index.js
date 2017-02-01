const mongocon = require('../../mongocon');
const mongoose = mongocon.mongoose;
const shiftSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    start: Date,
    end: Date,
    hours_flex: Number,
    created_by: String,
    timezone : String
});

module.exports = mongoose.model('Shift', shiftSchema);
