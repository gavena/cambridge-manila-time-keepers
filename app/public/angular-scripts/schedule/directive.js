(() => {
    const directives = angular.module("ScheduleDirectives", []);

    directives.directive("btnCreateSchedulePageAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = "/schedule/create";
                });
            }
        };
    }]);

    directives.directive("btnViewScheduleAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = "/schedule/view/" + elem.attr("schedule-id");
                });
            }
        };
    }]);
})();
