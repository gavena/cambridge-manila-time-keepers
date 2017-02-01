(() => {
    const directives = angular.module("ReportDirectives", []);

    directives.directive("btnDownloadAction", ["$window", "$location", ($window, $location) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    //const x = '/report/download?year='+scope.selectedYear+'&month='+scope.selectedMonth;
                    $window.location = '/report/download?year='+scope.selectedYear+'&month='+scope.selectedMonth;
                });
            }
        };
    }]);

})();
