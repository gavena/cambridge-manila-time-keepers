(() => {
    const directives = angular.module("EditDtrManagementDirectives", [
        "DtrManagementFactories",
        "CalendarFactories"
    ]);

    directives.directive("btnResetDtrAction", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    angular.copy(scope.oldForm, scope.form);
                    scope.$apply();
                });
            }
        };
    });


    directives.directive("btnSaveDtrAction", [
        "DtrManagement",
        "Calendar",
        "$window",
        (DtrManagement, Calendar, $window) => {
            return {
                restrict: "A",
                link: (scope, elem) => {
                    elem.click(() => {
                        DtrManagement.edit(scope.form).then((response) => {
                            if (response.data.success) {
                                $window.location.href = "/my-dtr";
                            } else {

                            }
                        });
                        scope.$apply();
                    });
                }
            };
        }
    ]);

})();
