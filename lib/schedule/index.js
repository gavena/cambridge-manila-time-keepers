const persistenceProvider = require('../../persistence/provider');
const Schedule = persistenceProvider.Schedule;
const schedules = {};

schedules.all = (callback) => {
    Schedule.find({}, (error, schedules) => {
        if (error) {
            return callback(error);
        }

        return callback(null, schedules);
    });
}

schedules.deleteSchedule = (id, callback) => {
    Schedule.remove({
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

schedules.findByIdAndUpdate = (details, callback) => {
    Schedule.findByIdAndUpdate(details._id, details, (error, schedule) => {
        if (error) {
            return callback(error);
        }

        return callback(null, schedule);
    });
}

schedules.saveSchedule = (bodyRequest, callback) => {
    const newSchedule = new Schedule();
    newSchedule.name = bodyRequest.name;
    newSchedule.description = bodyRequest.description;
    newSchedule.attributes = bodyRequest.attributes.data;
    newSchedule.created_by = bodyRequest.created_by;
    newSchedule.type = bodyRequest.type;
    newSchedule.exclude_weekends = bodyRequest.exclude_weekends;

    newSchedule.save((error, schedule) => {
        if (error) {
            return callback(error);
        }

        return callback(null, schedule);
    });
}

schedules.getById = (id, callback) => {
    Schedule.find({
        _id: id
    }, (error, schedule) => {
        if (error) {
            return callback(error);
        }

        return callback(null, schedule);
    });
}

module.exports = schedules;
