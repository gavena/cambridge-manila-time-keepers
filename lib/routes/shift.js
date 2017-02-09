const shifts = require('../../lib/shift');
let isLocal = '';

if (process.env.NODE_ENV.trim() == 'local') {
    isLocal = true;
} else {
    isLocal = false;
}

module.exports = (app) => {
    app.get('/shift/listing', (req, res) => {
        req.breadcrumbs('Admin', '/admin');

        return res.render('shift/index', {
            message: req.flash('message'),
            notify: req.flash('notify'),
            success: req.flash('success'),
            page: 'Shift',
            breadcrumbs: req.breadcrumbs(),
            isLocal: isLocal
        });
    });

    app.get('/all-shifts/', (req, res) => {
        shifts.all((error, shifts) => {
            if (error) {
                return res.send(error);
            }

            return res.send(shifts);
        });
    });

    app.get('/shift/create', (req, res) => {
        req.breadcrumbs('Admin', '/admin');
        req.breadcrumbs('Shift', '/shift/listing');

        return res.render('shift/create', {
            breadcrumbs: req.breadcrumbs(),
            page: 'Create',
            isLocal: isLocal
        });
    });

    app.post('/shift/create', (req, res) => {
        shifts.saveShift(req.body, (error, shift) => {
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
            req.flash('message', 'Successfully created shift!');
            req.flash('notify', true);
            return res.send({
                success: true,
                result: shift
            });
        });
    });

    app.get('/shift/delete', (req, res) => {
        return res.render('partials/dialog', {
            label: 'Delete Shift Modal',
            name: 'delete-shift-modal',
            message: 'Are you sure you want to delete this shift?',
            action: 'Delete',
            actionUrl: '/delete-shift',
            isLocal: isLocal
        })
    });

    app.post('/delete-shift', (req, res) => {
        shifts.deleteShift(req.body.id, (error, shift) => {
            if (error) {
                return res.send(error);
            }

            req.flash('success', true);
            req.flash('message', 'Successfully deleted shift!')
            req.flash('notify', true);
            return res.redirect('/shift/listing');
        });
    });

    app.get('/shift/edit/:id', (req, res) => {
        req.breadcrumbs('Admin', '/admin');
        req.breadcrumbs('Shift', '/shift/listing');

        return res.render('shift/edit', {
            id: req.params.id,
            breadcrumbs: req.breadcrumbs(),
            isLocal: isLocal
        });
    });

    app.get('/get-shift-details/:id', (req, res) => {
        shifts.getById(req.params.id, (error, shift) => {
            if (error) {
                return res.send(error);
            }

            return res.send(shift);
        });
    });

    app.post('/shift/update/', (req, res) => {
        shifts.findByIdAndUpdate(req.body, (error, shift) => {
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


  

};
