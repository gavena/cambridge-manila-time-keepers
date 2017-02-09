  (() => {
      const controllers = angular.module("ToolbarControllers", []);

      controllers.controller("ToolbarController", ["$scope", "$window", "$interval", "$mdSidenav", ($scope, $window, $interval, $mdSidenav) => {
          $scope.openMenu = ($mdOpenMenu, ev) => {
              $mdOpenMenu(ev);
          };
          console.log("Always here=");

//var $scope.links;

          $scope.$watch("usertype", (newValue, oldValue) => {
              console.log("Always here="+newValue);
              //remove this when not in testing

            if (newValue !== undefined) {
              $scope.links = [{
                  "name": "My DTR",
                  "url": "/my-dtr",
                  "children": null
              }, {
                  "name": "Team",
                  "url": "/team/listing",
                  "children": null
              }, {
                  "name": "Admin",
                  "url": null,
                  "children": [{
                      "name": "Shift",
                      "url": "/shift/listing"
                  }, {
                      "name": "Schedule",
                      "url": "/schedule/listing"
                  }, {
                      "name": "User",
                      "url": "/user"
                  }, {
                      "name": "Report",
                      "url": "/report"
                  }]
              }];
            }else

            //until here
               if (newValue=='E') {
                $scope.links = [{
                    "name": "My DTR",
                    "url": "/my-dtr",
                    "children": null
                }];

              }
              else if (newValue=='M' ) {
                  console.log("Always hererrrrrrrrrrr="+newValue);
                $scope.links = [{
                    "name": "My DTR",
                    "url": "/my-dtr",
                    "children": null
                }, {
                    "name": "Team",
                    "url": "/team/listing",
                    "children": null
                }, {
                    "name": "Admin",
                    "url": null,
                    "children": [{
                        "name": "Shift",
                        "url": "/shift/listing"
                    }, {
                        "name": "Schedule",
                        "url": "/schedule/listing"
                    }]
                }];


              }else if ( newValue=='A' ) {
                $scope.links = [{
                    "name": "My DTR",
                    "url": "/my-dtr",
                    "children": null
                }, {
                    "name": "Team",
                    "url": "/team/listing",
                    "children": null
                }, {
                    "name": "Admin",
                    "url": null,
                    "children": [{
                        "name": "Shift",
                        "url": "/shift/listing"
                    }, {
                        "name": "Schedule",
                        "url": "/schedule/listing"
                    }, {
                        "name": "User",
                        "url": "/user"
                    }, {
                        "name": "Report",
                        "url": "/report"
                    }]
                }];


              }
          });

          const buildToggler = (componentId) => {
              return () => {
                  $mdSidenav(componentId).toggle();
              }
          }

          $scope.toggleLeft = buildToggler("left");
      }]);
  })();
