(() => {
    const factories = angular.module("EmployeeFactories", ["EmployeeServices"]);

    factories.factory("Employee", ["EmployeeService", (employeeService) => {
        const Employee = () => {

        }

        Employee.getByUsername = (username) => {
            return employeeService.getByUsername(username);
        };

        Employee.getByWorkdayID = (workdayId) => {
            return employeeService.getByWorkdayID(workdayId);
        };

        return Employee;
    }]);
})();