(() => {
    const controllers = angular.module("CreateShiftControllers", ["ShiftFactories"]);

    controllers.controller("CreateShiftController", [
        "$scope",
        "$mdDialog",
        "Shift",
        ($scope, $mdDialog, Shift) => {
            $scope.existing = false;
            $scope.message = "";
            $scope.form = Shift.getCreateForm();
        }
    ]);
})();
