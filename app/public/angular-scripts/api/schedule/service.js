(() => {
    const services = angular.module("ScheduleServices", []);

    services.service("ScheduleService", [
        "$http",
        "$q",
        "$rootScope",
        "$window",
        function($http, $q, $rootScope, $window) {
            this.create = (details) => {
                const dfd = $q.defer();

                $http({
                    "method": "POST",
                    "url": "/schedule/create",
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
                    "url": "/schedule/update/",
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
                    "url": `/get-schedule-details/${id}`
                }).then((success) => {
                    dfd.resolve(success);
                });

                return dfd.promise;
            };

            this.allSchedules = () => {
                const dfd = $q.defer();

                $http({
                    "method": "GET",
                    "url": "/all-schedules"
                }).then((success) => {
                    dfd.resolve(success);
                });

                return dfd.promise;
            };
        }
    ]);
})();
