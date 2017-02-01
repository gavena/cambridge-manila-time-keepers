let isLocal = '';

if (process.env.NODE_ENV.trim() == 'local') {
    isLocal = true;
} else {
    isLocal = false;
}

module.exports = (app) => {

  app.use(function(req, res, next){

    if (req.session.userName ) {
        console.log('eesssssssee='+ req.session.userName+"++++++req.session.workdayId="+req.session.workdayId);
        console.log("++++++++++++req.session.employeeDetails.shift="+req.session.employeeDetails.shift);
        res.locals.usernamelogin = req.session.userName;
        res.locals.usernameloginfortoolbar = req.session.userName;
        res.locals.workdayIdlogin = req.session.workdayId;
        res.locals.employeeDetails =  req.session.employeeDetails;
     }
    next();
  });

   app.all('*', function (req, res, next) {
      console.log('Accessing the all section ...='+req.path);
      console.log(req.headers);
      if (req.headers.admin != 'admin' && !req.session.userName && req.path != '/login') {
        console.log('eeee='+ req.session.userName);
        //not yet login, send it to login page
        return res.render('', {
            //controller: 'DashboardController',
            breadcrumbs: req.breadcrumbs(),
            page: 'Index',
            isLocal: isLocal
        });
      } else{
        console.log('with session='+ req.session.userName);
      }
      next() // pass control to the next handler
    });

    app.get('/', (req, res) => {
        if (!req.session.userName ) {
          return res.render('', {
              //controller: 'DashboardController',
              breadcrumbs: req.breadcrumbs(),
              page: 'Index',
              isLocal: isLocal
          });
      }
    });
    app.get('/logout', (req, res) => {

      if (req.session.userName ) {
          console.log('logging out and clearing seeion'+ req.session.userName+"++++++req.session.workdayId="+req.session.workdayId);
          res.locals.usernamelogin =null;
          res.locals.usernameloginfortoolbar = null;
          res.locals.workdayIdlogin =null;
          req.session.userName=null;
          req.session.workdayId=null;

       }


          return res.render('', {
              //controller: 'DashboardController',
              breadcrumbs: req.breadcrumbs(),
              page: 'Index',
              isLocal: isLocal
          });

    });

    app.get('/home', (req, res) => {
        return res.render('partials/dashboard', {
            controller: 'DashboardController',
            breadcrumbs: req.breadcrumbs(),
            page: 'Home',
            username: req.query.username,
            isLocal: isLocal
        });
    });

    app.get('/admin', (req, res) => {
        return res.render('partials/dashboard', {
            controller: 'AdminController',
            page: 'Admin',
            breadcrumbs: req.breadcrumbs(),
            isLocal: isLocal
        });
    });

    app.get('/my-dtr', (req, res) => {
        return res.render('my-dtr/index', {
            isLocal: isLocal,
            message: req.flash('message'),
            notify: req.flash('notify'),
            success: req.flash('success')
        });
    });

    app.get('/weekly-table', (req, res) => {
        return res.render('partials/weekly', {
            isLocal: isLocal
        });
    });

    app.get('/monthly-table', (req, res) => {
        return res.render('partials/monthly', {
            isLocal: isLocal
        });
    });

    app.get('/view-weekly-table', (req, res) => {
        return res.render('partials/view-weekly', {
            isLocal: isLocal
        });
    });

    app.get('/view-monthly-table', (req, res) => {
        return res.render('partials/view-monthly', {
            isLocal: isLocal
        });
    });
};
