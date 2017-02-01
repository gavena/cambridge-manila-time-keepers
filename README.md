# cambridge-manila-time-keepers

Setup project

run git clone https://gitlab.com/jamfrigillana/cambridge-manila-time-keepers.git

go to cambridge-manila-time-keepers

run npm install

run npm install -g db-migrate

run npm install -g nodemon

run Set NODE_ENV=local

run db-migrate up -local

set NODE_ENV=local && nodemon

RDP details

rdp to : 10.240.60.207

user : DTR01-VMW-PHL-DEV\Developer

password : pa$$w0rd

http://10.240.60.207:5000/



Scripts
set NODE_ENV=local && nodemon == explicitly run application stripping the use -strict

npm run start-local - run server and set NODE_ENV to local

npm run start-dev - run server and set NODE_ENV to dev

npm run start-prod - run server and set NODE_ENV to prod

npm run babel - transpile es6 codes to es5

npm run babel-watch - watch changes of es6 codes and automatically compiles new codes to es5

gulp build - minification of scripts, css and images



DB migration scripts

db-migrate create filename --env local = create script for local env

db-migrate create allEmployee --env local

db-migrate up --env local = run scripts

db-migrate down --env local = rollback scripts


Git commands

git fetch origin

git pull origin - Get changes from remote origin repository

git add filepath - Add the file to staging

git commit -m "comment" - Commit changes in staging with a comment

git push origin - Push changes to remote origin repository


Edong :notes:
1. for access control
1. remove the codes in admin/controller.js , dashboard/controller.js, toolbar/controller.js
	  //remove this when not in testing
2. AD login, is defaulted to bypass, to make it work uncomment the codes in /routes/user.js
/*if (err) {
           console.log('ERROR: '+JSON.stringify(err));
           return res.send({
               success: false,
               result: 'Authentication failed!'
           });
         }

         if (auth) {
         */
