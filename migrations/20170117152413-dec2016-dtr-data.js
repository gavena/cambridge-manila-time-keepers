'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
      db.insert('editable_dtrs', {
        
        "dtr_original_converted_id": "doc00000000002",
        "user_id": "044112",
        "username": "jgalang",
        "manager_user_id": "022233",
        "manager_username": "gavena",
        "is_certified": "true",
        "status": "SUBMITTED",
        "submitted_date": "2016-11-29T05:56:20.315Z",
        "returned_date": "2016-12-13T06:23:57.723Z",
        "remarks": "",
        "approved_date": "2016-12-13T06:13:35.477Z",
        "year": "2016",
        "month": "12",
        "changes": [{
            "remarks": "",
            "quantity": 1,
            "leave": "Emergency",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "1 Tuesday"
        }, {
            "remarks": "",
            "quantity": 1,
            "leave": "Official Travel",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "2 Wednesday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": 0,
            "hours": 13,
            "departure": "1970-01-01T15:00:00.000Z",
            "arrival": "1970-01-01T02:00:00.000Z",
            "day": "3 Thursday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": 0,
            "hours": 10,
            "departure": "1970-01-01T10:30:00.000Z",
            "arrival": "1970-01-01T00:30:00.000Z",
            "day": "4 Friday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "5 Saturday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "6 Sunday"
        }, {
            "remarks": "Late for 5 minutes",
            "quantity": "",
            "leave": "",
            "minutes": 0,
            "hours": 15,
            "departure": "1970-01-01T13:30:00.000Z",
            "arrival": "1969-12-31T22:30:00.000Z",
            "day": "7 Monday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": 0,
            "hours": -2,
            "departure": "1969-12-31T22:45:00.000Z",
            "arrival": "1970-01-01T00:45:00.000Z",
            "day": "8 Tuesday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": 35,
            "hours": 8,
            "departure": "1970-01-01T10:36:00.000Z",
            "arrival": "1970-01-01T02:01:00.000Z",
            "day": "9 Wednesday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": 0,
            "hours": 8,
            "departure": "1970-01-01T12:00:00.000Z",
            "arrival": "1970-01-01T04:00:00.000Z",
            "day": "10 Thursday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": 10,
            "hours": 12,
            "departure": "1970-01-01T10:30:00.000Z",
            "arrival": "1969-12-31T22:20:00.000Z",
            "day": "11 Friday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "12 Saturday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "13 Sunday"
        }, {
            "remarks": "",
            "quantity": 1,
            "leave": "Philippines Sick",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "14 Monday"
        }, {
            "remarks": "",
            "quantity": 0.5,
            "leave": "Philippines Sick",
            "minutes": 0,
            "hours": 6,
            "departure": "1970-01-01T11:30:00.000Z",
            "arrival": "1970-01-01T05:30:00.000Z",
            "day": "15 Tuesday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": 0,
            "hours": 9,
            "departure": "1970-01-01T10:30:00.000Z",
            "arrival": "1970-01-01T01:30:00.000Z",
            "day": "16 Wednesday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": 30,
            "hours": 8,
            "departure": "1970-01-01T10:30:00.000Z",
            "arrival": "1970-01-01T02:00:00.000Z",
            "day": "17 Thursday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": -30,
            "hours": 9,
            "departure": "1970-01-01T10:00:00.000Z",
            "arrival": "1970-01-01T01:30:00.000Z",
            "day": "18 Friday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "19 Saturday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "20 Sunday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": 25,
            "hours": 8,
            "departure": "1970-01-01T10:25:00.000Z",
            "arrival": "1970-01-01T02:00:00.000Z",
            "day": "21 Monday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": -45,
            "hours": 9,
            "departure": "1970-01-01T10:00:00.000Z",
            "arrival": "1970-01-01T01:45:00.000Z",
            "day": "22 Tuesday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": -30,
            "hours": 11,
            "departure": "1970-01-01T10:00:00.000Z",
            "arrival": "1969-12-31T23:30:00.000Z",
            "day": "23 Wednesday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": -59,
            "hours": 11,
            "departure": "1970-01-01T10:00:00.000Z",
            "arrival": "1969-12-31T23:59:00.000Z",
            "day": "24 Thursday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": 4,
            "hours": 8,
            "departure": "1970-01-01T10:05:00.000Z",
            "arrival": "1970-01-01T02:01:00.000Z",
            "day": "25 Friday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "26 Saturday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "27 Sunday"
        }, {
            "remarks": "",
            "quantity": 1,
            "leave": "Philippines Annual",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "28 Monday"
        }, {
            "remarks": "",
            "quantity": "",
            "leave": "",
            "minutes": 0,
            "hours": 10,
            "departure": "1970-01-01T12:00:00.000Z",
            "arrival": "1970-01-01T02:00:00.000Z",
            "day": "29 Tuesday"
        }, {
            "remarks": "",
            "quantity": 1,
            "leave": "Holiday",
            "minutes": "",
            "hours": "",
            "departure": "",
            "arrival": "",
            "day": "30 Wednesday"
        }],
        "dates": [{
            "last_out": "11:49:16",
            "first_in": "11:19:37",
            "date_num": 1
        }, {
            "last_out": "11:30:46",
            "first_in": "11:29:16",
            "date_num": 2
        }, {
            "last_out": "",
            "first_in": "",
            "date_num": 3
        }, {
            "last_out": "11:49:16",
            "first_in": "11:19:37",
            "date_num": 4
        }, {
            "last_out": "",
            "first_in": "11:29:16",
            "date_num": 5
        }, {
            "last_out": "11:29:46",
            "first_in": "11:29:16",
            "date_num": 6
        }, {
            "last_out": "11:49:16",
            "first_in": "11:19:37",
            "date_num": 7
        }, {
            "last_out": "11:30:46",
            "first_in": "11:29:16",
            "date_num": 8
        }, {
            "last_out": "",
            "first_in": "",
            "date_num": 9
        }, {
            "last_out": "11:49:16",
            "first_in": "11:19:37",
            "date_num": 10
        }, {
            "last_out": "",
            "first_in": "11:29:16",
            "date_num": 11
        }, {
            "last_out": "11:29:46",
            "first_in": "11:29:16",
            "date_num": 12
        }, {
            "last_out": "11:49:16",
            "first_in": "11:19:37",
            "date_num": 13
        }, {
            "last_out": "11:30:46",
            "first_in": "11:29:16",
            "date_num": 14
        }, {
            "last_out": "",
            "first_in": "",
            "date_num": 15
        }, {
            "last_out": "11:49:16",
            "first_in": "11:19:37",
            "date_num": 16
        }, {
            "last_out": "",
            "first_in": "11:29:16",
            "date_num": 17
        }, {
            "last_out": "19:29:46",
            "first_in": "11:29:16",
            "date_num": 18
        }, {
            "last_out": "18:49:16",
            "first_in": "11:19:37",
            "date_num": 19
        }, {
            "last_out": "23:30:46",
            "first_in": "11:29:16",
            "date_num": 20
        }, {
            "last_out": "",
            "first_in": "",
            "date_num": 21
        }, {
            "last_out": "20:49:16",
            "first_in": "11:19:37",
            "date_num": 22
        }, {
            "last_out": "",
            "first_in": "11:29:16",
            "date_num": 23
        }, {
            "last_out": "22:29:46",
            "first_in": "11:29:16",
            "date_num": 24
        }, {
            "last_out": "18:49:16",
            "first_in": "11:19:37",
            "date_num": 25
        }, {
            "last_out": "23:30:46",
            "first_in": "11:29:16",
            "date_num": 26
        }, {
            "last_out": "",
            "first_in": "",
            "date_num": 27
        }, {
            "last_out": "20:49:16",
            "first_in": "11:19:37",
            "date_num": 28
        }, {
            "last_out": "",
            "first_in": "11:29:16",
            "date_num": 29
        }, {
            "last_out": "22:29:46",
            "first_in": "11:29:16",
            "date_num": 30
        }]
    });

	callback()
};

exports.down = function(db, callback) {
  callback();
};

exports._meta = {
  "version": 1
};
