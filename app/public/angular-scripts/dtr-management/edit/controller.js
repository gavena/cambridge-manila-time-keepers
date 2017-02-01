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
        ($scope,
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
                        description: Calendar.getMonthString($scope.month - 1) + " " + $scope.year,
                        days: Calendar.getDays($scope.year, $scope.month),
                        dtr: []
                    };

                    DtrManagement.getApprovedDtrByMonthAndYear({
                        username: $scope.details.username,
                        month: String($scope.details.month),
                        year: String($scope.details.year)
                    }).then((response) => {
                        $scope.loading = false;
                        if (response.data.success) {
                            $scope.form._id = response.data.result._id;
                            $scope.form.username = response.data.result.username;
                            $scope.form.month = response.data.result.month;
                            $scope.form.year = response.data.result.year;
                            $scope.form = Calendar.generateEditDtr(
                                $scope.form,
                                response.data.result,
                                $scope.details.days,
                                $scope.details.month,
                                $scope.details.year
                            );

                            $scope.oldForm = {};
                            angular.copy($scope.form, $scope.oldForm);
                        } else {
                            $scope.hasData = false;
                        }
                    });
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
