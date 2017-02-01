(() => {
    "use strict";
    const factories = angular.module("CalendarFactories", ["TimeFactories"]);
    factories.factory("Calendar", ["Time", (Time) => {

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const weekdays = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        function Calendar() {

        }

        Calendar.getMonths = () => {
            return months;
        };

        Calendar.getMonth = () => {
            return new Date().getMonth();
        };

        Calendar.getYear = () => {
            return new Date().getFullYear();
        };

        Calendar.getMonthString = (index) => {
            return months[index];
        };

        Calendar.getWeekdays = () => {
            return weekdays;
        };

        Calendar.getCurrentMonth = () => {
            return new Date().getMonth() + 1;
        };

        Calendar.getDays = (year, month) => {
            return new Date(
                year,
                month,
                0
            ).getDate();
        };

        Calendar.getCurrentDays = () => {
            return new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                0
            ).getDate();
        };

        Calendar.getDay = (year, month, day) => {
            return new Date(year, month, day).getDay();
        };

        Calendar.formatDtr = (data) => {
            for (let i = 1; i <= data.days; i++) {
                 //  {
                //     "duration" : 440,
                //     "late" : 62,
                //     "undertime" : 40,
                //     "original" : {
                //         "arrival" : ISODate("2016-12-12T05:02:00.000Z"),
                //         "departure" : ISODate("2016-12-12T12:22:00.000Z")
                //     }
                // }

                // decrement month by 1 - the Date object month index starts at 0
                var currentDate = new Date(data.year, data.month - 1, i);
                
                if (data.dtr[i]) {
                    console.log(i);
                    
                    var timeFormat = "HH:mm";
                    var utcOffset = "+08:00"
                    var arrival = data.dtr[i].original.arrival ? moment(data.dtr[i].original.arrival).utcOffset(utcOffset) : null;
                    var departure = data.dtr[i].original.departure ? moment(data.dtr[i].original.departure).utcOffset(utcOffset) : null;
                    var duration = data.dtr[i].duration ? moment.duration(data.dtr[i].duration, "minutes") : moment.duration(0);
                    

                    data.dtr[i].day = moment(currentDate).format('D dddd'); // 1 Sunday
                    data.dtr[i].arrival = arrival ? arrival.toDate() : "";
                    data.dtr[i].departure = departure ? departure.toDate() : "";
                    data.dtr[i ].hours = duration.hours();
                    data.dtr[i ].minutes = duration.minutes();

                    console.log(data.dtr[i].arrival);
                    console.log(data.dtr[i].departure);
                    console.log(data.dtr[i].hours);
                    console.log(data.dtr[i].minutes);
                } else {
                    data.dtr[i] = {
                        "day" : moment(currentDate).format('D dddd'), // 1 Sunday
                        "arrival": "",
                        "departure": "",
                        "hours": "",
                        "minutes": "",
                        "leave": "",
                        "quantity": "",
                        "remarks": ""
                    };
                }            
            }

            // for (let i = 1; i <= data.days; i++) {
            //     if (data.dtr[i - 1] !== 'undefined' && (typeof data.dtr[i - 1] !== 'undefined')) {
                   

            //         data.dtr[i - 1].day = i + ' ' + weekdays[new Date(data.year, data.month - 1, i).getDay()];
            //         data.dtr[i - 1].arrival = data.dtr[i - 1].first_in ? Time.toTime(data.dtr[i - 1].first_in) : "";
            //         data.dtr[i - 1].departure = data.dtr[i - 1].last_out ? Time.toTime(data.dtr[i - 1].last_out) : "";
            //         data.dtr[i - 1].hours = data.dtr[i - 1].first_in ? Time.getHours(data.dtr[i - 1].last_out) - Time.getHours(data.dtr[i - 1].first_in) : "";
            //         data.dtr[i - 1].minutes = data.dtr[i - 1].first_in ? Time.getMinutes(data.dtr[i - 1].last_out) - Time.getMinutes(data.dtr[i - 1].first_in) : "";
            //         data.dtr[i - 1].leave = "";
            //         data.dtr[i - 1].quantity = "";
            //         data.dtr[i - 1].remarks = "";
            //     } else {
            //         data.dtr.push({
            //             "day": i + ' ' + weekdays[new Date(data.year, data.month - 1, i).getDay()],
            //             "arrival": "",
            //             "departure": "",
            //             "hours": "",
            //             "minutes": "",
            //             "leave": "",
            //             "quantity": "",
            //             "remarks": ""
            //         });
            //     }
            // }

            return data;
        }

        Calendar.formatApprovedDtr = (data) => {
            for (let i = 1; i <= data.days; i++) {
                if (data.dtr[i - 1] !== undefined && (typeof data.dtr[i - 1] !== undefined)) {
                    data.dtr[i - 1].day = i + ' ' + weekdays[new Date(data.year, data.month - 1, i).getDay()];
                    data.dtr[i - 1].arrival = data.dtr[i - 1].arrival ? Time.toTime(data.dtr[i - 1].arrival) : "";
                    data.dtr[i - 1].departure = data.dtr[i - 1].departure ? Time.toTime(data.dtr[i - 1].departure) : "";
                    data.dtr[i - 1].hours = data.dtr[i - 1].arrival ? Time.getHours(data.dtr[i - 1].departure) - Time.getHours(data.dtr[i - 1].arrival) : "";
                    data.dtr[i - 1].minutes = data.dtr[i - 1].arrival ? Time.getMinutes(data.dtr[i - 1].departure) - Time.getMinutes(data.dtr[i - 1].arrival) : "";
                    data.dtr[i - 1].leave = data.dtr[i - 1].leave;
                    data.dtr[i - 1].quantity = data.dtr[i - 1].quantity;
                    data.dtr[i - 1].remarks = data.dtr[i - 1].remarks;
                }
            }



            return data;
        }


        Calendar.generateEditDtr = (form, data, days, month, year) => {

            let dtrDates = data.dates;

            if (typeof data.changes !== 'undefined' && data.changes !== null) {
                for (let i = 1; i <= days; i++) {
                    if (data.changes[i - 1] !== 'undefined' && (typeof data.changes[i - 1] !== 'undefined')) {
                        form.attributes.data.push({
                            "day": data.changes[i - 1].day,
                            "arrival": data.changes[i - 1].arrival ? Time.toTime(data.changes[i - 1].arrival) : "",
                            "departure": data.changes[i - 1].departure ? Time.toTime(data.changes[i - 1].departure) : "",
                            "hours": data.changes[i - 1].arrival ? Time.getHours(data.changes[i - 1].departure) - Time.getHours(data.changes[i - 1].arrival) : "",
                            "minutes": data.changes[i - 1].arrival ? Time.getMinutes(data.changes[i - 1].departure) - Time.getMinutes(data.changes[i - 1].arrival) : "",
                            "leave": data.changes[i - 1].leave,
                            "quantity": data.changes[i - 1].quantity,
                            "remarks": data.changes[i - 1].remarks

                        });
                    }
                }
            } else {
                for (let i = 1; i <= days; i++) {
                    if (data.dates[i - 1] !== 'undefined' && (typeof data.dates[i - 1] !== 'undefined')) {
                        form.attributes.data.push({
                            "day": i + ' ' + weekdays[new Date(year, month - 1, i).getDay()],
                            "arrival": data[i - 1].first_in,
                            "departure": data[i - 1].last_out,
                            "hours": "",
                            "minutes": "",
                            "leave": "",
                            "quantity": "",
                            "remarks": ""

                        });
                    } else {
                        form.attributes.data.push({
                            "day": i + ' ' + weekdays[new Date(year, month - 1, i).getDay()],
                            "arrival": "",
                            "departure": "",
                            "hours": "",
                            "minutes": "",
                            "leave": "",
                            "quantity": "",
                            "remarks": ""

                        });
                    }
                }
            }

            return form;
        };

        // var date - Date() object. If date is undefined or not type of Date, return the previous month of the current date. 
        // Otherwise, return the previous month of the given date.
        // return the previous month of the given date
        Calendar.getPreviousMonth = (date) => {
            
            if(date instanceof Date){
                date.setMonth(date.getMonth() - 1);
                return date;
            }

            var lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);

            return lastMonth;
        }

        // date - default is new Date()
        // return MMMM yyyy ex January 2017
        Calendar.getMonthYearString = (date) => {
            if(!(date instanceof Date)){
                date = new Date();
            } 
            return Calendar.getMonthString(date.getMonth()) + " " +  date.getFullYear();            
        }

        Calendar.getHoursDisplay = (minutes) => {
            return minutes ? moment.duration(minutes, 'minutes').asHours().toFixed(2) + " hrs": null;
        }

        return Calendar;
    }]);
})();
