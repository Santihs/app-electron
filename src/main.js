const { BrowserWindow, Notification } = require('electron')
const { getConnection } = require('./database/database');
require('electron-reload')(__dirname)

let window;
let child;
let idChild;

const createWindow = () => {
    window = new BrowserWindow({
        width: 1220,
        height: 670,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // agregar esto para https://es.stackoverflow.com/questions/432445/electron-uncaught-referenceerror-require-is-not-defined
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
        }
    });
    window.loadFile('src/ui/index.html');
}

const createWindowChild = (id) => {
    child = new BrowserWindow({
        parent: window,
        modal: true,
        width: 1050,
        height: 620,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // agregar esto para https://es.stackoverflow.com/questions/432445/electron-uncaught-referenceerror-require-is-not-defined
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
        }
    });
    idChild = id;
    child.loadFile('src/ui/look.html');
}

const getIdChild = () => {
    return idChild;
}

const getPolices = () => {
    const db = getConnection();
    const row = db.prepare('SELECT * FROM datos ORDER BY id DESC');
    const allPolices = row.all();
    db.close();
    return allPolices;
}
// getPolices()

const createPolice = (datos) => {
    try {
        datos.ci = parseFloat(datos.ci)
        datos.serie = parseFloat(datos.serie)
        datos.seccion = parseFloat(datos.seccion)
        datos.celular = parseFloat(datos.celular)
        datos.telefono = parseFloat(datos.telefono)
        datos.emergencia = parseFloat(datos.emergencia)

        const db = getConnection();
        const stmt = db.prepare('INSERT INTO datos VALUES(@id, @nombre, @apellido_paterno, @apellido_materno, @ci, @otorgado, @serie, @seccion, @estado_civil, @lugar_nacimiento, @fecha_nacimiento, @profesion, @grado, @escalafon, @servicio_militar, @domicilio, @zona, @numero, @telefono, @celular, @nombre_padre, @nombre_madre, @emergencia, @unidad, @destino, @fecha_ingreso_policia, @fecha_destino, @fecha_repliegue, @vehiculo, @motocicleta, @licencia, @otra_ocupacion)')

        stmt.run(datos)

        new Notification({
            title: 'Un policia guardado exitosamente',
            body: 'Se ha guardado un policia en el sistema'
        }).show();
    } catch (error) {
        console.log(error)
    } finally {
        db.close()
    }

}

const deletePolice = (id) => {
    const db = getConnection();
    const stmt = db.prepare('DELETE FROM datos WHERE id = ?')
    stmt.run(id)
    db.close()
}

module.exports = {
    createWindow,
    createWindowChild,
    getPolices,
    createPolice,
    deletePolice,
    getIdChild,
}