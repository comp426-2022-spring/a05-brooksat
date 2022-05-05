// Put your database code here
const database = require('better-sqlite3')

const logdb = new database('log.db')

const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`)
let row = stmt.get();

if(row === undefined) {
    console.log('Log database missing')

    const sqlInit = `CREATE TABLE accesslog ( id INTEGER NOT NULL PRIMARY KEY, remoteaddr TEXT, remoteuser TEXT, time INTEGER, method TEXT, url TEXT, protocol TEXT, httpversion TEXT, status INTEGER, referer TEXT, useragent TEXT);`;

    logdb.exec(sqlInit)
} else {
    console.log('Log database exists.')
}

module.exports = logdb

