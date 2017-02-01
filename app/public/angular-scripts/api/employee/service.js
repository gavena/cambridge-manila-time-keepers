(() => {
    const services = angular.module("EmployeeServices", []);

    services.service("EmployeeService", [
        "$http",
        "$q",
        "$rootScope",
        "$window",
        function($http, $q, $rootScope, $window) {
            this.getByUsername = (username) => {
                const dfd = $q.defer();
                $http({
                    "method": "GET",
                    "url": `/get-by-username/${username}`
                }).then((success) => {
                    dfd.resolve(success);
                });
                return dfd.promise;
            };

            this.getByWorkdayID = (workdayId) => {
                const dfd = $q.defer();
                $http({
                    "method": "GET",
                    "url": `/get-by-workdayId/${workdayId}`
                }).then((success) => {
                    dfd.resolve(success);
                });
                return dfd.promise;
            };
        }
    ]);
})();
