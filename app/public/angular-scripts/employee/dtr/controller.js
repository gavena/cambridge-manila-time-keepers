(() => {
    const controllers = angular.module("EmployeeDtrControllers", [
      "EmployeeFactories",
      "CalendarFactories",
      "DtrOptionsFactories",
      "DtrManagementFactories"
    ]);

    controllers.controller("EmployeeDtrController", [
      "$scope",
      "$mdDialog",
      "$timeout",
      "Employee",
      "Calendar",
      "DtrManagement",
    ( $scope,
      $mdDialog,
      $timeout,
      Employee,
      Calendar,
      DtrManagement
    ) => {

      $scope.getDtr = () => {
        $timeout(() => {
          $scope.oldDtr = {};
          $scope.columns = DtrManagement.getEditDtrHeaders();
          $scope.form = DtrManagement.getEditForm();

          $scope.hasData = true;
          $scope.currentDtr = true;

          var lastMonth = Calendar.getPreviousMonth();

          $scope.details = {
              username: $scope.username,
              year:  lastMonth.getFullYear(),
              month: lastMonth.getMonth() + 1, //to match the data in mongodb
              description: Calendar.getMonthYearString(Calendar.getPreviousMonth()),
              days: Calendar.getDays(lastMonth.getFullYear(), lastMonth.getMonth()),
              dtr: []
          };

          DtrManagement.getApprovedDtrByMonthAndYear({
              username: $scope.details.username,
              year: String($scope.details.year),
              month: String($scope.details.month)
          }).then((response) => {
             if (response.data.success) {
                 if (typeof response.data.result !== 'undefined') {
                     $scope.form._id = response.data.result._id;
                     $scope.form.username = response.data.result.username;
                     $scope.form.month = response.data.result.month;
                     $scope.form.year = response.data.result.year;
                     $scope.details.status = response.data.result.status;
                     $scope.details.isCertify = (response.data.result.is_certified === 'true');
                     $scope.details.isApproved = (response.data.result.status === 'APPROVED');
                     $scope.details.isReturned = (response.data.result.status === 'RETURNED');

                     $scope.form = Calendar.generateEditDtr(
                       $scope.form,
                       response.data.result,
                       $scope.details.days,
                       $scope.details.month,
                       $scope.details.year
                     );

                    $scope.oldDtr.days = Calendar.getDays($scope.details.year, $scope.details.month);
                    $scope.oldDtr.year = $scope.details.year;
                    $scope.oldDtr.month = $scope.details.month;
                    $scope.oldDtr.dtr = response.data.result.dates;
                    $scope.oldDtr = Calendar.formatDtr($scope.oldDtr);
                    $scope.hasData = true;


                    if($scope.details.isApproved){
                          $scope.hasData = false;
                          $scope.details.description = "No DTR for approval."
                    }
                  } else {
                    $scope.hasData = false;
                  }
              } else {
                  $scope.hasData = false;
              }
          });

        });
      };


      $scope.$watch("username", (newValue, oldValue) => {

          if (newValue !== undefined) {
              $scope.getDtr();
                  console.log("$scope.username="+$scope.username);
          }
          else{
              console.log("$scope.usernam else= "+$scope.username);
          }
      });

    }



  ]);
})();
