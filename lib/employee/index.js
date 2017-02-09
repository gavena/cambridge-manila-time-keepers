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

employees.getByLineManagerWorkdayId = (id, callback) => {
    Employee.find({
        lm_workday_id: id
    }, (error, employees) => {
        if (error) {
            return callback(error);
        }

        return callback(null, employees);
    });
}

employees.getByLineManagerUsername = (id, callback) => {
    Employee.find({
        lm_username: id
    }, (error, employees) => {
        if (error) {
            return callback(error);
        }

        return callback(null, employees);
    });
}

employees.getByWorkdayId = (id, callback) => {
    Employee.find({
        workday_id: id
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
    newEmployee.line_manager = bodyRequest.line_manager;
    newEmployee.username = bodyRequest.username;
    newEmployee.department = bodyRequest.department;
    newEmployee.usertype = bodyRequest.usertype;
    newEmployee.workday_id = bodyRequest.workday_id;
    newEmployee.lm_username  =bodyRequest.lm_username;
    newEmployee.workday_id  ="" ; //bodyRequest.lm_username;
    newEmployee.shift  ="default";

    newEmployee.save((error, shift) => {
        if (error) {
            return callback(error);
        }

        return callback(null, shift);
    });

}

employees.findByUsernameAndUpdate = (username1, shift1 ,callback) => {

      console.log("scope.form.username SUCESSS fdfdfdfdfd="+shift1);
    //Employee.findOneAndUpdate(details._id, details, (error, schedule) => {
        Employee.findOneAndUpdate(
          { username: username1},
          { $set: { shift: shift1 } },
          { new: true }, (error, doc)=> {
        if (error) {
            return callback(error);
        }

        return callback(null, doc);
    });
}

/*employees.getDetails = (username, callback) => {
  employee.getByUsername(usernameSplit, (error, employee) => {
      console.log('employee[ddddd] ERRORORO!=');
      if (error) {
         console.log('employee[] ERRORORO!='+req.session.employee);
      }
      console.log('employee[] ERRORORO!='+employee[0].workday_id);
      return callback(null, employee);
}
*/

/* employees.getDetail = (username)  {
  Employee.find({
      username: username
  }, (error, employee) => {
      if (error) {
          return error;
      }

      return employee;
  });
     console.log('employee[getDetails  ');
}*/

module.exports = employees;
