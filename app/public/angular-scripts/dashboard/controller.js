  (() => {
      const controllers = angular.module("DashboardControllers", []);

      controllers.controller("DashboardController", ["$scope", ($scope) => {




        $scope.$watch("usertype", (newValue, oldValue) => {
            console.log("Always here="+newValue);
            //remove this when not in testing
            //

          if (newValue !== undefined) {
            $scope.links = [{
                "name": "My DTR",
                "url": "/my-dtr",
                "icon": "/images/svg/calendar.svg"
            }, {
                "name": "Team",
                "url": "/team/listing",
                "icon": "/images/svg/team.svg"
            }, {
                "name": "Admin",
                "url": "/admin",
                "icon": "/images/svg/admin.svg"
            }];
          }else
          //until here
             if (newValue=='E') {
               $scope.links = [{
                   "name": "My DTR",
                   "url": "/my-dtr",
                   "icon": "/images/svg/calendar.svg"
               }];

            }
            else if (newValue=='M' ) {
              //  console.log("Always hererrrrrrrrrrr="+newValue);
                $scope.links = [{
                    "name": "My DTR",
                    "url": "/my-dtr",
                    "icon": "/images/svg/calendar.svg"
                }, {
                    "name": "Team",
                    "url": "/team/listing",
                    "icon": "/images/svg/team.svg"
                }];


            }else if ( newValue=='A' ) {
              $scope.links = [{
                  "name": "My DTR",
                  "url": "/my-dtr",
                  "icon": "/images/svg/calendar.svg"
              }, {
                  "name": "Team",
                  "url": "/team/listing",
                  "icon": "/images/svg/team.svg"
              }, {
                  "name": "Admin",
                  "url": "/admin",
                  "icon": "/images/svg/admin.svg"
              }];

            }
        });



      }]);
  })();
