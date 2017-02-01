(() => {
  "use strict";
    const controllers = angular.module("CreateUserControllers", ["UserFactories"]);

    controllers.controller("CreateUserController", [
        "$scope",
        "$q",
        "$timeout",
        "$mdDialog",
        "User",
        ($scope, $q, $timeout, $mdDialog, User) => {
            $scope.existing = false;

            $scope.message = "";

            $scope.form = User.getCreateForm();

            $scope.positions = [
                "Junior Software Quality Analyst",
                "Software Quality Analyst",
                "Senior Software Quality Analyst",
                "Junior Software Engineer",
                "Software Engineer",
                "Senior Software Engineer",
                "Associate Project Delivery Manager",
                "Project Delivery Manager"
            ];

            $scope.departments = [
                "Academic Development"
            ];

            $scope.usertypes = [
              { "type": "M",
                  "description": "Manager"
              },
              { "type": "A",
                    "description": "Admin"
              },
              { "type": "E",
                    "description": "Employee"
              }
                //"A","E","M"
            ];

            $scope.users = [];

            const querySearch = (query) => {
                $scope.searchText = query;
                let results = query ? $scope.users.filter(createFilterFor(query)) : $scope.users;
                let deferred = $q.defer();
                $timeout(function() {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            }

            User.allUsers().then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    response.data.forEach((user) => {
                        $scope.users.push({
                            "id": user._id,
                            "username": user.username,
                            "name": `${user.first_name} ${user.last_name}`.toLowerCase(),
                            "display": `${user.first_name} ${user.last_name}`
                        });
                    });
                }
            });

            const createFilterFor = (query) => {
                let lowercaseQuery = angular.lowercase(query);

                return function filterFn(user) {
                    return (user.name.indexOf(lowercaseQuery) === 0);
                };

            }
            $scope.selectedItem = null;
            $scope.searchText = null;
            $scope.querySearch = querySearch;
        }
    ]);
})();
