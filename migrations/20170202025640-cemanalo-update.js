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
  //remove duplicate user
  db._run("remove", "employees", {'username' : 'cemanalo'});
  
  //add summary details
  db._run("update", "editable_dtrs", {
  	query : {
  		"workday_id" : "40001607",
  		"month" : "12",
  		"year" : "2016"
  	},
  	update : {
		    "month" : "12",
		    "workday_id" : "40001607",
		    "year" : "2016",
		    "__v" : 0,
		    "entries" : [ 
		        new Date("2016-12-12T05:02:37.000Z"), 
		        new Date("2016-12-12T05:04:24.000Z"), 
		        new Date("2016-12-12T07:11:55.000Z"), 
		        new Date("2016-12-12T07:34:07.000Z"), 
		        new Date("2016-12-12T09:01:42.000Z"), 
		        new Date("2016-12-12T10:04:04.000Z"), 
		        new Date("2016-12-12T10:05:26.000Z"), 
		        new Date("2016-12-12T10:08:34.000Z"), 
		        new Date("2016-12-12T10:22:24.000Z"), 
		        new Date("2016-12-12T10:23:32.000Z"), 
		        new Date("2016-12-12T12:19:53.000Z"), 
		        new Date("2016-12-12T12:20:57.000Z"), 
		        new Date("2016-12-12T12:22:18.000Z"), 
		        new Date("2016-12-13T04:31:57.000Z"), 
		        new Date("2016-12-13T12:50:11.000Z"), 
		        new Date("2016-12-13T17:26:23.000Z"), 
		        new Date("2016-12-13T17:39:09.000Z"), 
		        new Date("2016-12-13T17:47:27.000Z"), 
		        new Date("2016-12-13T17:50:20.000Z"), 
		        new Date("2016-12-16T06:03:02.000Z"), 
		        new Date("2016-12-16T06:08:22.000Z"), 
		        new Date("2016-12-16T06:39:28.000Z"), 
		        new Date("2016-12-16T08:52:07.000Z"), 
		        new Date("2016-12-16T11:19:45.000Z"), 
		        new Date("2016-12-16T12:13:22.000Z"), 
		        new Date("2016-12-16T12:30:55.000Z"), 
		        new Date("2016-12-17T03:45:26.000Z"), 
		        new Date("2016-12-17T09:28:02.000Z"), 
		        new Date("2016-12-17T17:23:27.000Z"), 
		        new Date("2016-12-17T17:24:44.000Z"), 
		        new Date("2016-12-18T03:19:46.000Z"), 
		        new Date("2016-12-18T05:35:26.000Z"), 
		        new Date("2016-12-18T06:34:48.000Z"), 
		        new Date("2016-12-18T06:35:56.000Z"), 
		        new Date("2016-12-18T02:30:00.000Z"), 
		        new Date("2016-12-18T10:00:00.000Z"), 
		        new Date("2016-12-19T02:30:00.000Z"), 
		        new Date("2016-12-19T10:00:00.000Z")
		    ],
		    "username" : "cemanalo",
		    "total_undertime" : 1165,
		    "total_late" : 216,
		    "convertedDates" : [ 
		        null, 
		        null, 
		        null, 
		        null, 
		        null, 
		        null, 
		        null, 
		        null, 
		        null, 
		        null, 
		        null, 
		        null, 
		        {
		            "duration" : 440,
		            "late" : 62,
		            "undertime" : 40,
		            "original" : {
		                "arrival" : new Date("2016-12-12T05:02:00.000Z"),
		                "departure" : new Date("2016-12-12T12:22:00.000Z")
		            }
		        }, 
		        {
		            "duration" : 499,
		            "late" : 31,
		            "undertime" : 0,
		            "original" : {
		                "arrival" : new Date("2016-12-13T04:31:00.000Z"),
		                "departure" : new Date("2016-12-13T12:50:00.000Z")
		            }
		        }, 
		        {
		            "duration" : 24,
		            "late" : 0,
		            "undertime" : 970,
		            "original" : {
		                "arrival" : new Date("2016-12-13T17:26:00.000Z"),
		                "departure" : new Date("2016-12-13T17:50:00.000Z")
		            }
		        }, 
		        null, 
		        {
		            "duration" : 387,
		            "late" : 123,
		            "undertime" : 93,
		            "original" : {
		                "arrival" : new Date("2016-12-16T06:03:00.000Z"),
		                "departure" : new Date("2016-12-16T12:30:00.000Z")
		            }
		        }, 
		        {
		            "duration" : 343,
		            "late" : 0,
		            "undertime" : 32,
		            "original" : {
		                "arrival" : new Date("2016-12-17T03:45:00.000Z"),
		                "departure" : new Date("2016-12-17T09:28:00.000Z")
		            }
		        }, 
		        {
		            "duration" : 997,
		            "late" : 0,
		            "undertime" : 0,
		            "original" : {
		                "arrival" : new Date("2016-12-17T17:23:00.000Z"),
		                "departure" : new Date("2016-12-18T10:00:00.000Z")
		            }
		        }, 
		        {
		            "duration" : 450,
		            "late" : 0,
		            "undertime" : 30,
		            "original" : {
		                "arrival" : new Date("2016-12-19T02:30:00.000Z"),
		                "departure" : new Date("2016-12-19T10:00:00.000Z")
		            }
		        }
		    ],
		    "lm_workday_id" : "40001525",
		    "line_manager" : "Jose Enrique Bulatao",
		    "position" : "Software Engineer",
		    "last_name" : "Manalo",
		    "middle_name" : "T",
		    "first_name" : "Carlo Eugene",
		    "undertime_count" : 5,
		    "late_count" : 3,
		    "total_work_hours" : 3140
		}
  });

 //dtr 2017-1
 db.insert("editable_dtrs", 
			 	{
				    
				    "month" : "1",
				    "workday_id" : "40001607",
				    "year" : "2017",
				    "__v" : 0,
				    "entries" : [ 
				        new Date("2017-01-16T06:38:47.000Z"), 
				        new Date("2017-01-16T06:39:54.000Z"), 
				        new Date("2017-01-16T11:52:18.000Z"), 
				        new Date("2017-01-18T11:10:47.000Z"), 
				        new Date("2017-01-26T02:02:41.000Z"), 
				        new Date("2017-01-26T05:07:04.000Z"), 
				        new Date("2017-01-27T12:14:20.000Z"), 
				        new Date("2017-01-31T09:14:44.000Z"), 
				        new Date("2017-02-01T04:18:20.000Z"), 
				        new Date("2017-02-01T13:12:59.000Z"), 
				        new Date("2017-02-01T13:56:24.000Z"), 
				        new Date("2017-02-01T14:10:22.000Z")
				    ],
				    "username" : "cemanalo",
				    "undertime_count" : 5,
				    "late_count" : 5,
				    "total_work_hours" : 1091,
				    "total_undertime" : 1465,
				    "total_late" : 1414,
				    "convertedDates" : [ 
				        null, 
				        {
				            "duration" : 592,
				            "late" : 18,
				            "undertime" : 0,
				            "original" : {
				                "arrival" : new Date("2017-02-01T04:18:00.000Z"),
				                "departure" : new Date("2017-02-01T14:10:00.000Z")
				            }
				        }, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        {
				            "duration" : 314,
				            "late" : 158,
				            "undertime" : 166,
				            "original" : {
				                "arrival" : new Date("2017-01-16T06:38:00.000Z"),
				                "departure" : new Date("2017-01-16T11:52:00.000Z")
				            }
				        }, 
				        null, 
				        {
				            "duration" : 0,
				            "late" : 430,
				            "undertime" : 480,
				            "original" : {
				                "arrival" : new Date("2017-01-18T11:10:00.000Z"),
				                "departure" : new Date("2017-01-18T11:10:00.000Z")
				            }
				        }, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        null, 
				        {
				            "duration" : 185,
				            "late" : 0,
				            "undertime" : 293,
				            "original" : {
				                "arrival" : new Date("2017-01-26T02:02:00.000Z"),
				                "departure" : new Date("2017-01-26T05:07:00.000Z")
				            }
				        }, 
				        {
				            "duration" : 0,
				            "late" : 494,
				            "undertime" : 480,
				            "original" : {
				                "arrival" : new Date("2017-01-27T12:14:00.000Z"),
				                "departure" : new Date("2017-01-27T12:14:00.000Z")
				            }
				        }, 
				        null, 
				        null, 
				        null, 
				        {
				            "duration" : 0,
				            "late" : 314,
				            "undertime" : 46,
				            "original" : {
				                "arrival" : new Date("2017-01-31T09:14:00.000Z"),
				                "departure" : new Date("2017-01-31T09:14:00.000Z")
				            }
				        }
				    ],
				    "lm_workday_id" : "40001525",
				    "line_manager" : "Jose Enrique Bulatao",
				    "position" : "Software Engineer",
				    "last_name" : "Manalo",
				    "middle_name" : "T",
				    "first_name" : "Carlo Eugene"
				}
 	);
  return callback();
};

exports.down = function(db,callback) {
  db.insert('employees', 
  	{
	   "employee_id":"221",
	   "username":"cemanalo",
	   "workday_id":"40001607",
	   "first_name":"Carlo Eugene",
	   "middle_name":"T",
	   "last_name":"Manalo",
	   "position":"Software Engineer",
	   "department":"Manila",
	   "line_manager":"Jose Enrique Bulatao",
	   "lm_workday_id":"40001525",
	   "lm_username":"jbulatao",
	   "shift":"588b6561572f7122ecfafd6c",
	   "usertype":"E",
	   "schedule":[
	      {
	         "sched":"586f0c9b209ec02b9460e180"
	      }
	   ]
	});
  return callback();
};

exports._meta = {
  "version": 1
};
