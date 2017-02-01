var employee = require('../../lib/employee');
var ActiveDirectory = require('activedirectory');
var config = { url: 'ldap://ad-phl-1.ad.cambridge.org',
               pool:'com.sun.jndi.ldap.connect.pool',
               baseDN: 'dc=domain,dc=com',
               username: 'svc_subversion',
               password: 'hPgNV&6PqrV+N?$u' }


let isLocal = '';

if (process.env.NODE_ENV.trim() == 'local') {
    isLocal = true;
} else {
    isLocal = false;
}

module.exports = (app) => {
    app.get('/user', (req, res) => {
        req.breadcrumbs('Admin', '/admin');

        return res.render('user/index', {
            message: req.flash('message'),
            notify: req.flash('notify'),
            success: req.flash('success'),
            page: 'User',
            breadcrumbs: req.breadcrumbs(),
            isLocal: isLocal
        });
    });

    app.get('/delete-administrator', (req, res) => {
        res.render('partials/dialog', {
            label: 'Delete Administrator Modal',
            name: 'delete-administrator-modal',
            message: 'Are you sure you want to delete this administrator?',
            action: 'Delete',
            isLocal: isLocal
        })
    });

    app.get('/add-administrator', (req, res) => {
        res.render('partials/dialog', {
            label: 'Add Administrator Modal',
            name: 'add-administrator-modal',
            message: 'Are you sure you want to add this user as an administrator?',
            action: 'Add',
            isLocal: isLocal
        })
    });

    app.get('/user/create', (req, res) => {
        req.breadcrumbs('Admin', '/admin');
        req.breadcrumbs('User', '/user');

        return res.render('user/create', {
            breadcrumbs: req.breadcrumbs(),
            page: 'Create',
            isLocal: isLocal
        });
    });

    app.post('/login', (req, res) => {

      var ad = new ActiveDirectory(config);

      var username=req.body.username;
      var password=req.body.password;

       ad.authenticate(username, password, function(err, auth) {
         /*if (err) {
           console.log('ERROR: '+JSON.stringify(err));
           return res.send({
               success: false,
               result: 'Authentication failed!'
           });
         }

         if (auth) {
         */
         if(true){  //remove this if you uncomment the above codes to make AD work
               var usernameSplit=username.split("@",1);
               console.log('Authenticated!='+usernameSplit);
                req.session.userName = usernameSplit ;

              employee.getByUsername(usernameSplit, (error, employee) => {
                  if (error) {
                      console.log('employee[] ERRORORO!='+req.session.employee);
                   }
                    req.session.workdayId = employee[0].workday_id ;
                    req.session.employeeDetails = employee[0] ;
                   //console.log('++++++++++++++++req.session.workday_id =: ====="'+req.session.workdayId   );
                   return res.send({
                       success: true,
                       result: 'Authenticated!',
                       user: usernameSplit
                   });
               });
         }
         else {
           console.log('Authentication failed!');
         }
       });


     });


};
