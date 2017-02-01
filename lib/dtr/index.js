const persistenceProvider = require('../../persistence/provider');
const Dtr = persistenceProvider.Dtr;
const dtr = {};

dtr.all = (callback) => {
    Dtr.find({}, (error, shifts) => {
        if (error) {
            return callback(error);
        }

        return callback(null, shifts);
    });
}

dtr.getByDtr = (data, callback) => {
    Dtr.find({
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

dtr.insertEntriesByIdAndMonth = (data, callback) => {
    var dtrModel = new Dtr();
    dtrModel.insertEntriesByIdAndMonth(data, (error, details) => {
        if (error) {
            return callback(error);
        }
        return callback(null, details);
    });
}

module.exports = dtr;
