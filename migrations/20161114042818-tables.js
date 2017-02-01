'use strict';

var dbm;
var type;
var seed;
var ObjectId = require('mongodb').ObjectID;
/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
};

exports.up = function(db, callback) {
    db.createCollection('schedules', {
        name: {
            type: 'string',
            unique: true,
            required: true
        },
        description: 'string',
        type: 'string',
        attributes: [],
        created_by: 'number',
        exclude_weekends: 'boolean'
    }, callback());

    db.createCollection('shifts', {
        name: {
            type: 'string',
            unique: true,
            required: true
        },
        description: 'string',
        start: 'string',
        end: 'string',
        hours_flex: 'number',
        created_by: 'string'
    }, callback());

    db.createCollection('dtrs', {
        user_id: 'string',
        username: 'string',
        year: 'string',
        month: 'number',
        dates: []
    }, callback());

    db.createCollection('employees', {
        employee_id: 'string',
        username: 'string',
        workday_id: 'string',
        first_name: 'string',
        middle_name: 'string',
        last_name: 'string',
        position: 'string',
        department: 'string',
        line_manager: 'string',
        lm_workday_id: 'string',
        lm_username: 'string',
        shift: 'string',
        timezone: string,
        schedule: [] 

    }, callback());

    db.createCollection('approved_dtrs', {
        dtr_id: 'string',
        user_id: 'string',
        username: 'string',
        manager_username: 'string',
        submitted_date: 'string',
        returned_date: 'string',
        remarks: 'string',
        year: 'string',
        month: 'string',
        total_work_hours: 'string',
        overtime_weekdays: 'string',
        overtime_weekends: 'string',
        regular_holiday: 'string',
        special_holiday: 'string',
        night_differentials: 'string',
        lwop_hours: 'string',
        tardiness_hours: 'string',
        dates: []
    }, callback());
};

exports.down = function(db, callback) {
    db.dropCollection('migrations');
    db.dropCollection('schedules');
    db.dropCollection('shifts');
    db.dropCollection('dtrs');
    db.dropCollection('employees');
    db.dropCollection('approved_dtrs');
    callback();
};

exports._meta = {
    "version": 1
};
