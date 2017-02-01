const persistenceProvider = require('../../persistence/provider');
const Employee = persistenceProvider.Employee;
const employees = {};

employees.all = (callback) => {
    Employee.find({}, (error, employees) => {
        if (error) {
            return callback(error);
        }

        return callback(null, employees);
    });
}

employees.getById = (id, callback) => {
    Employee.find({
        _id: id
    }, (error, employee) => {
        if (error) {
            return callback(error);
        }

        return callback(null, employee);
    });
}

employees.getByUsername = (username, callback) => {
    Employee.find({
        username: username
    }, (error, employee) => {
        if (error) {
            return callback(error);
        }

        return callback(null, employee);
    });
}

employees.saveEmployee = (bodyRequest, callback) => {
    const newEmployee = new Employee();
    console.log(bodyRequest);
    newEmployee.first_name = bodyRequest.firstName;
    newEmployee.middle_name = bodyRequest.middleName;
    newEmployee.last_name = bodyRequest.lastName;
    newEmployee.position = bodyRequest.position;
    newEmployee.line_manager = bodyRequest.manager;
    newEmployee.username = bodyRequest.username;
    newEmployee.department = bodyRequest.department;

    newEmployee.save((error, shift) => {
        if (error) {
            return callback(error);
        }

        return callback(null, shift);
    });

}

module.exports = employees;
