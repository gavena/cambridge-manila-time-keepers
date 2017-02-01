(() => {
    "use strict";
    const controllers = angular.module("CreateScheduleControllers", ["CalendarFactories", "ShiftFactories", "ScheduleFactories"]);

    controllers.controller("CreateScheduleController", [
        "$scope",
        "$mdDialog",
        "Calendar",
        "Shift",
        "Schedule",
        ($scope, $mdDialog, Calendar, Shift, Schedule) => {
            $scope.existing = false;
            $scope.isShiftsEmpty = false;
            $scope.editModule = false;

            $scope.monthly = [];
            $scope.months = [];
            $scope.weekly = [];
            $scope.shifts = [];

            $scope.month = "";
            $scope.year = "";
            $scope.message = "";
            $scope.monthNumber = Object.keys($scope.monthly).length;

            $scope.dates = {
                "nextMonth": "",
                "nextYear": "",
                "previousMonth": "",
                "previousYear": ""
            };

            $scope.form = Schedule.getCreateForm();
            $scope.columns = Schedule.getWeeklyColumns();
            $scope.monthlyColumns = Schedule.getMonthlyColumns();
            $scope.monthLabels = Calendar.getMonths();
            $scope.weekday = Calendar.getWeekdays();

            Shift.allShifts().then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    $scope.shifts.push({
                        "id": "",
                        "name": ""
                    });

                    response.data.forEach((shift) => {
                        $scope.shifts.push({
                            "id": shift._id,
                            "name": shift.name
                        });
                    });
                }
            });

            $scope.$watch("monthly", (newVal, oldVal) => {
                $scope.monthNumber = Object.keys($scope.monthly).length;
            }, true);

            $scope.$watch("form.exclude_weekends", (newVal, oldVal) => {
                if (newVal) {
                    $scope.weekly.forEach((day, ind) => {
                        if (day.label === 'Sunday' || day.label === 'Saturday') {
                            $scope.weekly[ind].non_workday = true;
                            $scope.weekly[ind].shift = null;
                        }
                    });

                    $scope.monthly.forEach((day, ind) => {
                        day.dates.forEach((dates, index) => {
                            if (dates.label === 'Sunday' || dates.label === 'Saturday') {
                                $scope.monthly[ind].dates[index].non_workday = true;
                                $scope.monthly[ind].dates[index].shift = null;
                            }
                        });
                    });
                }
            });

            $scope.$watch("form.type", (newVal, oldVal) => {
                $scope.form.attributes.data = [];

                if (newVal === 'Weekly') {
                    $scope.weekly = [];

                    for (let i = 0; i < $scope.weekday.length; i++) {
                        $scope.weekly.push({
                            "label": $scope.weekday[i],
                            "start": "",
                            "end": "",
                            "hours_flex": "",
                            "shift": "",
                            "non_workday": false
                        });
                    }

                    $scope.form.attributes.data = $scope.weekly;
                } else {
                    let data = [];
                    let year = Calendar.getYear();
                    let month = Calendar.getMonth() + 1;
                    let days = Calendar.getDays(year, month);

                    $scope.monthly = [];
                    $scope.month = month;
                    $scope.year = year;

                    if (month == 12) {
                        $scope.dates.nextMonth = 1;
                        $scope.dates.nextYear = year + 1;
                        $scope.dates.previousMonth = 12;
                        $scope.dates.previousYear = year;
                    } else {
                        $scope.dates.nextMonth = month + 1;
                        $scope.dates.nextYear = year;
                        $scope.dates.previousMonth = month;
                        $scope.dates.previousYear = year;
                    }

                    let monthDay = "";
                    if (month == 1) {
                        monthDay = 0;
                    } else {
                        monthDay = month - 1;
                    }

                    for (let i = 1; i <= days; i++) {
                        data.push({
                            "label": $scope.weekday[new Date(year, monthDay, i).getDay()],
                            "start": "",
                            "end": "",
                            "hours_flex": "",
                            "shift": "",
                            "non_workday": "",
                            "date_num": i
                        });
                    }

                    $scope.monthly.push({
                        "month": month,
                        "year": year,
                        "dates": data
                    });

                    $scope.form.attributes.data = $scope.monthly;
                }
            });
        }
    ]);
})();
