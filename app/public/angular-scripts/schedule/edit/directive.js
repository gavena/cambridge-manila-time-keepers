(() => {
    "use strict";
    const directives = angular.module("EditScheduleDirectives", ["ScheduleFactories"]);

    directives.directive("btnCancelEditScheduleAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = "/schedule/view/" + elem.attr("schedule-id");
                });
            }
        };
    }]);

    directives.directive("btnSaveScheduleAction", ["$window", "Schedule", ($window, Schedule) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    let data = scope.form.attributes.data;
                    scope.form.attributes = data;
                    scope.existing = false;

                    Schedule.edit(scope.form).then((response) => {
                        if (response.data.success) {
                            $window.location = "/schedule/view/" + scope.id;
                        } else {
                            scope.form.attributes.data = data;
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
