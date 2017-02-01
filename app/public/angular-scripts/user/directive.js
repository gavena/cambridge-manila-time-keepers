(() => {
    const directives = angular.module("UserDirectives", []);

    directives.directive("btnCreateUserPageAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = "/user/create";
                });
            }
        };
    }]);
})();
