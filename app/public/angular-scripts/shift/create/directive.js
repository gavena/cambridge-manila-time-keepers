(() => {
    const directives = angular.module("CreateShiftDirectives", ["ShiftFactories"]);

    directives.directive("btnCancelAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = "/shift/listing";
                });
            }
        };
    }]);

    directives.directive("btnCreateShiftAction", ["$window", "Shift", ($window, Shift) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    scope.existing = false;

                    Shift.create(scope.form).then((response) => {
                        if (response.data.success) {
                            $window.location = "/shift/listing";
                        } else {
                            scope.existing = true;
                            scope.message = response.data.result;
                        }
                    });

                    scope.$apply();
                });
            }
        };
    }]);
})();
