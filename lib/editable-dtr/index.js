const persistenceProvider = require('../../persistence/provider');
const EditableDtr = persistenceProvider.EditableDtr;
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
    dtrModel.insertEntriesByIdAndMonth(data, (error, details) => {
        if (error) {
            return callback(error);
        }
        return callback(null, details);
    });
}

module.exports = editableDtr;
