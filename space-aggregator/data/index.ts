import { NSR_Enhet, NSR_School, School } from 'space-aggregator-types';
const NSR_enheter: NSR_Enhet[] = require('./NSR_enheter.json');
const NSR_schools: NSR_School[] = require('./NSR_schools.json');
const parsedSchools: School[] = require('./parsedSchools.json');

module.exports = {
	NSR_enheter,
	NSR_schools,
	parsedSchools
}

// import fs from 'fs'

// // export NSR_enheter = JSON.parse(fs.readFileSync('./NSR_enheter.json', 'utf-8').toString())
// export const NSR_schools = JSON.parse(fs.readFileSync('./NSR_schools.json', 'utf-8').toString())
// export const parsedSchools = JSON.parse(fs.readFileSync('./parsedSchools.json', 'utf-8').toString())
