const mongocon = require('../../mongocon');
const mongoose = mongocon.mongoose;
const scheduleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    type: String,
    attributes: [],
    created_by: String,
    exclude_weekends: Boolean
});

module.exports = mongoose.model('Schedule', scheduleSchema);
