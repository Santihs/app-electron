

const database = require('better-sqlite3')

const getConnection = () => {
    const mi_path = __dirname + '/datos_policias.db'
    const db = new database(mi_path)
    return db;
}

module.exports = {
    getConnection,
}
