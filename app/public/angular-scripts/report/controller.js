  (() => {
      const controllers = angular.module("ReportControllers", []);

      controllers.controller("ReportController", ["$scope", "$mdDialog", ($scope, $mdDialog) => {

        $scope.months = [
          {'name':'January', 'value':'1'},
          {'name':'February','value':'2'},
          {'name':'March','value':'3'},
          {'name':'April','value':'4'},
          {'name':'May','value':'5'},
          {'name':'June','value':'6'},
          {'name':'July','value':'7'},
          {'name':'August','value':'8'},
          {'name':'September','value':'9'},
          {'name':'October','value':'10'},
          {'name':'November','value':'11'},
          {'name':'December','value':'12'},
        ];
        $scope.selectedMonth = $scope.months[0].value;
        $scope.years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];
        $scope.selectedYear = $scope.years[0];

      }]);

  })();
