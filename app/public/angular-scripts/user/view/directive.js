(() => {
    const directives = angular.module("ViewScheduleDirectives", []);

    directives.directive("btnEditScheduleAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = "/schedule/edit/" + elem.attr("schedule-id");
                });
            }
        };
    }]);
})();
