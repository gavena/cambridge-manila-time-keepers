const mongocon = require('../../mongocon');
const mongoose = mongocon.mongoose;

const approvedDtrSchema = new mongoose.Schema({
    id: String,
    dtr_id: String,
    user_id: String, //change to employee id
    workday_id: String,
    username: String,
    manager_username: String,
    submitted_date:  String,
    approved_date: String,
    returned_date: String,
    is_certified: String,
    status: String,
    remarks: String,
    year: String,
    month: String,
    total_work_hours: String,
    overtime_weekdays: String,
    overtime_weekends: String,
    regular_holiday: String,
    special_holiday: String,
    night_differentials: String,
    lwop_hours: String,
    tardiness_hours: String,
    dates: [],
    changes: []
});

approvedDtrSchema.methods.updateData = function updateData(data, callback) {
     this.model('approved_dtr').find({
         username: data.username,
         month: data.month,
         year: data.year
     }, (error, details) => {

        if (error) {
          return callback(error);
        }

        details.forEach((item) => {
          item.changes = data.attributes.data;
        });

        this.model('approved_dtr').findByIdAndUpdate(details[0]._id, details[0], (error, dtr) => {
          if (error) {
            return callback(error);
          }

          return callback(null, dtr);
        });
     });
}

approvedDtrSchema.methods.submit = function submit(data, callback) {
     const params = data.split("/");
     this.model('approved_dtr').find({
         username: params[0],
         month: params[2],
         year: params[1]
     }, (error, details) => {

        if (error) {
          return callback(error);
        }

        details.forEach((item) => {
          item.is_certified = "true";
          item.status = "SUBMITTED";
          item.submitted_date = new Date().toJSON();
        });

        this.model('approved_dtr').findByIdAndUpdate(details[0]._id, details[0], (error, dtr) => {

          if (error) {
            return callback(error);
          }

          return callback(null, dtr);
        });
     });
}

approvedDtrSchema.methods.approve = function approve(data, callback) {
     this.model('approved_dtr').find({
       username: data.username,
       month: data.month,
       year: data.year
     }, (error, details) => {

        if (error) {
          return callback(error);
        }

        details.forEach((item) => {
          item.status = "APPROVED";
          item.approved_date = new Date().toJSON();
        });

        this.model('approved_dtr').findByIdAndUpdate(details[0]._id, details[0], (error, dtr) => {
          if (error) {
            return callback(error);
          }
          return callback(null, dtr);
        });
     });
}

approvedDtrSchema.methods.return = function approve(data, callback) {
     this.model('approved_dtr').find({
       username: data.username,
       month: data.month,
       year: data.year
     }, (error, details) => {

        if (error) {
          return callback(error);
        }

        details.forEach((item) => {
          item.status = "RETURNED";
          item.returned_date = new Date().toJSON();
        });

        this.model('approved_dtr').findByIdAndUpdate(details[0]._id, details[0], (error, dtr) => {
          if (error) {
            return callback(error);
          }
          return callback(null, dtr);
        });
     });
}

module.exports = mongoose.model('approved_dtr', approvedDtrSchema);
