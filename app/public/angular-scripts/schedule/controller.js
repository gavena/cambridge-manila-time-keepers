  (() => {
      const controllers = angular.module("ScheduleControllers", ["ScheduleFactories","EmployeeFactories"]);

      controllers.controller("ScheduleController", [
          "$scope",
          "$mdDialog",
          "$mdToast",
          "Employee",
          "Schedule",
          ($scope, $mdDialog, $mdToast, Employee,Schedule) => {
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
          /*   $scope.$watch("schedule", (newVal, oldVal) => {
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
*/
              $scope.$watch("username1", (newValue, oldValue) => {
                //  console.log("$scope.employee.schedule="+newValue);
                  //  console.log("inside shift="+$scope.employee.shift);
                  if (newValue !== undefined) {
                      Employee.getByUsername(newValue).then((response) => {
                          response.data.forEach((employee) => {
                              Object.keys(employee).forEach((key) => {
                                  $scope.employee[key] = employee[key];
                              });
var count=0;
  $scope.employee.schedule.forEach((sched)=> {
    count++;
      console.log("schede count="+count+"   "+sched.sched);
      Schedule.getById(sched.sched).then((response) => {
          if (Object.keys(response.data).length !== 0) {
              response.data.forEach((schedules) => {
                  $scope.schedules.push(schedules);
              });
              $scope.hasSchedules = true;
          } else {
              $scope.hasSchedules = false;
          }
      });
      //$scope.schedules.push(schedules);
  });
                            //    console.log("$scope.employee.schedule="+$scope.employee.schedule.sched);




                          });
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
