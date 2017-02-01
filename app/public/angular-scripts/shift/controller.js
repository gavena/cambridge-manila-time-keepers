  (() => {
      "use strict";
      const controllers = angular.module("ShiftControllers", ["ShiftFactories", "TimeFactories"]);

      controllers.controller("ShiftController", [
          "$scope",
          "$mdDialog",
          "$mdToast",
          "Shift",
          "Time",
          ($scope, $mdDialog, $mdToast, Shift, Time) => {
              $scope.notify = true;
              $scope.hasShifts = false;
              $scope.message = "";
              $scope.shiftId = "";
              $scope.shifts = [];
              $scope.columns = [
                  "Name",
                  "Description",
                  "Shift Start",
                  "Shift End",
                  "Hours Flexible",
                  "Created By",
                  "Action"
              ];

              const DialogController = ($scope, $mdDialog, shiftId) => {
                  $scope.id = shiftId;
                  $scope.hide = function() {
                      $mdDialog.hide();
                  };

                  $scope.cancel = function() {
                      $mdDialog.cancel();
                  };
              }

              $scope.getDelete = (id) => {
                  $mdDialog.show({
                          locals: {
                              shiftId: id
                          },
                          controller: DialogController,
                          templateUrl: "/shift/delete",
                          parent: angular.element(document.body),
                          clickOutsideToClose: false
                      })
                      .then(() => {
                          // create
                      }, () => {
                          // cancel
                      });
              };

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

              $scope.$watch("shift", (newVal, oldVal) => {
                  console.log("inside shiftfffffff");
                if (newVal !== undefined) {
                  Shift.getById(newVal).then((response) => {
                    console.log("inside shift");
                      if (Object.keys(response.data).length !== 0) {
                          response.data.forEach((shift) => {
                              $scope.shifts.push(shift);
                          });

                          $scope.hasShifts = true;
                      } else {
                          $scope.hasShifts = false;
                      }
                  });
                }
              });


              $scope.$watch("allshift", (newVal, oldVal) => {
                  console.log("inside shiftfffffff");
                if (newVal !== undefined) {
                            Shift.allShifts().then((response) => {
                              console.log("inside all schift");
                                if (Object.keys(response.data).length !== 0) {
                                    response.data.forEach((shift) => {
                                        $scope.shifts.push(shift);
                                    });

                                    $scope.hasShifts = true;
                                } else {
                                    $scope.hasShifts = false;
                                }
                            });
                          }
                        });


          }
      ]);
  })();
