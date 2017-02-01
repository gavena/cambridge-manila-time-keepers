(() => {
    "use strict";
    const factories = angular.module("UserFactories", ["UserServices"]);

    factories.factory("User", ["UserService", (userService) => {
        const User = () => {

        }

        const createAttributes = {
            "firstName": "",
            "middleName": "",
            "lastName": "",
            "manager": "",
            "position": "",
            "username": "",
            "department": ""
        };

        User.getCreateForm = () => {
            return createAttributes;
        };

        User.create = (details) => {
            return userService.create(details);
        };

        User.allUsers = () => {
          return userService.allUsers();
        };

        return User;
    }]);
})();
