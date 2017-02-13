  (() => {
      const controllers = angular.module("UserControllers", ["UserFactories"]);

      controllers.controller("UserController", [
          "$scope",
          "$timeout",
          "$q",
          "$mdDialog",
          "$mdToast",
          "User",
          ($scope, $timeout, $q, $mdDialog, $mdToast, User) => {
              $scope.notify = false;

              $scope.message = "";

              $scope.hasUsers = false;
              $scope.users = [];

              $scope.columns = [
                  "Workday ID",
                  "First Name",
                  "Middle Name",
                  "Last Name",
                  "Position",
                  "Action"
              ];

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

              $scope.$watch("alluser", (newVal, oldVal) => {
                if (newVal !== undefined) {
                  User.allUsers().then((response) => {
                    if (Object.keys(response.data).length !== 0) {
                        response.data.forEach((users) => {
                            $scope.users.push(users);
                        });

                        $scope.hasUsers = true;
                    } else {
                        $scope.hasUsers = false;
                    }
                  });
                }
              });

          }
      ]);
  })();
