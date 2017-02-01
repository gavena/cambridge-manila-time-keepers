(() => {
    const directives = angular.module("DtrManagementDirectives", [
        "DtrManagementFactories",
        "CalendarFactories"
    ]);

    directives.directive('ngModel', function( $filter ) {
            return {
                require: '?ngModel',
                link: function(scope, elem, attr, ngModel) {
                    if( !ngModel )
                        return;
                    if( attr.type !== 'time' )
                        return;
                            
                    ngModel.$formatters.unshift(function(value) {
                        return value.replace(/:00\.000$/, '')
                    });
                }
            }   
        });   
    directives.directive("btnEditDtrAction", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = "/dtr-management/edit/" + scope.details.username + "/" + scope.details.year + "/" + scope.details.month;
                });
            }
        };
    });

    directives.directive("btnCancelDtrAction", ($window) => {
        return {
            restrict: "A",
            link: (scope, elem) => {
                elem.click(() => {
                    $window.location = "/my-dtr";
                });
            }
        };
    });


    directives.directive("btnSubmitDtrManagementAction", ($window) => {
      return {
          restrict: "A",
          link: (scope, elem) => {
              elem.click(() => {
                if(scope.details.isCertify){
                    scope.getSubmitDtr();
                    scope.$apply();
                } else {
                    alert("Kindly certify your DTR");
                }

              });
          }
      };
    });

    directives.directive("btnPreviousDtr", [
        "DtrManagement",
        "Calendar",
        (DtrManagement, Calendar) => {
            return {
                restrict: "A",
                link: (scope, elem) => {
                    elem.click(() => {
                        var previousMonth = Calendar.getPreviousMonth(scope.details.currentPageMonth);
                        scope.details.month = previousMonth.getMonth() + 1;  // add 1 to match the data on mongodb
                        scope.details.year = previousMonth.getFullYear();
                        scope.details.currentPageMonth = previousMonth;

                        scope.details.description = Calendar.getMonthYearString(previousMonth);

                        DtrManagement.getEditableDtr({
                            username: 'cemanalo',
                            month: String(scope.details.month),
                            year: String(scope.details.year)
                        }).then((response) => {
                          scope.showButton = false;

                            if (response.data.success && response.data.result) {
                              
                                var result = response.data.result;
                                console.log(response.data.result);
                                scope.currentDtr  = true;
                                scope.hasData = true;
                                scope.showButton = true;

                                scope.details.days = Calendar.getDays(scope.details.year, scope.details.month);
                                scope.details.dtr = result.convertedDates;
                                scope.details = Calendar.formatDtr(scope.details);
                                scope.details.totalWorkHours = Calendar.getHoursDisplay(result.total_work_hours);
                                scope.details.totalLwopHours = Calendar.getHoursDisplay(result.total_late + result.total_undertime);
                                scope.details.lateCount = result.late_count;
                                scope.details.undertimeCount = result.undertime_count;
                            } else {
                               scope.hasData = false;
                           }
                        });
                        scope.$apply();
                    });
                }
            };
        }
    ]);

    directives.directive("btnNextDtr", [
        "DtrManagement",
        "Calendar",
        (DtrManagement, Calendar) => {
            return {
                restrict: "A",
                link: (scope, elem) => {
                    elem.click(() => {
                        var nextMonth = Calendar.getNextMonth(scope.details.currentPageMonth);
                        scope.details.month = nextMonth.getMonth() + 1;  // add 1 to match the data on mongodb
                        scope.details.year = nextMonth.getFullYear();
                        scope.details.currentPageMonth = nextMonth;

                        scope.details.description = Calendar.getMonthYearString(nextMonth);

                        DtrManagement.getEditableDtr({
                            username: 'cemanalo',
                            month: String(scope.details.month),
                            year: String(scope.details.year)
                        }).then((response) => {
                          scope.showButton = false;

                            if (response.data.success && response.data.result) {
                              
                                var result = response.data.result;
                                console.log(response.data.result);
                                scope.currentDtr  = true;
                                scope.hasData = true;
                                scope.showButton = true;

                                scope.details.days = Calendar.getDays(scope.details.year, scope.details.month);
                                scope.details.dtr = result.convertedDates;
                                scope.details = Calendar.formatDtr(scope.details);
                                scope.details.totalWorkHours = Calendar.getHoursDisplay(result.total_work_hours);
                                scope.details.totalLwopHours = Calendar.getHoursDisplay(result.total_late + result.total_undertime);
                                scope.details.lateCount = result.late_count;
                                scope.details.undertimeCount = result.undertime_count;
                            } else {
                               scope.hasData = false;
                           }
                        });
                        scope.$apply();
                    });
                }
            };
        }
    ]);
})();
