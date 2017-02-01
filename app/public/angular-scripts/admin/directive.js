(() => {
    const directives = angular.module("AdminDirectives", []);

    directives.directive("btnRedirectAction", ["$window", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = elem.attr("url");
                    scope.isLoading = false;
                    scope.$apply();
                });
            }
        };
    }]);
})();
