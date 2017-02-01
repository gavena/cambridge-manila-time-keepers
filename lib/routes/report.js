const report = require('../../lib/report');
let isLocal = '';

if (process.env.NODE_ENV.trim() == 'local') {
    isLocal = true;
} else {
    isLocal = false;
}

module.exports = (app) => {
    app.get('/report', (req, res) => {
        req.breadcrumbs('Admin', '/admin');

        return res.render('report/index', {
            page: 'Report',
            breadcrumbs: req.breadcrumbs(),
            isLocal: isLocal
        });
    });

    app.get('/report/download/:year/:month', (req, res) => {
        req.breadcrumbs('Admin', '/admin');
        report.generateReport(req, res);

    });
};
