const mysql = require('mysql')
const util = require('util')

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456789',
    database: 'graphQL'
})

const query = util.promisify(db.query).bind(db)

module.exports = {
    query,
}