(() => {
    const services = angular.module("TeamServices", []);

    services.service("TeamService", [
        "$http",
        "$q",
        "$rootScope",
        "$window",
        function($http, $q, $rootScope, $window) {
            this.allTeamsMembers = (username) => {
                const dfd = $q.defer();
              //  console.log("workdayId service="+`${workdayId}`);

                $http({
                    "method": "GET",
                    "url": `/team/listing/${username}`
                }).then((success) => {
                    dfd.resolve(success);
                });

                return dfd.promise;
            };
        }
    ]);
})();
