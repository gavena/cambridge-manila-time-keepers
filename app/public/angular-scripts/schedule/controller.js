  (() => {
      const controllers = angular.module("ScheduleControllers", ["ScheduleFactories"]);

      controllers.controller("ScheduleController", [
          "$scope",
          "$mdDialog",
          "$mdToast",
          "Schedule",
          ($scope, $mdDialog, $mdToast, Schedule) => {
              $scope.hasSchedules = false;
              $scope.scheduleId = "";
              $scope.schedules = [];
              $scope.columns = [
                  "Name",
                  "Description",
                  "Type",
                  "Created By",
                  "Action"
              ];

              const DialogController = ($scope, $mdDialog, scheduleId) => {
                  $scope.id = scheduleId;
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
                              scheduleId: id
                          },
                          controller: DialogController,
                          templateUrl: "/schedule/delete",
                          parent: angular.element(document.body),
                          clickOutsideToClose: false
                      })
                      .then(() => {
                          // create
                      }, () => {
                          // cancel
                      });
              };
              $scope.$watch("schedule", (newVal, oldVal) => {
                if (newVal !== undefined) {
                  Schedule.getById(newVal).then((response) => {
                      if (Object.keys(response.data).length !== 0) {
                          response.data.forEach((schedules) => {
                              $scope.schedules.push(schedules);
                          });
                          $scope.hasSchedules = true;
                      } else {
                          $scope.hasSchedules = false;
                      }
                  });
                }
              });

              $scope.$watch("allschedule", (newVal, oldVal) => {
                //  console.log("inside schedule");
                if (newVal !== undefined) {
                  Schedule.allSchedules().then((response) => {
                  if (Object.keys(response.data).length !== 0) {
                      response.data.forEach((schedules) => {
                          $scope.schedules.push(schedules);
                      });

                      $scope.hasSchedules = true;
                  } else {
                      $scope.hasSchedules = false;
                  }
              });
            }
          });

          }
      ]);
  })();
