const mongocon = require('../../mongocon');
const mongoose = mongocon.mongoose;
const dtrSchema = new mongoose.Schema({
    id: String,
    dtr_id: String,
    user_id: String, //change to employee id
    workday_id: String,
    username: String,
    year: String,
    month: String,
    entries: []
});

dtrSchema.methods.insertEntriesByIdAndMonth = function insertTimeEntries(employeeData, callback) {
    this.model('dtr').findOneAndUpdate(
        {
            workday_id: employeeData.workday_id,
            year: employeeData.year,
            month: employeeData.month
        },
        {
            $addToSet: {"entries":{$each: employeeData.entries}}
        },
        {
            upsert: true, "new": true
        }, function(err, doc){
            if (err) return (500, { error: err })
        });
}

module.exports = mongoose.model('dtr', dtrSchema);
