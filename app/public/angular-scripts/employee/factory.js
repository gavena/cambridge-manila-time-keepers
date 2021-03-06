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

        Employee.updateShift = (username, shiftId) => {
            return employeeService.updateShift(username, shiftId);
        };

        Employee.addSchedule = (username, scheduleId) => {
            return employeeService.addSchedule(username, scheduleId);
        };

        Employee.deleteSchedule = (username, scheduleId) => {
            return employeeService.deleteSchedule(username, scheduleId);
        };

        return Employee;
    }]);
})();
