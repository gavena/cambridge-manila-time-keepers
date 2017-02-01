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
            "username": "",
            "workday_id":"",
            "usertype":"",
            "department": "",
            "lm_username": "",
            "position": ""  ,
            "line_manager":""

        };

        User.getCreateForm = () => {
            console.log("createAttributes="+createAttributes);
            return createAttributes;
        };

        User.create = (details) => {
          console.log("details="+details);
            return userService.create(details);
        };

        User.allUsers = () => {
          return userService.allUsers();
        };

        User.authenticate = (userData) => {
            return userService.authenticate(userData);
        };

        return User;
    }]);
})();
