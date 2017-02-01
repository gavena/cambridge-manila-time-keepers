  (() => {
      "use strict";
      const controllers = angular.module("UserControllers", []);

      controllers.controller("UserController", [
          "$scope",
          "$timeout",
          "$q",
          "$mdDialog",
          "$mdToast",
          ($scope, $timeout, $q, $mdDialog, $mdToast) => {
              $scope.notify = false;

              $scope.message = "";

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
          }
      ]);
  })();
