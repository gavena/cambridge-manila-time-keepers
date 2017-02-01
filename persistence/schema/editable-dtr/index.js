const mongocon = require('../../mongocon');
const mongoose = mongocon.mongoose;
const rawDtr = require('../raw-dtr');
const moment = require('moment');
const employee = require('../employee');
const shift = require('../shift');

const editableDtrSchema = new mongoose.Schema({
    id: String,
    dtr_id: String,
    user_id: String, //change to employee id
    workday_id: String,
    username: String,
    manager_username: String,
    submitted_date:  Date,
    approved_date: Date,
    returned_date: Date,
    is_certified: Boolean,
    status: String,
    remarks: String,
    year: String,
    month: String,
    entries: [],
    dates: [],
    changes: [],
    convertedDates : [],
    entries : [Date],
    first_name : String,
    middle_name : String,
    last_name : String,
    position : String,
    line_manager : String,
    lm_workday_id : String,
    total_late : Number,
    total_undertime : Number,
    total_work_hours : Number,
    late_count : Number,
    undertime_count : Number
});

editableDtrSchema.methods.updateData = function updateData(data, callback) {
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

editableDtrSchema.methods.submit = function submit(data, callback) {
     let params = data.split("/");
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

editableDtrSchema.methods.approve = function approve(data, callback) {
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

editableDtrSchema.methods.return = function approve(data, callback) {
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

editableDtrSchema.methods.convert = function convert(data, callback) {
  this.model('editable_dtr').findOne({
    username : data.username,
    year : data.year,
    month : data.month
  }, (error, dtr) => {
    if(error) {
      return callback(error);
    }

    employee.findOne({
      username : data.username
    }, (error, employee) => {
      if(error){
        return callback(error);
      }

      shift.findOne({_id : employee.shift}, (error, shift) => {
          if(error){
            return callback(error);
          }

          var groupByDays = getGroupByDays(dtr.entries, shift.timezone);
          var convertedDates = getConvertedDates(groupByDays, shift);
          var totalLates = getTotal('late',convertedDates);
          var totalUndertime = getTotal('undertime', convertedDates);
          var totalWorkHours = getTotal('duration', convertedDates);
          var lateCount = getCount('late', convertedDates);
          var undertimeCount = getCount('undertime', convertedDates);

          var record = {
            first_name : employee.first_name,
            middle_name : employee.middle_name,
            last_name : employee.last_name,
            position : employee.position,
            line_manager : employee.line_manager,
            lm_workday_id : employee.lm_workday_id,
            convertedDates : convertedDates,
            total_late : totalLates,
            total_undertime : totalUndertime,
            total_work_hours : totalWorkHours,
            late_count : lateCount,
            undertime_count : undertimeCount,
            username : employee.username
          }

          this.model('editable_dtr').update({_id : dtr._id}, record, function(err, res){
          return callback(null, res);
        })
      });     
    });
  });
}

editableDtrSchema.methods.insertEntriesByIdAndMonth = function insertTimeEntries(employeeData, callback) {
    this.model('editable_dtr').findOneAndUpdate(
        {
            workday_id: employeeData.workday_id,
            year: employeeData.year,
            month: employeeData.month
        },
        {
            $addToSet: {"entries": {$each: employeeData.entries}}
        },
        {
            upsert: true, "new": true
        }, function (err, doc) {
            if (err) return (500, {error: err})
        });
}


function getGroupByDays(entries, zoneName){
    var groupByDays = [];

    for(var entry of entries){
      var convertedDate = moment(entry).utcOffset(zoneName);
      var momentObj = convertedDate.toObject();
      
      if(!groupByDays[momentObj.date]){
          groupByDays[momentObj.date] = [];
      }
      groupByDays[momentObj.date].push(convertedDate);
    }

    return groupByDays;

}

function getConvertedDates(entries, shift){

  var convertedDates = [];
  for(var dates of entries){
    if(dates){
      var firstIn = moment.min(dates).seconds(0);
      var lastOut = moment.max(dates).seconds(0);
      var duration = moment.duration(lastOut.diff(firstIn)).asMinutes();
      convertedDates[firstIn.date()] = {
                                  duration : duration,
                                  late : getLateDuration(firstIn, shift),
                                  undertime : getUndertimeDuration(lastOut, duration, shift),
                                  original : {
                                    arrival : firstIn.toDate(),
                                    departure : lastOut.toDate(),
                                  }
                                };
    }
  }

  return convertedDates;
}

function getLateDuration(firstIn, shift){
  var shiftStart = shift.start;
  var startTimeMoment = moment(firstIn).hour(shiftStart.getHours()).minute(shiftStart.getMinutes());
  
  if(shift.hours_flex){
    startTimeMoment = startTimeMoment.add(shift.hours_flex, 'hours');
  }
  var lateDuration = moment.duration(firstIn.diff(startTimeMoment));

  // console.log(startTimeMoment.toString());
  // console.log(firstIn.toString());
  // console.log(lateDuration.asMinutes());
  return lateDuration.asMinutes() > 0 ? lateDuration.asMinutes() : 0;
}

function getUndertimeDuration(lastOut, duration, shift) {
  var undertimeDuration = 0;
  var end = shift.end;
  var endTimeMoment = moment(lastOut).hour(end.getHours()).minute(end.getMinutes());

  var lastOutDiff = moment.duration(endTimeMoment.diff(lastOut));
  var eightHours = moment.duration(8, 'hours').asMinutes();
  console.log(eightHours);
  if(lastOutDiff > 0) {
    undertimeDuration = lastOutDiff.asMinutes();
  } else if(duration < eightHours){
    undertimeDuration = eightHours - duration;
  }
  
  console.log(duration);
  console.log(endTimeMoment.toString());
  console.log(lastOut.toString());
  console.log(undertimeDuration);

  return undertimeDuration;
}

function getTotal(fieldname, convertedDates){
  var total = 0;
  for(var convertedDate of convertedDates){
    console.log(convertedDate);
    if(convertedDate && convertedDate[fieldname]){
      total += convertedDate[fieldname]
    }
  }

  console.log('total ' + fieldname + ':' + total);
  return total;
}

function getCount(fieldname, convertedDates){
  var total = 0;
  for(var convertedDate of convertedDates){
    if(convertedDate && convertedDate[fieldname]){
      total ++;
    }
  }

  console.log('total count' + fieldname + ':' + total);
  return total;
}

module.exports = mongoose.model('editable_dtr', editableDtrSchema);
