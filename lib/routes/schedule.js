const schedules = require('../../lib/schedule');
let isLocal = '';

if (process.env.NODE_ENV.trim() == 'local') {
    isLocal = true;
} else {
    isLocal = false;
}

module.exports = (app) => {
    app.get('/schedule/listing', (req, res) => {
        req.breadcrumbs('Admin', '/admin');

        return res.render('schedule/index', {
            message: req.flash('message'),
            notify: req.flash('notify'),
            success: req.flash('success'),
            page: 'Schedule',
            breadcrumbs: req.breadcrumbs(),
            isLocal: isLocal
        });
    });

    app.get('/all-schedules/', (req, res) => {
        schedules.all((error, schedules) => {
            if (error) {
                return res.send(error);
            }

            return res.send(schedules);
        });
    });

    app.get('/schedule/create', (req, res) => {
        req.breadcrumbs('Admin', '/admin');
        req.breadcrumbs('Schedule', '/schedule/listing');

        return res.render('schedule/create', {
            breadcrumbs: req.breadcrumbs(),
            page: 'Create',
            isLocal: isLocal
        });
    });

    app.post('/schedule/create', (req, res) => {
        schedules.saveSchedule(req.body, (error, schedule) => {
            if (error !== null) {
                if (error.name === 'MongoError' && error.code === 11000) {
                    // Duplicate schedule name
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
            req.flash('message', 'Successfully created schedule!');
            req.flash('notify', true);
            return res.send({
                success: true,
                result: schedule
            });
        });
    });

    app.get('/schedule/delete', (req, res) => {
        return res.render('partials/dialog', {
            label: 'Delete Schedule Modal',
            name: 'delete-schedule-modal',
            message: 'Are you sure you want to delete this schedule?',
            action: 'Delete',
            actionUrl: '/delete-schedule',
            isLocal: isLocal
        })
    });

    app.post('/delete-schedule', (req, res) => {
        schedules.deleteSchedule(req.body.id, (error, schedule) => {
            if (error) {
                return res.send(error);
            }

            req.flash('success', true);
            req.flash('message', 'Successfully deleted schedule!')
            req.flash('notify', true);
            return res.redirect('/schedule/listing');
        });
    });

    app.get('/schedule/edit/:id', (req, res) => {
        req.breadcrumbs('Admin', '/admin');
        req.breadcrumbs('Schedule', '/schedule/listing');

        return res.render('schedule/edit', {
            breadcrumbs: req.breadcrumbs(),
            id: req.params.id,
            isLocal: isLocal
        });
    });

    app.get('/get-schedule-details/:id', (req, res) => {
        schedules.getById(req.params.id, (error, schedule) => {
            if (error) {
                return res.send(error);
            }

            return res.send(schedule);
        });
    });

    app.post('/schedule/update/', (req, res) => {
        schedules.findByIdAndUpdate(req.body, (error, schedule) => {
            if (error !== null) {
                if (error.name === 'MongoError' && error.code === 11000) {
                    // Duplicate schedule name
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
            req.flash('message', 'Successfully edited schedule!');
            req.flash('notify', true);
            return res.send({
                success: true,
                result: schedule
            });
        });
    });

    app.get('/schedule/view/:id', (req, res) => {
        req.breadcrumbs('Admin', '/admin');
        req.breadcrumbs('Schedule', '/schedule/listing');

        return res.render('schedule/view', {
            breadcrumbs: req.breadcrumbs(),
            message: req.flash('message'),
            notify: req.flash('notify'),
            success: req.flash('success'),
            id: req.params.id,
            isLocal: isLocal
        });
    });
}
