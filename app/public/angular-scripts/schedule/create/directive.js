(() => {
    "use strict";
    const directives = angular.module("CreateScheduleDirectives", ["ScheduleFactories"]);

    directives.directive("btnCancelScheduleAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = "/schedule/listing";
                });
            }
        };
    }]);

    directives.directive("btnCreateScheduleAction", ["$window", "Schedule", ($window, Schedule) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    scope.existing = false;

                    Schedule.create(scope.form).then((response) => {
                        if (response.data.success) {
                            $window.location = `/schedule/view/${response.data.result._id}`;
                        } else {
                            scope.existing = true;
                            scope.message = response.data.result;
                        }
                    });

                    scope.$apply();
                });
            }
        };
    }]);

    directives.directive("btnAddMonthCalendarAction", () => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    let data = [];
                    let current;

                    if (scope.dates.nextMonth == 1) {
                        current = new Date(scope.dates.nextYear, 0, 1);
                    } else {
                        current = new Date(scope.dates.nextYear, scope.dates.nextMonth, 0);
                    }

                    let year = current.getFullYear();
                    let month = current.getMonth() + 1;
                    let days = new Date(year, month, 0).getDate();

                    if (month == 12) {
                        scope.dates.nextMonth = 1;
                        scope.dates.nextYear = year + 1;
                        scope.dates.previousMonth = 12;
                        scope.dates.previousYear = year;
                    } else {
                        scope.dates.nextMonth = month + 1;
                        scope.dates.nextYear = year;
                        scope.dates.previousMonth = month;
                        scope.dates.previousYear = year;
                    }

                    let monthDay = "";
                    if (month == 1) {
                        monthDay = 0;
                    } else {
                        monthDay = month - 1;
                    }

                    for (let i = 1; i <= days; i++) {
                        data.push({
                            "label": scope.weekday[new Date(year, monthDay, i).getDay()],
                            "start": "",
                            "end": "",
                            "hours_flex": "",
                            "shift": "",
                            "non_workday": "",
                            "date_num": i

                        });
                    }

                    scope.monthly.push({
                        "month": month,
                        "year": year,
                        "dates": data
                    });

                    scope.form.attributes.data = scope.monthly;

                    if (scope.form.exclude_weekends) {
                        scope.monthly.forEach((day, ind) => {
                            day.dates.forEach((dates, index) => {
                                if (dates.label === 'Sunday' || dates.label === 'Saturday') {
                                    scope.monthly[ind].dates[index].non_workday = true;
                                    scope.monthly[ind].dates[index].shift = null;
                                }

                            });
                        });
                    }
                });
            }
        };
    });

    directives.directive("btnRemoveMonthCalendarAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    scope.monthly.pop();

                    if (scope.dates.previousMonth == 1) {
                        scope.dates.previousMonth = 12;
                        scope.dates.previousYear = scope.dates.previousYear - 1;
                        scope.dates.nextMonth = 1;
                        scope.dates.nextYear = scope.dates.previousYear + 1;
                    } else {
                        scope.dates.previousMonth = scope.dates.previousMonth - 1;
                        scope.dates.previousYear = scope.dates.previousYear;
                        scope.dates.nextMonth = scope.dates.previousMonth + 1;
                        scope.dates.nextYear = scope.dates.previousYear;
                    }
                    scope.$apply();
                });
            }
        };
    }]);
})();
