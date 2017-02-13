(() => {
    "use strict";
    const controllers = angular.module("ViewUserControllers", [
        "UserFactories",
    ]);

    controllers.controller("ViewUserController", [
        "$scope",
        "$mdDialog",
        "$mdToast",
        "User",
        ($scope, $mdDialog, User, $mdToast) => {

          $scope.form = User.getEditForm();

        }
    ]);
})();
