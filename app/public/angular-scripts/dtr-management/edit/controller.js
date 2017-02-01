(() => {
    "use strict";
    const controllers = angular.module("EditDtrManagementControllers", [
        "CalendarFactories",
        "DtrOptionsFactories",
        "DtrManagementFactories"
    ]);

    controllers.controller("EditDtrManagementController", [
        "$scope",
        "$timeout",
        "$mdDialog",
        "Calendar",
        "DtrOptions",
        "DtrManagement",
        ( $scope,
          $timeout,
          $mdDialog,
          Calendar,
          DtrOptions,
          DtrManagement
        ) => {

            $scope.getData = () => {
                $timeout(() => {
                    $scope.columns = DtrManagement.getEditDtrHeaders();
                    $scope.leaveTypes = DtrOptions.getLeaveTypes();
                    $scope.tardinessTypes = DtrOptions.getTardinessTypes();
                    $scope.form = DtrManagement.getEditForm();

                    $scope.details = {
                        username: $scope.username,
                        year: $scope.year,
                        month: $scope.month,
                        description: Calendar.getMonthYearString(new Date($scope.year, $scope.month - 1)), //decrease month by 1 January=0, December=11
                        days: Calendar.getDays($scope.year, $scope.month),
                        dtr: []
                    };

                    console.log($scope.details);

                    DtrManagement.getEditableDtr({
                        username: $scope.username,
                        month: String($scope.details.month),
                        year: String($scope.details.year)
                    }).then((response) => {
                        $scope.loading = false;

                        if (response.data.success && response.data.result) {
                          
                        var result = response.data.result;
                        // $scope.currentDtr  = true;
                        // $scope.hasData = true;
                        // $scope.showButton = true;

                        // $scope.details.days = Calendar.getDays($scope.details.year, $scope.details.month);
                        // $scope.details.dtr = result.convertedDates;
                        // $scope.details = Calendar.formatDtr($scope.details);
                        // $scope.details.totalWorkHours = Calendar.getHoursDisplay(result.total_work_hours);
                        // $scope.details.totalLwopHours = Calendar.getHoursDisplay(result.total_late + result.total_undertime);
                        // $scope.details.lateCount = result.late_count;
                        // $scope.details.undertimeCount = result.undertime_count;


                        $scope.form._id = result._id;
                        $scope.form.username = result.username;
                        $scope.form.month = result.month;
                        $scope.form.year = result.year;

                        $scope.form = Calendar.generateEditDtr(
                            $scope.form,
                            result,
                            $scope.details.days,
                            $scope.details.month,
                            $scope.details.year
                        );

                        } else {
                            $scope.hasData = false;
                        }
                    });



                    // DtrManagement.getApprovedDtrByMonthAndYear({
                    //     username: $scope.details.username,
                    //     month: String($scope.details.month),
                    //     year: String($scope.details.year)
                    // }).then((response) => {
                    //     $scope.loading = false;
                    //     if (response.data.success) {
                    //         $scope.form._id = response.data.result._id;
                    //         $scope.form.username = response.data.result.username;
                    //         $scope.form.month = response.data.result.month;
                    //         $scope.form.year = response.data.result.year;


                    //         $scope.form = Calendar.generateEditDtr(
                    //             $scope.form,
                    //             response.data.result,
                    //             $scope.details.days,
                    //             $scope.details.month,
                    //             $scope.details.year
                    //         );

                    //         $scope.oldForm = {};
                    //         angular.copy($scope.form, $scope.oldForm);
                    //     } else {
                    //         $scope.hasData = false;
                    //     }
                    // });
                });
            };

            $scope.$watch("username", (newVal) => {
                if (newVal !== "") {
                    $scope.getData();
                }
            });
        }
    ]);
})();
