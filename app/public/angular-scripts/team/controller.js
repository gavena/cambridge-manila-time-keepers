(() => {
    const controllers = angular.module("TeamControllers", ["TeamFactories"]);

    controllers.controller("TeamController", ["$scope", "$mdDialog", "Team", ($scope, $mdDialog, Team) => {
        $scope.openMenu = ($mdOpenMenu, ev) => {
            $mdOpenMenu(ev);
        };

        $scope.users = [];
        var ss;
/*  console.log("workdayId controller dd = "+$scope.workdayId);
  $scope.$watch("workdayId", function(){
         console.log("workdayId controller dd2 = "+$scope.workdayId);
         ss=$scope.workdayId;
     });
*/
$scope.$watch("username", (newValue, oldValue) => {
    if (newValue !== undefined) {
      Team.allTeamMembers(newValue).then((response) => {
          console.log("workdayId controller allTeamMembers="+$scope.username);
          if (Object.keys(response.data).length !== 0) {
              response.data.forEach((user) => {
                  $scope.users.push(user);
              });
          } else {

          }
      });




    }
});

/*$scope.$watch("workdayId", (newValue, oldValue) => {
    if (newValue !== undefined) {
      Team.allTeamMembers(newValue).then((response) => {
          console.log("workdayId controller allTeamMembers="+$scope.workdayId);
          if (Object.keys(response.data).length !== 0) {
              response.data.forEach((user) => {
                  $scope.users.push(user);
              });
          } else {

          }
      });




    }
});

*/
/*  console.log("workdayId controller fff= "+ss);
        Team.allTeamMembers('40001619').then((response) => {
            console.log("workdayId controller allTeamMembers="+$scope.workdayId);
            if (Object.keys(response.data).length !== 0) {
                response.data.forEach((user) => {
                    $scope.users.push(user);
                });
            } else {

            }
        });*/
    }]);
})();
