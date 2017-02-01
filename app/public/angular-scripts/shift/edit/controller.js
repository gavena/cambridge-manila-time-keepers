(() => {
    const controllers = angular.module("EditShiftControllers", ["ShiftFactories", "TimeFactories"]);

    controllers.controller("EditShiftController", [
        "$scope",
        "$mdDialog",
        "Shift",
        "Time",
        ($scope, $mdDialog, Shift, Time) => {
            $scope.existing = false;

            $scope.message = "";
            $scope.name = "";

            $scope.form = Shift.getEditForm();

            $scope.$watch("id", (newValue, oldValue) => {
                if (newValue !== undefined) {
                    Shift.getById(newValue).then((response) => {
                        response.data.forEach((shift) => {
                            Object.keys(shift).forEach((key) => {
                                $scope.form[key] = shift[key];

                                if (key === "name") {
                                    $scope.name = $scope.form.name;
                                }

                                if (key === "start" || key === "end") {
                                    $scope.form[key] = Time.toTime(shift[key]);
                                }

                                if (key === "hours_flex") {
                                    $scope.form[key] = parseInt(shift[key]);
                                }
                            });
                        });
                    });
                }
            });
        }
    ]);
})();
