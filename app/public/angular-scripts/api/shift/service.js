(() => {
    const services = angular.module("ShiftServices", []);

    services.service("ShiftService", [
        "$http",
        "$q",
        "$rootScope",
        "$window",
        function($http, $q, $rootScope, $window) {
            this.create = (details) => {
                const dfd = $q.defer();

                $http({
                    "method": "POST",
                    "url": "/shift/create",
                    "data": details
                }).then((success) => {
                    dfd.resolve(success);
                });

                return dfd.promise;
            };

            this.edit = (details) => {
                const dfd = $q.defer();

                $http({
                    "method": "POST",
                    "url": "/shift/update/",
                    "data": details
                }).then((success) => {
                    dfd.resolve(success);
                });

                return dfd.promise;
            };

            this.getById = (id) => {
                const dfd = $q.defer();

                $http({
                    "method": "GET",
                    "url": `/get-shift-details/${id}`
                }).then((success) => {
                    dfd.resolve(success);
                });

                return dfd.promise;
            };

            this.allShifts = () => {
                const dfd = $q.defer();

                $http({
                    "method": "GET",
                    "url": "/all-shifts"
                }).then((success) => {
                    dfd.resolve(success);
                });

                return dfd.promise;
            };
        }
    ]);
})();
