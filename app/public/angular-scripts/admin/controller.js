  (() => {
      const controllers = angular.module("AdminControllers", []);


      controllers.controller("AdminController", ["$scope", ($scope) => {

  $scope.$watch("usertype", (newValue, oldValue) => {
    //remove this when not in testing
    //

  if (newValue !== undefined) {
          $scope.links = [{
              "name": "Shift",
              "url": "/shift/listing",
              "icon": "/images/svg/shift.svg"
          }, {
              "name": "Schedule",
              "url": "/schedule/listing",
              "icon": "/images/svg/schedule.svg"
          }, {
              "name": "User",
              "url": "/user",
              "icon": "/images/svg/user.svg"
          }, {
              "name": "Report",
              "url": "/report",
              "icon": "/images/svg/report.svg"
          }];  }else
            //until here

                if (newValue=='M' ) {
                //  console.log("Always hererrrrrrrrrrr="+newValue);
                  $scope.links = [{
                      "name": "Shift",
                      "url": "/shift/listing",
                      "icon": "/images/svg/shift.svg"
                  }, {
                      "name": "Schedule",
                      "url": "/schedule/listing",
                      "icon": "/images/svg/schedule.svg"
                  }];


              }else if ( newValue=='A' ) {
                $scope.links = [{
                    "name": "Shift",
                    "url": "/shift/listing",
                    "icon": "/images/svg/shift.svg"
                }, {
                    "name": "Schedule",
                    "url": "/schedule/listing",
                    "icon": "/images/svg/schedule.svg"
                }, {
                    "name": "User",
                    "url": "/user",
                    "icon": "/images/svg/user.svg"
                }, {
                    "name": "Report",
                    "url": "/report",
                    "icon": "/images/svg/report.svg"
                }];

              }


    });







      }]);
  })();
