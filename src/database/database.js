

const database = require('better-sqlite3')

const getConnection = () => {
    const mi_path = __dirname + '/lista_policias.db'
    const db = new database(mi_path)
    return db;
}

const closeConnection = (db) => {
    db.close();
}

module.exports = {
    getConnection,
    closeConnection
}
