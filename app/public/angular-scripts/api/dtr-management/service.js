(() => {
    const services = angular.module("DtrManagementServices", []);

    services.service("DtrManagementService", [
        "$http",
        "$q",
        "$rootScope",
        "$window",
        function($http, $q, $rootScope, $window) {

            this.getEditableDtr = (data) => {
                const dfd = $q.defer();
                $http({
                    "method": "GET",
                    "url": `/editable-dtr/${data.username}/${data.year}/${data.month}`,
                    "data": data
                }).then((success) => {
                    dfd.resolve(success);
                });
                return dfd.promise;
            };

            this.getByDtr = (data) => {
                const dfd = $q.defer();
                $http({
                    "method": "GET",
                    "url": `/get-dtr/${data.username}/${data.month}/${data.year}`,
                    "data": data
                }).then((success) => {
                    dfd.resolve(success);
                });
                return dfd.promise;
            };

            this.getApprovedDtrByMonthAndYear = (data) => {
                const dfd = $q.defer();
                $http({
                    "method": "GET",
                    "url": `/get-approved-dtr/${data.username}/${data.month}/${data.year}`,
                    "data": data
                }).then((success) => {
                    dfd.resolve(success);
                });
                return dfd.promise;
            };


            this.edit = (data) => {
                const dfd = $q.defer();
                $http({
                     "method": "POST",
                     "url": "/dtr-management/update/",
                     "data": data
                }).then((success) => {
                    dfd.resolve(success);
                });
                return dfd.promise;
            };

            this.approve = (data) => {
                const dfd = $q.defer();
                $http({
                     "method": "POST",
                     "url": "/dtr/approve/",
                     "data": data
                }).then((success) => {
                    dfd.resolve(success);
                });
                return dfd.promise;
            };

            this.return = (data) => {
                const dfd = $q.defer();
                $http({
                     "method": "POST",
                     "url": "/dtr/return/",
                     "data": data
                }).then((success) => {
                    dfd.resolve(success);
                });
                return dfd.promise;
            };
        }
    ]);
})();
