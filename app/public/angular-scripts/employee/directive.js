(() => {
    const directives = angular.module("EmployeeDirectives", []);


    directives.directive("selectShiftAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    scope.form.shift = elem.text().trim();
                     console.log("scope.form.shift="+scope.form.shift);
                     console.log("scope.form.shift="+elem.attr("shiftId").trim());
                });
            }
        };
    }]);


})();
