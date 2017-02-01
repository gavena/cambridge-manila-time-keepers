(() => {
    "use strict";
    const directives = angular.module("TeamDirectives", []);

    directives.directive("btnEmployeePageAction", ["$window", ($window) => {

        return {
      restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                  console.log('Here it is btnEmployeePageAction');
                    let workdayId = elem.attr("workdayId");
                    let username = elem.attr("username");
                    $window.location = `/employee/${username}`;
                    scope.$apply();
                });
            }
        };
    }]);


    directives.directive("btnEmployeeTeamPageAction", ["$window", ($window) => {

        return {
          restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    console.log('Here it is');
                    let workdayId = elem.attr("workdayId");
                    let username = elem.attr("username");
                    $window.location = `/team/list/${username}`;
                    scope.$apply();
                });
            }
        };
    }]);
})();


//
