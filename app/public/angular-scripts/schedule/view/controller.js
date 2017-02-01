(() => {
    "use strict";
    const controllers = angular.module("ViewScheduleControllers", [
        "ScheduleFactories",
        "TimeFactories",
        "CalendarFactories",
        "ShiftFactories"
    ]);

    controllers.controller("ViewScheduleController", [
        "$scope",
        "$mdDialog",
        "Schedule",
        "Time",
        "Shift",
        "Calendar",
        "$mdToast",
        ($scope, $mdDialog, Schedule, Time, Shift, Calendar, $mdToast) => {
            $scope.existing = false;
            $scope.editModule = true;
            $scope.notify = false;

            $scope.message = "";

            $scope.shifts = [];

            $scope.form = Schedule.getEditForm();
            $scope.columns = Schedule.getWeeklyColumns();
            $scope.monthlyColumns = Schedule.getMonthlyColumns();
            $scope.monthLabels = Calendar.getMonths();
            $scope.weekday = Calendar.getWeekdays();

            Shift.allShifts().then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    response.data.forEach((shift) => {
                        $scope.shifts.push({
                            "id": shift._id,
                            "name": shift.name
                        });
                    });
                }
            });

            $scope.$watch("notify", (newVal, oldVal) => {
                let theme = "error-toast";
                if ($scope.success === "true") {
                    theme = "success-toast";
                }

                if (newVal === "true") {
                    $mdToast.show(
                        $mdToast.simple()
                        .position("bottom")
                        .textContent($scope.message)
                        .theme(theme)
                        .hideDelay(3000)
                    );
                }
            });

            const formatValues = (details) => {
                if (details.start !== "") {
                    details.start = Time.toTime(details.start);
                }

                if (details.end !== "") {
                    details.end = Time.toTime(details.end);
                }

                if (details.hours_flex === "") {
                    details.hours_flex = 0;
                }

                $scope.shifts.forEach((shift) => {
                    if (details.shift === "" || details.shift === null) {
                        details.shift = "None";
                    }

                    if (details.shift === shift.id) {
                        details.shift = shift.name;
                    }
                });
            }

            $scope.$watch("id", (newValue, oldValue) => {
                if (newValue !== undefined) {
                    Schedule.getById(newValue).then((response) => {
                        response.data.forEach((schedule) => {
                            Object.keys(schedule).forEach((key) => {
                                $scope.form[key] = schedule[key];

                                if (key === "attributes") {
                                    $scope.form[key].data = schedule[key];
                                }
                            });
                        });

                        if ($scope.form.type === "Weekly") {
                            $scope.form.attributes.data.forEach((dates) => {
                                formatValues(dates);
                            });
                        } else {
                            $scope.form.attributes.data.forEach((dates) => {
                                dates.dates.forEach((day) => {
                                    formatValues(day);
                                });
                            });
                        }
                    });
                }
            });
        }
    ]);
})();
