(() => {
    const services = angular.module("UserServices", []);

    services.service("UserService", [
        "$http",
        "$q",
        "$rootScope",
        "$window",
        function($http, $q, $rootScope, $window) {
            this.create = (details) => {
                const dfd = $q.defer();

                $http({
                    "method": "POST",
                    "url": "/user/create",
                    "data": details
                }).then((success) => {
                    dfd.resolve(success);
                });

                return dfd.promise;
            };

            this.allUsers = () => {
                const dfd = $q.defer();

                $http({
                    "method": "GET",
                    "url": "/all-users"
                }).then((success) => {
                    dfd.resolve(success);
                });

                return dfd.promise;
            };

            this.authenticate = (userData) => {
                const dfd = $q.defer();
                  // console.log('USER SERVICE username+d ='+userData.username +'  password ='+userData.password);
                $http({
                    "method": "POST",
                    "url": "/login",
                    "data": userData,
                    "username": userData.username,
                    "password": userData.password
                }).then((success) => {
                    // console.log('success='+success);
                    dfd.resolve(success);
                });

                return dfd.promise;
            };

        }
    ]);
})();
