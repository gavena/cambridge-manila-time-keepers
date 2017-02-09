  (() => {
    "use strict";
      const controllers = angular.module("EmployeeControllers",
      ["EmployeeFactories",
      "EmployeeDtrModule",
      "ShiftFactories",
      "ScheduleFactories"]);

      controllers.controller("EmployeeController", [
        "$scope",
        "$mdDialog",
        "Employee",
        "Shift",
        "Schedule",
        "$mdToast", (
          $scope,
          $mdDialog,
          Employee,
          Shift,
          Schedule,
          $mdToast
        ) => {
          $scope.shifts2 = [];
          $scope.schedules2 = [];
          $scope.employee = {
              "_id": "",
              "employee_id": "",
              "username": "",
              "workdayId": "",
              "first_name": "",
              "last_name": "",
              "position": "",
              "department": "",
              "team": "",
              "line_manager": "",
              "lm_workday_id": "",
              "lm_username": "",
              "usertype": "",
              "shift": "",
              "schedule":""
          };

            $scope.form = {"shift":""};
        /*  $scope.shifts = [
              "Junior Software Quality Analyst",
              "Software Quality Analyst",
              "Senior Software Quality Analyst",
              "Junior Software Engineer",
              "Software Engineer",
              "Senior Software Engineer",
              "Associate Project Delivery Manager",
              "Project Delivery Manager"
          ];
*/
          $scope.$watch("notify", (newVal, oldVal) => {
              let theme = "error-toast";
              if ($scope.success === "true") {
                  theme = "success-toast";
              }

              if (newVal === "true") {
                  $mdToast.show(
                      $mdToast.simple()
                      .position("top")
                      .textContent($scope.message)
                      .theme(theme)
                      .hideDelay(3000)
                  );
              }
          });

          $scope.$watch("username", (newValue, oldValue) => {
              if (newValue !== undefined) {
                  Employee.getByUsername(newValue).then((response) => {
                      response.data.forEach((employee) => {
                          Object.keys(employee).forEach((key) => {
                              $scope.employee[key] = employee[key];
                          });
                      });
                  });
              }
          });

          $scope.$watch("workdayId", (newValue, oldValue) => {
              if (newValue !== undefined) {
                  Employee.getByWorkdayID(newValue).then((response) => {
                      response.data.forEach((employee) => {
                          Object.keys(employee).forEach((key) => {
                              $scope.employee[key] = employee[key];
                          });
                      });
                  });
              }
          });

          Shift.allShifts().then((response) => {
              if (Object.keys(response.data).length !== 0) {
                  response.data.forEach((shift) => {
                      $scope.shifts2.push({
                          "id": shift._id,
                          "name": shift.name
                      });

                  });

              }
          });

          Schedule.allSchedules().then((response) => {
          if (Object.keys(response.data).length !== 0) {
              response.data.forEach((schedules) => {
                 $scope.schedules2.push({
                     "id": schedules._id,
                     "name": schedules.name
                 });
              });

              $scope.hasSchedules = true;
          } else {
              $scope.hasSchedules = false;
          }
      });


      }]);
  })();
