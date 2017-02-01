const nodeExcel = require('excel-export');
const approvedDtr = require('../../lib/approved-dtr');
const report = {};

report.generateReport = (req, res) => {
  var year= req.param('year');
  var month= req.param('month');
  var conf ={};
  conf.stylesXmlFile = "styles.xml";
  conf.name = "mysheet";
  conf.cols = [
              {
		              caption:'NAME',
                  type:'string',
                  beforeCellWrite:function(row, cellData){
			                 return cellData.toUpperCase();
		              }
	             },
               {
             		  caption:'POSITION',
                  type:'string',
                  beforeCellWrite:function(row, cellData){
             			    return cellData.toUpperCase();
             		  },
              },
              {
		              caption:'Total Work Hours',
                  type:'number'
              },
              {
		              caption:'Overtime (Hours) (Weekdays)',
                  type:'number'
              },
              {
		              caption:'Overtime (Hours) Weekends',
                  type:'number'
              },
              {
		              caption:'Regular Holiday (Hours)',
                  type:'number'
              },
              {
		              caption:'Special Holiday (Hours)',
                  type:'number'
              },
              {
		              caption:'Night Differentials (Hours)',
                  type:'number'
              },
              {
		              caption:'LWOP  (Hours)',
                  type:'number'
              },
              {
		              caption:'Tardiness  (Hours)',
                  type:'number'
              }
              ];

      conf.rows = [];

      approvedDtr.getByYearAndMonth(year, month, (error, details) => {
         if (error !== null) {
             if (error.name === 'MongoError' && error.code === 11000) {
                 return res.send({
                     success: false,
                     result: 'Dtr does not exists!'
                 });
             }

             return res.send({
                 success: false,
                 result: error.message
             });
         }

         for(x in details) {
          var temp = [
                        details[x].username,
                        'N/A',
                        details[x].total_work_hours,
                        details[x].overtime_weekdays,
                        details[x].overtime_weekdays,
                        details[x].regular_holiday,
                        details[x].special_holiday,
                        details[x].night_differentials,
                        details[x].lwop_hours,
                        details[x].tardiness_hours
                      ];
            console.log(temp);
            conf.rows.push(temp);
        }

        var result = nodeExcel.execute(conf);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=Report.xlsx");
        res.end(result, 'binary');

     });
}

module.exports = report;
