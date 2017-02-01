(() => {
    const directives = angular.module("EditShiftDirectives", []);

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

    directives.directive("btnSaveShiftAction", ["$window", "Shift", ($window, Shift) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    scope.existing = false;

                    Shift.edit(scope.form).then((response) => {
                        if (response.data.success) {
                            $window.location.href = "/shift/listing";
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
