(() => {
    const directives = angular.module("ReportDirectives", []);

    directives.directive("btnDownloadAction", ["$window", "$location", ($window, $location) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = '/report/download/'+scope.selectedYear+'/'+scope.selectedMonth;
                });
            }
        };
    }]);

})();
