(() => {
  "use strict";
    const controllers = angular.module("DtrManagementControllers", [
        "CalendarFactories",
        "DtrOptionsFactories",
        "DtrManagementFactories"
    ]);


    controllers.controller("DtrManagementController", [
        "$scope",
        "$timeout",
        "$mdDialog",
        "$mdToast",
        "Calendar",
        "DtrOptions",
        "DtrManagement",
        "moment",
        (   $scope,
            $timeout,
            $mdDialog,
            $mdToast,
            Calendar,
            DtrOptions,
            DtrManagement,
            moment
        ) => {
          
          $scope.oldDtr = {};
          $scope.details  = { month: null, year: null,    username: $scope.username };
          $scope.hasData = true;
          $scope.showButton = true;
          $scope.currentDtr = true;

          function DtrDialogController($scope, $mdDialog, username, year, month) {
              $scope.id = username + "/"+ year + "/" + (month - 1);
              $scope.hide = function() {
                  $mdDialog.hide();
              };
              $scope.cancel = function() {
                  $mdDialog.cancel();
              };
          }

            $scope.getSubmitDtr = () => {
                $mdDialog.show({
                        locals: {
                            username: $scope.details.username,
                            year: Calendar.getYear(),
                            month: Calendar.getCurrentMonth(),
                        },
                        controller: DtrDialogController,
                        templateUrl: "/submit-dtr",
                        parent: angular.element(document.body),
                        clickOutsideToClose: false
                    })
                    .then(() => {

                    }, () => {

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
                        .position("top")
                        .textContent($scope.message)
                        .theme(theme)
                        .hideDelay(3000)
                    );
                }
            });

            $timeout(function() {
              $scope.columns = DtrManagement.getDtrHeaders();
              $scope.leaveTypes = DtrOptions.getLeaveTypes();
              $scope.tardinessTypes = DtrOptions.getTardinessTypes();

              $scope.loading = true;

              var lastMonth = Calendar.getPreviousMonth();

              $scope.details = {
                  isCertify: true,
                  username: $scope.username,
                  isSubmitted: false,
                  currentPageMonth: lastMonth,
                  year: lastMonth.getFullYear(),
                  month: lastMonth.getMonth() + 1, // add 1 to match the data on mongodb
                  description: Calendar.getMonthYearString(lastMonth),
                  days: Calendar.getDays(lastMonth.getFullYear(), lastMonth.getMonth()),

                  dtr: []
              };

                $scope.columns = DtrManagement.getDtrHeaders();
                $scope.leaveTypes = DtrOptions.getLeaveTypes();
                $scope.tardinessTypes = DtrOptions.getTardinessTypes();
                $scope.noData = false;

                DtrManagement.getEditableDtr({
                    username: $scope.username,
                    month: String($scope.details.month),
                    year: String($scope.details.year)
                }).then((response) => {
                  $scope.showButton = false;

                  if (response.data.success && response.data.result) {
                      
                    var result = response.data.result;
                    $scope.currentDtr  = true;
                    $scope.hasData = true;
                    $scope.showButton = true;

                    $scope.details.days = Calendar.getDays($scope.details.year, $scope.details.month);
                    $scope.details.dtr = result.convertedDates;
                    $scope.details = Calendar.formatDtr($scope.details);
                    $scope.details.totalWorkHours = Calendar.getHoursDisplay(result.total_work_hours);
                    $scope.details.totalLwopHours = Calendar.getHoursDisplay(result.total_late + result.total_undertime);
                    $scope.details.lateCount = result.late_count;
                    $scope.details.undertimeCount = result.undertime_count;
                  } else {
                    $scope.hasData = false;
                  }
                });
            });
        }
    ]);
})();
