(() => {
    const directives = angular.module("ShiftDirectives", []);

    directives.directive("btnCreateShiftPageAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = "/shift/create";
                });
            }
        };
    }]);

    directives.directive("btnDeleteShiftAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    scope.getDelete(elem.attr("shift-id"));
                });
            }
        };
    }]);

    directives.directive("btnEditShiftAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = "/shift/edit/" + elem.attr("shift-id");
                });
            }
        };
    }]);
})();
