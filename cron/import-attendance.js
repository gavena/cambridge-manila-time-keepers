const execFile = require('child_process').execFile;
const config = require('../bio.config.json');
const fs = require('fs');
const readline = require('readline');
const options = { cwd: config.dir+'/bin' };
const rawDtrService = require('../lib/raw-dtr');
const editableDtrService = require('../lib/editable-dtr');

var execExportAttendance = function(startDate, endDate) {
    var args2f = [config.devices[0].ip, config.devices[0].port, startDate, endDate];
    var filename2f = config.devices[0].ip + '-' + startDate + '-' + endDate + '.dat';
    execFile(config.exportAttendanceBat, args2f, options, (error, stdout, stderr) => {
        if (error) {
           throw error;
        }
        console.log('[2f] Begin ' + config.exportAttendanceBat + ' stdout:\n' + stdout);
        processAttendanceFile(config.dir.toString() + '/dat/' + filename2f)
    });

    var args3f = [config.devices[1].ip, config.devices[1].port, startDate, endDate];
    var filename3f = config.devices[1].ip + '-' + startDate + '-' + endDate + '.dat';
    execFile(config.exportAttendanceBat, args3f, options, (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        console.log('[3f] Begin ' + config.exportAttendanceBat + ' stdout:\n' + stdout);
        processAttendanceFile(config.dir.toString() + '/dat/' + filename3f)
    });
}

var processAttendanceFile = function(file) {
    var jsonStr = '{"doc":[]}';
    var result = JSON.parse(jsonStr);

    var lineReader = readline.createInterface({
        input: fs.createReadStream(file)
    });
    lineReader.on('line', function (line) {
        var data = line.split('\t');
        if(data.length>1) {
            var arr = result.doc;
            var exists = false;
            var workdayId = data[0];
            var date = new Date(data[1]);

            for (var e in arr) {
               if (workdayId === arr[e].workday_id) {
                   arr[e].entries.push(date);
                   exists = true;
                   break;
               }
            }
            if (!exists) {
                arr.push({
                    "workday_id":workdayId,
                    "year" : date.getFullYear(),
                    "month" : date.getMonth()+1,
                    "entries":[date]
                })
            }
        }
    });

    lineReader.on('close', function() {
        for (var e in result.doc) {
            rawDtrService.insertEntriesByIdAndMonth(result.doc[e]);
            editableDtrService.insertEntriesByIdAndMonth(result.doc[e]);
        }
    });

}

var tidyMonth = function(m) {
    return (++m>0&&m<10 ? '0'+m : m)
}

var CronJob = require('cron').CronJob;
var job = new CronJob({
    cronTime: config.cron,
    onTick: function() {
        var d = new Date();
        d.setDate(d.getDate() -1);
        var yesterday = '' + d.getFullYear() + tidyMonth(d.getMonth()) + d.getDate();
        console.log("cron running for: " + yesterday)
        execExportAttendance(yesterday,yesterday);
    },
    start: false
});
job.start();

console.log('Doing a manual test trigger: 20170101, 20170201');
execExportAttendance(20170101, 20170201);






