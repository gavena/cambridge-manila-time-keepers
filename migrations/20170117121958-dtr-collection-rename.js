'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.renameCollection("dtrs", "raw_dtrs");
  db.renameCollection("approved_dtrs", "editable_dtrs");
  callback();
};

exports.down = function(db, callback) {
	db.renameCollection("raw_dtrs", "dtrs");
	db.renameCollection("editable_dtrs", "approved_dtrs");
	callback();
};

exports._meta = {
  "version": 1
};
