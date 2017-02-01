(() => {
    const directives = angular.module("EmployeeDtrDirectives", [
      "DtrManagementFactories",
      "CalendarFactories"
    ]);

    directives.directive("btnApproveDtrAction", [
        "DtrManagement",
        "Calendar",
        "$window",
        (DtrManagement, Calendar, $window) => {
            return {
                restrict: "A",
                link: (scope, elem) => {
                    elem.click(() => {
                        DtrManagement.approve(scope.form).then((response) => {
                            if (response.data.success) {
                                $window.location.href = "/employee/"+ scope.username;
                            } else {

                            }
                        });
                        scope.$apply();
                    });
                }
            };
        }
    ]);

    directives.directive("btnReturnDtrAction", [
        "DtrManagement",
        "Calendar",
        "$window",
        (DtrManagement, Calendar, $window) => {
            return {
                restrict: "A",
                link: (scope, elem) => {
                    elem.click(() => {
                        DtrManagement.return(scope.form).then((response) => {
                            if (response.data.success) {
                                $window.location.href = "/employee/"+ scope.username;
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
