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
  /*  db.insert('employees', {
        "_id": ObjectId("582a82c7d1fc5418f8357f30"),
        'username': 'gavena',
        'first_name': 'Godofredo',
        'middle_name': '',
        'last_name': 'Avena',
        'position': 'Manager',
        'department': 'Academic Development',
        'line_manager': 'Nik Louch'
    });

    db.insert('employees', {
        "_id": ObjectId("582a82c7d1fc5418f8357f31"),
        'username': 'jgalang',
        'first_name': 'Jesus',
        'middle_name': '',
        'last_name': 'Galang',
        'position': 'Team Lead',
        'department': 'Academic Development',
        'line_manager': 'Godofredo Avena'
    });

    db.insert('employees', {
        "_id": ObjectId("582a82c7d1fc5418f8357f32"),
        'username': 'jfrigillana',
        'first_name': 'Ma. Jamaica',
        'middle_name': '',
        'last_name': 'Frigillana',
        'position': 'Software Engineer',
        'department': 'Academic Development',
        'line_manager': 'Jesus Galang'
    });

    db.insert('employees', {
        "_id": ObjectId("582a82c7d1fc5418f8357f33"),
        'username': 'ncastro',
        'first_name': 'Niel Allen',
        'middle_name': '',
        'last_name': 'Castro',
        'position': 'Software Engineer',
        'department': 'Academic Development',
        'line_manager': 'Jesus Galang'
    });

    db.insert('employees', {
        "_id": ObjectId("582a82c7d1fc5418f8357f34"),
        'username': 'atiangco',
        'first_name': 'Andrew Charles',
        'middle_name': '',
        'last_name': 'Tiangco',
        'position': 'Software Engineer',
        'department': 'Academic Development',
        'line_manager': 'Jesus Galang'
    });

    db.insert('employees', {
        "_id": ObjectId("582a82c7d1fc5418f8357f35"),
        'username': 'sencina',
        'first_name': 'Sherwin',
        'middle_name': '',
        'last_name': 'Encina',
        'position': 'Senior Software Engineer',
        'department': 'Academic Development',
        'line_manager': 'Jesus Galang'
    });


  db.insert('employees', {"employee_id": "104",
  "username": "adestura",
  "workday_id": "40001552",
  "first_name": "Analyn",
  "middle_name": "T",
  "last_name": "Destura",
  "position": "Junior Digital Content Controller",
  "department": "Manila",
  "line_manager": "Christian Montas",
  "lm_workday_id": "40001618",
  "lm_username": "cmontas",
  "shift": "default",
  "timezone": "",
  "schedule": {}
});
*/

    db.insert('shifts', {
        "_id": ObjectId("586f0dbd3bb4f424f054b682"),
        "created_by": "",
        "hours_flex": 2,
        "end": "1970-01-01T10:00:00.000Z",
        "start": "1970-01-01T02:00:00.000Z",
        "description": "Test",
        "name": "Test"
    });

    db.insert('schedules', {
        "_id": ObjectId("586f0c27209ec02b9460e17f"),
        "exclude_weekends": false,
        "type": "Weekly",
        "created_by": "",
        "description": "Test",
        "name": "Test",
        "attributes": [{
            "non_workday": false,
            "shift": "",
            "hours_flex": "",
            "end": "1969-12-31T16:32:00.000Z",
            "start": "1969-12-31T17:21:00.000Z",
            "label": "Sunday"
        }, {
            "non_workday": false,
            "shift": "",
            "hours_flex": "",
            "end": "1970-01-01T04:31:00.000Z",
            "start": "1970-01-01T04:31:00.000Z",
            "label": "Monday"
        }, {
            "non_workday": false,
            "shift": "",
            "hours_flex": "",
            "end": "1969-12-31T16:31:00.000Z",
            "start": "1969-12-31T18:13:00.000Z",
            "label": "Tuesday"
        }, {
            "non_workday": false,
            "shift": "",
            "hours_flex": "",
            "end": "1969-12-31T16:31:00.000Z",
            "start": "1969-12-31T16:34:00.000Z",
            "label": "Wednesday"
        }, {
            "non_workday": false,
            "shift": "",
            "hours_flex": "",
            "end": "1969-12-31T16:31:00.000Z",
            "start": "1969-12-31T16:31:00.000Z",
            "label": "Thursday"
        }, {
            "non_workday": false,
            "shift": "",
            "hours_flex": "",
            "end": "1969-12-31T18:13:00.000Z",
            "start": "1969-12-31T16:34:00.000Z",
            "label": "Friday"
        }, {
            "non_workday": false,
            "shift": "",
            "hours_flex": "",
            "end": "1969-12-31T16:31:00.000Z",
            "start": "1969-12-31T16:34:00.000Z",
            "label": "Saturday"
        }]
    });

    db.insert('schedules', {
        "_id": ObjectId("586f0c9b209ec02b9460e180"),
        "exclude_weekends": true,
        "type": "Monthly",
        "created_by": "",
        "description": "test",
        "name": "test monthly",
        "attributes": [{
            "dates": [{
                "date_num": 1,
                "non_workday": true,
                "shift": null,
                "hours_flex": "",
                "end": "",
                "start": "",
                "label": "Sunday"
            }, {
                "date_num": 2,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:34:00.000Z",
                "start": "1969-12-31T16:34:00.000Z",
                "label": "Monday"
            }, {
                "date_num": 3,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:43:00.000Z",
                "start": "1969-12-31T16:43:00.000Z",
                "label": "Tuesday"
            }, {
                "date_num": 4,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:41:00.000Z",
                "start": "1969-12-31T16:34:00.000Z",
                "label": "Wednesday"
            }, {
                "date_num": 5,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:41:00.000Z",
                "start": "1970-01-01T04:34:00.000Z",
                "label": "Thursday"
            }, {
                "date_num": 6,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T18:32:00.000Z",
                "start": "1969-12-31T16:43:00.000Z",
                "label": "Friday"
            }, {
                "date_num": 7,
                "non_workday": true,
                "shift": null,
                "hours_flex": "",
                "end": "",
                "start": "",
                "label": "Saturday"
            }, {
                "date_num": 8,
                "non_workday": true,
                "shift": null,
                "hours_flex": "",
                "end": "",
                "start": "",
                "label": "Sunday"
            }, {
                "date_num": 9,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:34:00.000Z",
                "start": "1969-12-31T16:34:00.000Z",
                "label": "Monday"
            }, {
                "date_num": 10,
                "non_workday": "",
                "shift": "",
                "hours_flex": 1,
                "end": "1969-12-31T16:34:00.000Z",
                "start": "1969-12-31T18:23:00.000Z",
                "label": "Tuesday"
            }, {
                "date_num": 11,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1970-01-01T05:43:00.000Z",
                "start": "1969-12-31T16:43:00.000Z",
                "label": "Wednesday"
            }, {
                "date_num": 12,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1970-01-01T05:42:00.000Z",
                "start": "1969-12-31T17:44:00.000Z",
                "label": "Thursday"
            }, {
                "date_num": 13,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T17:41:00.000Z",
                "start": "1969-12-31T17:44:00.000Z",
                "label": "Friday"
            }, {
                "date_num": 14,
                "non_workday": true,
                "shift": null,
                "hours_flex": "",
                "end": "",
                "start": "",
                "label": "Saturday"
            }, {
                "date_num": 15,
                "non_workday": true,
                "shift": null,
                "hours_flex": "",
                "end": "",
                "start": "",
                "label": "Sunday"
            }, {
                "date_num": 16,
                "non_workday": "",
                "shift": "",
                "hours_flex": 1,
                "end": "1969-12-31T16:34:00.000Z",
                "start": "1969-12-31T16:42:00.000Z",
                "label": "Monday"
            }, {
                "date_num": 17,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:34:00.000Z",
                "start": "1969-12-31T18:14:00.000Z",
                "label": "Tuesday"
            }, {
                "date_num": 18,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:34:00.000Z",
                "start": "1969-12-31T16:34:00.000Z",
                "label": "Wednesday"
            }, {
                "date_num": 19,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:34:00.000Z",
                "start": "1969-12-31T16:34:00.000Z",
                "label": "Thursday"
            }, {
                "date_num": 20,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:34:00.000Z",
                "start": "1970-01-01T04:42:00.000Z",
                "label": "Friday"
            }, {
                "date_num": 21,
                "non_workday": true,
                "shift": null,
                "hours_flex": "",
                "end": "",
                "start": "",
                "label": "Saturday"
            }, {
                "date_num": 22,
                "non_workday": true,
                "shift": null,
                "hours_flex": "",
                "end": "",
                "start": "",
                "label": "Sunday"
            }, {
                "date_num": 23,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T17:41:00.000Z",
                "start": "1969-12-31T16:34:00.000Z",
                "label": "Monday"
            }, {
                "date_num": 24,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:42:00.000Z",
                "start": "1969-12-31T16:34:00.000Z",
                "label": "Tuesday"
            }, {
                "date_num": 25,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1970-01-01T05:42:00.000Z",
                "start": "1969-12-31T18:14:00.000Z",
                "label": "Wednesday"
            }, {
                "date_num": 26,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:42:00.000Z",
                "start": "1969-12-31T16:34:00.000Z",
                "label": "Thursday"
            }, {
                "date_num": 27,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:34:00.000Z",
                "start": "1969-12-31T16:34:00.000Z",
                "label": "Friday"
            }, {
                "date_num": 28,
                "non_workday": true,
                "shift": null,
                "hours_flex": "",
                "end": "",
                "start": "",
                "label": "Saturday"
            }, {
                "date_num": 29,
                "non_workday": true,
                "shift": null,
                "hours_flex": "",
                "end": "",
                "start": "",
                "label": "Sunday"
            }, {
                "date_num": 30,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1969-12-31T16:34:00.000Z",
                "start": "1969-12-31T18:14:00.000Z",
                "label": "Monday"
            }, {
                "date_num": 31,
                "non_workday": "",
                "shift": "",
                "hours_flex": "",
                "end": "1970-01-01T04:34:00.000Z",
                "start": "1969-12-31T18:32:00.000Z",
                "label": "Tuesday"
            }],
            "year": 2017,
            "month": 1
        }]
    });

    db.insert('dtrs', {
        "_id": ObjectId("582a82c7d1fc5418f8357f36"),
        'dtr_original_converted_id': 'doc00000000002',
        'user_id': '044112',
        'username': 'jgalang',
        'year': '2017',
        'month': '1',
        'dates': [{
            'date_num': 1,
            'first_in': '11:19:37',
            'last_out': '11:49:16'
        }, {
            'date_num': 2,
            'first_in': '11:29:16',
            'last_out': '11:30:46'
        }, {
            'date_num': 3,
            'first_in': '',
            'last_out': ''
        }, {
            'date_num': 4,
            'first_in': '11:19:37',
            'last_out': '11:49:16'
        }, {
            'date_num': 5,
            'first_in': '11:29:16',
            'last_out': ''
        }, {
            'date_num': 6,
            'first_in': '11:29:16',
            'last_out': '11:29:46'
        }, {
            'date_num': 7,
            'first_in': '11:19:37',
            'last_out': '11:49:16'
        }, {
            'date_num': 8,
            'first_in': '11:29:16',
            'last_out': '11:30:46'
        }, {
            'date_num': 9,
            'first_in': '',
            'last_out': ''
        }, {
            'date_num': 10,
            'first_in': '11:19:37',
            'last_out': '11:49:16'
        }, {
            'date_num': 11,
            'first_in': '11:29:16',
            'last_out': ''
        }, {
            'date_num': 12,
            'first_in': '11:29:16',
            'last_out': '11:29:46'
        }, {
            'date_num': 13,
            'first_in': '11:19:37',
            'last_out': '11:49:16'
        }, {
            'date_num': 14,
            'first_in': '11:29:16',
            'last_out': '11:30:46'
        }, {
            'date_num': 15,
            'first_in': '',
            'last_out': ''
        }, {
            'date_num': 16,
            'first_in': '11:19:37',
            'last_out': '11:49:16'
        }, {
            'date_num': 17,
            'first_in': '11:29:16',
            'last_out': ''
        }, {
            'date_num': 18,
            'first_in': '11:29:16',
            'last_out': '19:29:46'
        }, {
            'date_num': 19,
            'first_in': '11:19:37',
            'last_out': '18:49:16'
        }, {
            'date_num': 20,
            'first_in': '11:29:16',
            'last_out': '23:30:46'
        }, {
            'date_num': 21,
            'first_in': '',
            'last_out': ''
        }, {
            'date_num': 22,
            'first_in': '11:19:37',
            'last_out': '20:49:16'
        }, {
            'date_num': 23,
            'first_in': '11:29:16',
            'last_out': ''
        }, {
            'date_num': 24,
            'first_in': '11:29:16',
            'last_out': '22:29:46'
        }, {
            'date_num': 25,
            'first_in': '11:19:37',
            'last_out': '18:49:16'
        }, {
            'date_num': 26,
            'first_in': '11:29:16',
            'last_out': '23:30:46'
        }, {
            'date_num': 27,
            'first_in': '',
            'last_out': ''
        }, {
            'date_num': 28,
            'first_in': '11:19:37',
            'last_out': '20:49:16'
        }, {
            'date_num': 29,
            'first_in': '11:29:16',
            'last_out': ''
        }, {
            'date_num': 30,
            'first_in': '11:29:16',
            'last_out': '22:29:46'
        }]
    });

    db.insert('approved_dtrs', {
        "_id": ObjectId("5809d48ece0c96790111423c"),
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
        "year": "2017",
        "month": "1",
        "total_work_hours": "168.00",
        "overtime_weekdays": "0.00",
        "overtime_weekends": "1.30",
        "regular_holiday": "8.00",
        "special_holiday": "8.00",
        "night_differentials": "0.00",
        "lwop_hours": "8.00",
        "tardiness_hours": "0.30",
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

	callback();
};

exports.down = function(db, callback) {
	callback();
};

exports._meta = {
    'version': 1
};
