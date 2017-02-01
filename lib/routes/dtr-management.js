const dtr = require('../../lib/dtr');
const editableDtr = require('../../lib/editable-dtr');
let isLocal = '';

if (process.env.NODE_ENV.trim() == 'local') {
    isLocal = true;
} else {
    isLocal = false;
}

module.exports = (app) => {

    app.get('/dtr-management/edit/:username/:month/:year', (req, res) => {
        res.render('my-dtr/edit', {
            username: req.params.username,
            month: req.params.month,
            year: req.params.year,
            isLocal: isLocal
        });
    });

    app.get('/get-dtr/:username/:month/:year', (req, res) => {
        dtr.getByDtr(req.params, (error, details) => {
           if (error !== null) {
               if (error.name === 'MongoError' && error.code === 11000) {
                   return res.send({
                       succes: false,
                       result: 'Dtr does not exists!'
                   });
               }

               return res.send({
                   succes: false,
                   result: error.message
               });
           }
           
           return res.send({
               success: true,
               result: details[0]
           });
       });
   });

   app.get('/get-approved-dtr/:username/:month/:year', (req, res) => {
       editableDtr.getByDtr(req.params, (error, details) => {
          if (error !== null) {
              if (error.name === 'MongoError' && error.code === 11000) {
                  return res.send({
                      succes: false,
                      result: 'Dtr does not exists!'
                  });
              }

              return res.send({
                  succes: false,
                  result: error.message
              });
          }

          return res.send({
              success: true,
              result: details[0]
          });
      });
  });

  app.get('/submit-dtr', (req, res) => {
      res.render('partials/dialog', {
          label: 'Submit DTR Management Modal',
          name: 'submit-dtr-management-modal',
          message: 'Are you sure you want to submit this DTR?',
          action: 'Submit',
          actionUrl: '/submit-current-dtr',
          isLocal: isLocal
      })
  });

  app.post('/submit-current-dtr', (req, res) => {
      editableDtr.submit(req.body.id, (error, schedule) => {
          if (error) {
              return res.send(error);
          }

          req.flash('success', true);
          req.flash('message', 'Dtr submitted successfully!')
          req.flash('notify', true);

          return res.redirect('/my-dtr');
      });
  });



    app.post('/dtr/approve/', (req, res) => {
        editableDtr.approve(req.body, (error, details) => {
            if (error !== null) {
                if (error.name === 'MongoError' && error.code === 11000) {
                    return res.send({
                        success: false,
                        result: 'Problem on approving the dtr!'
                    });
                }

                return res.send({
                    success: false,
                    result: error.message
                });
            }

            req.flash('success', true);
            req.flash('message', 'Successfully approved the dtr!');
            req.flash('notify', true);

            return res.send({
                success: true,
                result: details
            });
        });
    });

    app.post('/dtr/return/', (req, res) => {
        editableDtr.return(req.body, (error, details) => {
            if (error !== null) {
                if (error.name === 'MongoError' && error.code === 11000) {
                    return res.send({
                        success: false,
                        result: 'Problem on returning the dtr!'
                    });
                }

                return res.send({
                    success: false,
                    result: error.message
                });
            }

            req.flash('success', true);
            req.flash('message', 'Successfully returned the dtr!');
            req.flash('notify', true);

            return res.send({
                success: true,
                result: details
            });
        });
    });




  app.post('/dtr-management/update/', (req, res) => {
      editableDtr.update(req.body, (error, details) => {
          if (error !== null) {
              if (error.name === 'MongoError' && error.code === 11000) {
                  return res.send({
                      success: false,
                      result: 'Problem on updating the dtr!'
                  });
              }

              return res.send({
                  success: false,
                  result: error.message
              });
          }

          req.flash('success', true);
          req.flash('message', 'Successfully updated your dtr!');
          req.flash('notify', true);

          return res.send({
              success: true,
              result: details
          });
      });
  });

  app.post('/raw-to-editable/:workdayId/:year/:month', (req, res) =>{
    console.log('raw-to-editable');
    editableDtr.convert(req.params, (error, details) => {
      if(error !== null) {
        return res.send({
                  success: false,
                  result: error.message
              });
      } 
      return res.send({
        success : true,
        result : details
      })
    });
  });

  app.get('/editable-dtr/:username/:year/:month', (req, res) =>{
    console.log('editable-dtr');
    editableDtr.getDtr(req.params, (error, details) => {
      if(error !== null) {
        return res.send({
                  success: false,
                  result: error.message
              });
      } 
      return res.send({
        success : true,
        result : details
      })
    });
  });
}
