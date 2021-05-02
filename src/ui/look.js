const { remote } = require('electron');
const main = remote.require('./main');

console.log(main.getIdChild())