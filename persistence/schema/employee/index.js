const mongocon = require('../../mongocon');
const mongoose = mongocon.mongoose;
const employeeSchema = new mongoose.Schema({
    id: String,
    employee_id: String,
    username: String,
    workday_id: String,
    first_name: String,
    middle_name: String,
    last_name: String,
    position: String,
    department: String,
    line_manager: String,
    lm_workday_id: String,
    lm_username: String,
    usertype: String,
    shift: String,
    schedule: []

});

module.exports = mongoose.model('Employee', employeeSchema);
