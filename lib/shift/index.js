const persistenceProvider = require('../../persistence/provider');
const Shift = persistenceProvider.Shift;
const shifts = {};

shifts.all = (callback) => {
    Shift.find({}, (error, shifts) => {
        if (error) {
            return callback(error);
        }

        return callback(null, shifts);
    });
}

shifts.getById = (id, callback) => {
    Shift.find({
        _id: id
    }, (error, shift) => {
        if (error) {
            return callback(error);
        }

        return callback(null, shift);
    });
}

shifts.findByIdAndUpdate = (details, callback) => {
    Shift.findByIdAndUpdate(details._id, details, (error, shift) => {
        if (error) {
            return callback(error);
        }

        return callback(null, shift);
    });
}

shifts.saveShift = (bodyRequest, callback) => {
    const newShift = new Shift();
    newShift.name = bodyRequest.name;
    newShift.description = bodyRequest.description;
    newShift.start = bodyRequest.start;
    newShift.end = bodyRequest.end;
    newShift.hours_flex = bodyRequest.hours_flex;
    newShift.created_by = bodyRequest.created_by;

    newShift.save((error, shift) => {
        if (error) {
            return callback(error);
        }

        return callback(null, shift);
    });

}

shifts.deleteShift = (id, callback) => {
    Shift.remove({
            _id: id
        },
        (error, data) => {
            if (error) {
                return callback(error);
            }

            return callback(null);
        },
        (error) => {
            if (error) {
                return callback(error);
            }

            return callback(null);
        }
    );
}

module.exports = shifts;
