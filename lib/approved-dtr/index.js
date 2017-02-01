const persistenceProvider = require('../../persistence/provider');
const ApprovedDtr = persistenceProvider.ApprovedDtr;
const approvedDtr = {};

approvedDtr.all = (callback) => {
    ApprovedDtr.find({}, (error, dtr) => {
        if (error) {
            return callback(error);
        }

        return callback(null, dtr);
    });
}

approvedDtr.getByDtr = (data, callback) => {
    ApprovedDtr.find({
        username: data.username,
        month: data.month,
        year: data.year
    }, (error, details) => {
        if (error) {
            return callback(error);
        }
        return callback(null, details);
    });
}

approvedDtr.getByYearAndMonth = (year, month, callback) => {
    ApprovedDtr.find({ $and:
                      [{month: month},
                      {year: year}]
    }, (error, details) => {
        if (error) {
            return callback(error);
        }
        return callback(null, details);
    });
}

approvedDtr.submit = (data, callback) => {
  var dtr = new ApprovedDtr();
  dtr.submit(data, (error, details) => {
       if (error) {
           return callback(error);
       }
       return callback(null, details);
   });
}

approvedDtr.approve = (data, callback) => {
  var dtr = new ApprovedDtr();
  dtr.approve(data, (error, details) => {
       if (error) {
           return callback(error);
       }
       return callback(null, details);
   });
}

approvedDtr.return = (data, callback) => {
  var dtr = new ApprovedDtr();
  dtr.return(data, (error, details) => {
       if (error) {
           return callback(error);
       }
       return callback(null, details);
   });
}


approvedDtr.update = (data, callback) => {
  var dtr = new ApprovedDtr();

  dtr.updateData(data, (error, details) => {
       if (error) {
           return callback(error);
       }
       return callback(null, details);
   });
}

module.exports = approvedDtr;
