const employee = require('../../lib/employee');


//var ad = new ActiveDirectory(config);


let isLocal = '';

if (process.env.NODE_ENV.trim() == 'local') {
    isLocal = true;
} else {
    isLocal = false;
}

module.exports = (app) => {




    app.get('/employee/:username', (req, res) => {
        req.breadcrumbs('Team', '/team/listing');

        return res.render('employee/index', {
            breadcrumbs: req.breadcrumbs(),
            isLocal: isLocal,
            username: req.params.username,
            workdayId: req.params.workdayId  ,
            message: req.flash('message'),
            notify: req.flash('notify'),
            success: req.flash('success')
        });
    });

    app.get('/employee/:workdayId', (req, res) => {
        req.breadcrumbs('Team', '/team/listing');

        return res.render('employee/index', {
            breadcrumbs: req.breadcrumbs(),
            isLocal: isLocal,
            username: req.params.username  ,
            workdayId: req.params.workdayId  ,
            message: req.flash('message'),
            notify: req.flash('notify'),
            success: req.flash('success')
        });
    });


    app.get('/get-by-username/:username', (req, res) => {
        employee.getByUsername(req.params.username, (error, employee) => {
            if (error) {
                return res.send(error);
            }

            return res.send(employee);
        });
    });


    app.get('/get-by-workdayId/:workdayId', (req, res) => {
        employee.getByWorkdayId(req.params.workdayId, (error, employee) => {
            if (error) {
                return res.send(error);
            }

            return res.send(employee);
        });
    });
    app.get('/all-users/', (req, res) => {
        employee.all((error, users) => {
            if (error) {
                return res.send(error);
            }

            return res.send(users);
        });
    });

    app.post('/user/create', (req, res) => {
        employee.saveEmployee(req.body, (error, employee) => {
            if (error !== null) {
                if (error.name === 'MongoError' && error.code === 11000) {
                    // Duplicate employee name
                    return res.send({
                        success: false,
                        result: 'Name already taken!'
                    });
                }

                return res.send({
                    success: false,
                    result: error.message
                });
            }

            req.flash('success', true);
            req.flash('message', 'Successfully created employee!');
            req.flash('notify', true);
            return res.send({
                success: true,
                result: employee
            });
        });
    });

    app.post('/employee/shift/update/:username/:shiftid', (req, res) => {
      console.log("req.params.username"+req.params.username+"  "+req.params.shiftid);
        employee.findByUsernameAndUpdate(req.params.username,req.params.shiftid, (error, shift) => {
            if (error !== null) {
                if (error.name === 'MongoError' && error.code === 11000) {
                    // Duplicate shift name
                    return res.send({
                        success: false,
                        result: 'Name already taken!'
                    });
                }

                return res.send({
                    success: false,
                    result: error.message
                });
            }

            req.flash('success', true);
            req.flash('message', 'Successfully edited shift!');
            req.flash('notify', true);
            return res.send({
                success: true,
                result: shift
            });
        });
    });


}
