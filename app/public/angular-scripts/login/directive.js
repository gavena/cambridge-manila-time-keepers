(() => {
    const directives = angular.module("LoginUserDirectives", ["UserFactories"]);
    directives.directive("btnLoginUserAction",  ["$window", "User","$rootScope",($window, User ) => {

    //directives.directive("btnLoginUserAction",  ["$window", "User","$scope","$rootScope",($window, User,$scope,$rootScope) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {

                    User.authenticate(scope.form).then((response) => {
                      //  $window.location = "/home";
                        if (response.data.success) {
                          console.log('Ayos='+response.user);
                            $window.location = `/home?username=${response.data.user}`;
                          //  $rootScope.usernameroot=response.data.user;
                        } else {
                          console.log('Boo =' + response.data.success);
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
