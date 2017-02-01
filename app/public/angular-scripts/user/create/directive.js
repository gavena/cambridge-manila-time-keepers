(() => {
    const directives = angular.module("CreateUserDirectives", ["UserFactories"]);

    directives.directive("btnCancelCreateUserAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = "/user";
                });
            }
        };
    }]);

    directives.directive("selectUserAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                //  console.log("elemenetnenne="+elem.attr("username").trim());
                    scope.form.line_manager =  elem.text().trim();
                    scope.form.lm_username = elem.attr("username").trim();
                });
            }
        };
    }]);

    directives.directive("selectPositionAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    scope.form.position = elem.text().trim();
                });
            }
        };
    }]);


    directives.directive("selectDepartmentAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    scope.form.department = elem.text().trim();
                });
            }
        };
    }]);

    directives.directive("selectUsertypeAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                  //console.log("elemenetnenne="+elem.attr("usergroup"));
                    scope.form.usertype = elem.attr("usergroup").trim();
                });
            }
        };
    }]);

    directives.directive("btnCreateUserAction", ["$window", "User", ($window, User) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    scope.existing = false;

                    User.create(scope.form).then((response) => {
                        if (response.data.success) {
                            $window.location = "/user";
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
