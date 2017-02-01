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
                    $window.location = "/dtr-management/edit/" + scope.details.username + "/" + scope.details.month + "/" + scope.details.year;
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
                        if (scope.details.month > 0 && scope.details.month !== 1) {
                            scope.details.month = scope.details.month - 1;
                        } else {
                            scope.details.year = scope.details.year - 1;
                            scope.details.month = 12;
                        }
                        scope.details.description = Calendar.getMonthString(scope.details.month - 1) + " " + scope.details.year;
                        if (scope.details.month === scope.details.currentMonth &&
                            scope.details.year === scope.details.currentYear) {
                            DtrManagement.getByDtr({
                                username: scope.details.username,
                                month: String(scope.details.month),
                                year: String(scope.details.year)
                            }).then((response) => {
                                if (response.data.success) {
                                    if (typeof response.data.result !== 'undefined') {
                                        scope.currentDtr = true;
                                        scope.details.days = Calendar.getDays(scope.details.year, scope.details.month);
                                        scope.details.dtr = response.data.result.dates;
                                        scope.details = Calendar.formatDtr(scope.details);
                                        scope.hasData = true;
                                        scope.showButton = false;
                                    } else {
                                        scope.showButton = false;
                                        scope.hasData = false;
                                    }
                                }
                            });

                        } else {
                            DtrManagement.getApprovedDtrByMonthAndYear({
                                username: scope.details.username,
                                month: String(scope.details.month),
                                year: String(scope.details.year)
                            }).then((response) => {
                               scope.showButton = false;
                               if (response.data.success) {
                                   if (typeof response.data.result !== 'undefined') {
                                        scope.currentDtr  = false;
                                        scope.hasData = true;
                                        scope.showButton = false;

                                        if (scope.details.month === scope.details.currentMonth - 1 ){
                                            scope.showButton = !(response.data.result.status === 'APPROVED');
                                        }
                                        scope.details.days = Calendar.getDays(scope.details.year, scope.details.month);

                                        scope.details.dtr = response.data.result.changes;
                                        scope.details = Calendar.formatApprovedDtr(scope.details);

                                        scope.oldDtr.days = Calendar.getDays(scope.details.year, scope.details.month);
                                        scope.oldDtr.year = scope.details.year;
                                        scope.oldDtr.month = scope.details.month;
                                        scope.oldDtr.dtr = response.data.result.dates;
                                        scope.oldDtr = Calendar.formatDtr(scope.oldDtr);

                                    } else {
                                        scope.hasData = false;
                                    }
                                } else {
                                    scope.hasData = false;
                                }
                            });
                        }
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
                        if (scope.details.month < 12) {
                            scope.details.month = scope.details.month + 1;
                        } else {
                            scope.details.year = scope.details.year + 1;
                            scope.details.month = 1;
                        }

                        scope.details.description = Calendar.getMonthString(scope.details.month - 1) + " " + scope.details.year;
                        if (scope.details.month === scope.details.currentMonth  &&
                            scope.details.year === scope.details.currentYear) {
                            DtrManagement.getByDtr({
                                username: scope.details.username,
                                month: String(scope.details.month),
                                year: String(scope.details.year)
                            }).then((response) => {
                                if (response.data.success) {
                                  scope.showButton = false;
                                    if (typeof response.data.result !== 'undefined') {
                                        scope.showButton = false;
                                        scope.currentDtr = true;
                                        scope.details.days = Calendar.getDays(scope.details.year, scope.details.month);
                                        scope.details.dtr = response.data.result.dates;
                                        scope.details = Calendar.formatDtr(scope.details);
                                        scope.hasData = true;
                                    } else {
                                        scope.hasData = false;
                                    }
                                }

                            });
                        } else {
                            DtrManagement.getApprovedDtrByMonthAndYear({
                                username: scope.details.username,
                                month: String(scope.details.month),
                                year: String(scope.details.year)
                            }).then((response) => {
                                scope.showButton = false;
                                if (response.data.success) {
                                    if (typeof response.data.result !== 'undefined') {
                                      scope.hasData = true;
                                      if (scope.details.month === scope.details.currentMonth - 1 ){
                                        scope.showButton = !(response.data.result.status === 'APPROVED');
                                      }

                                      scope.details.days = Calendar.getDays(scope.details.year, scope.details.month);
                                      scope.details.dtr = response.data.result.changes;
                                      scope.details = Calendar.formatApprovedDtr(scope.details);

                                      scope.oldDtr.days = Calendar.getDays(scope.details.year, scope.details.month);
                                      scope.oldDtr.year = scope.details.year;
                                      scope.oldDtr.month = scope.details.month;
                                      scope.oldDtr.dtr = response.data.result.dates;
                                      scope.oldDtr = Calendar.formatDtr(scope.oldDtr);


                                    } else {
                                        scope.hasData = false;
                                    }
                                }
                            });
                        }
                        scope.$apply();
                    });
                }
            };
        }
    ]);
})();
