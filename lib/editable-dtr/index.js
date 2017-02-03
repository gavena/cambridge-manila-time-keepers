const persistenceProvider = require('../../persistence/provider');
const EditableDtr = persistenceProvider.EditableDtr;
const Employee = persistenceProvider.Employee;
const Shift = persistenceProvider.Shift;

const editableDtr = {};

editableDtr.all = (callback) => {
    EditableDtr.find({}, (error, dtr) => {
        if (error) {
            return callback(error);
        }

        return callback(null, dtr);
    });
}

editableDtr.getDtr = (data, callback) => {
    EditableDtr.findOne({
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

editableDtr.getByYearAndMonth = (data, callback) => {
    EditableDtr.find({ $and:
                      [{month: data.month},
                      {year: data.year}]
    }, (error, details) => {
        if (error) {
            return callback(error);
        }
        return callback(null, details);
    });
}

editableDtr.submit = (data, callback) => {
  var dtr = new EditableDtr();
  dtr.submit(data, (error, details) => {
       if (error) {
           return callback(error);
       }
       return callback(null, details);
   });
}

editableDtr.approve = (data, callback) => {
  var dtr = new EditableDtr();
  dtr.approve(data, (error, details) => {
       if (error) {
           return callback(error);
       }
       return callback(null, details);
   });
}

editableDtr.return = (data, callback) => {
  var dtr = new EditableDtr();
  dtr.return(data, (error, details) => {
       if (error) {
           return callback(error);
       }
       return callback(null, details);
   });
}


editableDtr.update = (data, callback) => {
  var dtr = new EditableDtr();

  dtr.updateData(data, (error, details) => {
       if (error) {
           return callback(error);
       }
       return callback(null, details);
   });
}

editableDtr.convert = (data, callback) => {
  var dtr = new EditableDtr();
  dtr.convert(data, (error,details) => {
    if(error) {
      return callback(error)
    }

    return callback(null, details);
  });
}

editableDtr.insertEntriesByIdAndMonth = (data, callback) => {
    var dtrModel = new EditableDtr();
    Employee.findOne({workday_id : data.workday_id},
      (error, employee) => {
        if(error){
          return callback(error);
        }

        if(employee){
          shiftId = employee.shift ? employee.shift : "588b6561572f7122ecfafd6c"; //default shift id
          
          Shift.findOne({_id : shiftId}, (error, shift) => {
            if(error){
              return callback(error);
            }

            EditableDtr.findOneAndUpdate(
              {
                first_name : employee.first_name,
                middle_name : employee.middle_name,
                last_name : employee.last_name,
                position : employee.position,
                line_manager : employee.line_manager,
                lm_workday_id : employee.lm_workday_id,
                username : employee.username
              },
              {
                $addToSet: {"entries": {$each: employee.entries}}
              },
              {
                  upsert: true, "new": true
              }, function (err, doc) {
                  if (err) return (500, {error: err})
              }
            );

          });

        } else {
          EditableDtr.findOneAndUpdate({
                workday_id: data.workday_id,
                year: data.year,
                month: data.month
            },
            
            {
                $addToSet: {"entries": {$each: data.entries}}
            },
            {
                upsert: true, "new": true
            }, function (err, doc) {
                if (err) return (500, {error: err})
            }
          );
        }
    });
}

module.exports = editableDtr;
