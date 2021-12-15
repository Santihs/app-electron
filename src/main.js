const { BrowserWindow } = require('electron')
const { queryBD } = require('./database/queryBD')
require('electron-reload')(__dirname)

let window;
let windowChild;
let windowForm;
let ciPolicia;
let idForm;
let isEdit;
let idFamiliar;

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
    window.loadFile('src/ui/html/index.html');
}

const createWindowChild = (ci) => {
    windowChild = new BrowserWindow({
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
    ciPolicia = ci;
    windowChild.loadFile('src/ui/html/policia.html');
}

const createWindowForm = (ci_policia, edit, id_familiar) => {
    windowForm = new BrowserWindow({
        parent: windowChild,
        modal: true,
        width: 400,
        height: 630,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // agregar esto para https://es.stackoverflow.com/questions/432445/electron-uncaught-referenceerror-require-is-not-defined
            nodeIntegrationInWorker: true,
            enableRemoteModule: true,
        }
    });
    idForm = ci_policia;
    isEdit = edit
    idFamiliar = id_familiar;
    windowForm.loadFile('src/ui/html/form.html')
}

const getCiPolicia = () => {
    return ciPolicia;
}

const getIdForm = () => {
    return idForm;
}

const getIsEdit = () => {
    return isEdit;
}

const getWindowForm = () => {
    return windowForm
}

const getIdFamiliar = () => {
    return idFamiliar
}

const { getPolice, getPolices, createPolice, deletePolice, deleteDatos, getFamiliares, deleteFamiliar, createFamiliar, getFamiliar, updateFamiliar  } = queryBD(idForm);

module.exports = {
    createFamiliar,
    createPolice,
    createWindow,
    createWindowChild,
    createWindowForm,
    getCiPolicia,
    getFamiliar,
    getFamiliares,
    getIdFamiliar,
    getIdForm,
    getIsEdit,
    getPolice,
    getPolices,
    getWindowForm,
    deleteDatos,
    deleteFamiliar,
    deletePolice,
    updateFamiliar,
}