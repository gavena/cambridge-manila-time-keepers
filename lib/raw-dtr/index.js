const persistenceProvider = require('../../persistence/provider');
const RawDtr = persistenceProvider.RawDtr;
const rawDtr = {};

rawDtr.all = (callback) => {
    RawDtr.find({}, (error, shifts) => {
        if (error) {
            return callback(error);
        }

        return callback(null, shifts);
    });
}

rawDtr.getByDtr = (data, callback) => {
    RawDtr.find({
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

rawDtr.insertEntriesByIdAndMonth = (data, callback) => {
    var dtrModel = new RawDtr();
    dtrModel.insertEntriesByIdAndMonth(data, (error, details) => {
        if (error) {
            return callback(error);
        }
        return callback(null, details);
    });
}

module.exports = rawDtr;
