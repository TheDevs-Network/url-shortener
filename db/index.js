'use strict';

const MINIMUM_ID_LENGTH = 1;

const Datastore = require('nedb-promise');

const createAdder = require('./add');
const createFinder = require('./find');
const createIDGenerator = require('./id');
const hash = require('./hash');

const db = new Datastore({
	autoload: true,
	filename: 'links.db'
});

db.ensureIndex({
	fieldName: 'url',
	unique: true
});

module.exports = {
	add: createAdder({
		createID: createIDGenerator({
			db,
			hash,
			logger: console,
			minLength: MINIMUM_ID_LENGTH
		}),
		db,
		hash
	}),
	find: createFinder({ db })
};