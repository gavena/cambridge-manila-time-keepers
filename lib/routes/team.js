const employee = require('../../lib/employee');
let isLocal = '';

if (process.env.NODE_ENV.trim() == 'local') {
    isLocal = true;
} else {
    isLocal = false;
}

module.exports = (app) => {
    app.get('/team/listing', (req, res) => {
        console.log(" req.session.workday_id="+ req.session.workday_id);
          console.log(" req.session.username="+ req.session.username);
        return res.render('team/index', {
            page: 'Team',
            breadcrumbs: req.breadcrumbs(),
            isLocal: isLocal,
            username: req.session.username
          //  workdayId: '40001619'
          //   workdayId: req.session.workday_id

        });
    });


    app.get('/team/listing/:username', (req, res) => {
          employee.getByLineManagerUsername(req.params.username, (error, employees) => {
            if (error) {
                return res.send(error);
            }

            return res.send(employees);
        });
      });

      app.get('/team/list/:username', (req, res) => {
        //  console.log(" req.session.workday_id="+ req.session.workday_id);
          //  console.log(" req.session.username="+ req.session.username);
          return res.render('team/index', {
              page: 'Team',
              breadcrumbs: req.breadcrumbs(),
              isLocal: isLocal,
              usernamelogin: req.params.username
            //  workdayId: '40001619'
            //   workdayId: req.session.workday_id

          });
      });

  app.get('/team/listing/:workdayId', (req, res) => {
        employee.getByLineManagerWorkdayId(req.params.workdayId, (error, employees) => {
          if (error) {
              return res.send(error);
          }

          return res.send(employees);
      });
    });

/*
    app.get('/get-by-username/:username', (req, res) => {
        employee.getByUsername(req.params.username, (error, employee) => {
            if (error) {
                return res.send(error);
            }

            return res.send(employee);
        });
    });
    */
};
