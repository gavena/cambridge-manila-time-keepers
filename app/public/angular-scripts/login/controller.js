  (() => {
      "use strict";
      const controllers = angular.module("LoginUserControllers", []);

      controllers.controller("LoginUserController", [
          "$scope",
          "$timeout",
        //  "$q",
        //  "$mdDialog",
      //    "$mdToast",
          ($scope, $timeout
            //, $q, $mdDialog, $mdToast
          ) => {
            console.log('xxxxxxxxx');
            /*  $scope.notify = false;

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
              });*/
          }
      ]);
  })();
