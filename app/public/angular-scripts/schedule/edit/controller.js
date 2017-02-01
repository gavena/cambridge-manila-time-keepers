(() => {
    const controllers = angular.module("EditScheduleControllers", [
        "ScheduleFactories",
        "TimeFactories",
        "CalendarFactories",
        "ShiftFactories"
    ]);

    controllers.controller("EditScheduleController", [
        "$scope",
        "$mdDialog",
        "Schedule",
        "Time",
        "Shift",
        "Calendar",
        ($scope, $mdDialog, Schedule, Time, Shift, Calendar) => {
            $scope.existing = false;
            $scope.editModule = true;

            $scope.message = "";
            $scope.name = "";

            $scope.shifts = [];

            $scope.form = Schedule.getEditForm();
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

            $scope.$watch("id", (newValue, oldValue) => {
                if (newValue !== undefined) {
                    Schedule.getById(newValue).then((response) => {
                        response.data.forEach((schedule) => {
                            Object.keys(schedule).forEach((key) => {
                                $scope.form[key] = schedule[key];

                                if (key === "name") {
                                  $scope.name = $scope.form.name;
                                }

                                if (key === "attributes" && $scope.form.type === "Weekly") {
                                    $scope.form[key].data = schedule[key];
                                } else if (key === "attributes" && $scope.form.type === "Monthly") {
                                    $scope.form[key].data = schedule[key][0];
                                }
                            });
                        });

                        if ($scope.form.type === "Weekly") {
                            $scope.form.attributes.data.forEach((dates) => {
                                if (dates.start !== "") {
                                    dates.start = Time.toTime(dates.start);
                                }

                                if (dates.end !== "") {
                                    dates.end = Time.toTime(dates.end);
                                }
                            });
                        } else {
                            $scope.form.attributes.data.dates.forEach((dates) => {
                                if (dates.start !== "") {
                                    dates.start = Time.toTime(dates.start);
                                }

                                if (dates.end !== "") {
                                    dates.end = Time.toTime(dates.end);
                                }
                            });
                        }
                    });
                }
            });

            $scope.$watch("form.exclude_weekends", (newVal, oldVal) => {
                if (newVal) {
                    if ($scope.form.type === "Weekly") {
                        $scope.form.attributes.forEach((day, ind) => {
                            if (day.label === 'Sunday' || day.label === 'Saturday') {
                                $scope.form.attributes[ind].non_workday = true;
                                $scope.form.attributes[ind].shift = null;
                            }
                        });
                    } else {
                        $scope.form.attributes.data.dates.forEach((day, ind) => {
                            if (day.label === 'Sunday' || day.label === 'Saturday') {
                                $scope.form.attributes.data.dates[ind].non_workday = true;
                                $scope.form.attributes.data.dates[ind].shift = null;
                            }
                        });
                    }
                }
            });
        }
    ]);
})();
