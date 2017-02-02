const express = require('express');
const app = express();
const http = require('http').Server(app);
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const hbsutils = require('hbs-utils')(hbs);
const routes = require('./lib/routes');
const shiftsRoutes = require('./lib/routes/shift');
const dtrManagemenRoutes = require('./lib/routes/dtr-management');
const schedulesRoutes = require('./lib/routes/schedule');
const usersRoutes = require('./lib/routes/user');
const employeeRoutes = require('./lib/routes/employee');
const teamRoutes = require('./lib/routes/team');
const reportRoutes = require('./lib/routes/report');
const MongoStore = require('connect-mongo')(expressSession);
const mongocon = require('./persistence/mongocon');
const flash = require('connect-flash');
const handlebarsIntl = require('handlebars-intl');
const path = require('path');
const breadcrumbs = require('express-breadcrumbs');

app.use(breadcrumbs.init());
app.use(breadcrumbs.setHome());
app.use('/', breadcrumbs.setHome({
    name: 'Home',
    url: '/home', 
}));

/*app.use(expressSession({
    secret: 'session',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        url: mongocon.connection
    })
}));c
*/
app.use(cookieParser());
app.use(expressSession({secret:'session',saveUninitialized: true,resave: true,}));


app.use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json());
app.use(flash());

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/dist', express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/app/public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/app/views'));
hbsutils.registerPartials(__dirname + '/app/views/partials');
hbsutils.registerWatchedPartials(__dirname + '/app/views/partials');
handlebarsIntl.registerWith(hbs);


routes(app);
shiftsRoutes(app);
schedulesRoutes(app);
usersRoutes(app);
dtrManagemenRoutes(app);
employeeRoutes(app);
teamRoutes(app);
reportRoutes(app);

http.listen(5000, function() {
    console.log('listen 5000');
});
