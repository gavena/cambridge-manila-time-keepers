(() => {
    const directives = angular.module("EmployeeDirectives", ["EmployeeFactories"]);


    directives.directive("selectShiftAction", ["$window","Employee", ($window,Employee) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                     scope.form.shift = elem.text().trim();
                     console.log("scope.form.username="+scope.username);
                     console.log("scope.form.shift="+elem.attr("shiftId").trim());
                     var shiftid=elem.attr("shiftId").trim()
                     Employee.updateShift(scope.username, shiftid).then((response) => {
                         if (response.data.success) {
                            console.log("scope.form.username SUCESSS=");
                             $window.location = "/employee/"+scope.username;
                         } else {
                             scope.existing = true;
                             scope.message = response.data.result;
                                 console.log("scope.form.username BOOOO=");
                         }
                     });
                });
            }
        };
    }]);

    directives.directive("selectScheduleAction", ["$window","Employee", ($window,Employee) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                     scope.form.shift = elem.text().trim();
                     console.log("scope.form.username="+scope.username);
                     console.log("scope.form.shift="+elem.attr("shiftId").trim());
                     var shiftid=elem.attr("shiftId").trim()
                     Employee.updateShift(scope.username, shiftid).then((response) => {
                         if (response.data.success) {
                            console.log("scope.form.username SUCESSS=");
                             $window.location = "/employee/"+scope.username;
                         } else {
                             scope.existing = true;
                             scope.message = response.data.result;
                                 console.log("scope.form.username BOOOO=");
                         }
                     });
                });
            }
        };
    }]);


    directives.directive("btnRemoveScheduleAction", ["$window","Employee", ($window,Employee) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                     scope.form.shift = elem.text().trim();
                     console.log("scope.form.username="+scope.username);
                     console.log("scope.form.shift="+elem.attr("shiftId").trim());
                     var shiftid=elem.attr("shiftId").trim()
                     Employee.updateShift(scope.username, shiftid).then((response) => {
                         if (response.data.success) {
                            console.log("scope.form.username SUCESSS=");
                             $window.location = "/employee/"+scope.username;
                         } else {
                             scope.existing = true;
                             scope.message = response.data.result;
                                 console.log("scope.form.username BOOOO=");
                         }
                     });
                });
            }
        };
    }]);

    directives.directive("selectShiftAction", ["$window","Employee", ($window,Employee) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                     scope.form.shift = elem.text().trim();
                     console.log("scope.form.username="+scope.username);
                     console.log("scope.form.shift="+elem.attr("shiftId").trim());
                     var shiftid=elem.attr("shiftId").trim()
                     Employee.updateShift(scope.username, shiftid).then((response) => {
                         if (response.data.success) {
                            console.log("scope.form.username SUCESSS=");
                             $window.location = "/employee/"+scope.username;
                         } else {
                             scope.existing = true;
                             scope.message = response.data.result;
                                 console.log("scope.form.username BOOOO=");
                         }
                     });
                });
            }
        };
    }]);


})();
