const { remote } = require('electron');
const main = remote.require('./main');

const formulario = document.getElementById('formulario');
let idFamiliar;

formulario.addEventListener('submit', (e) => {

    e.preventDefault();

    const nombre_apellido = document.getElementById('nombre_apellido');
    const edad = document.getElementById('edad');
    const relacion = document.getElementById('relacion');
    const instruccion = document.getElementById('instruccion');
    const ocupacion = document.getElementById('ocupacion');
    const estado_civil = document.getElementById('estado_civil');
    
    
    const familiar = {
        id_familiar: idFamiliar,
        nombres_apellidos: nombre_apellido.value,
        edad: edad.value,
        relacion: relacion.value,
        grado_instruccion: instruccion.value,
        ocupacion: ocupacion.value,
        estado_civil: estado_civil.value,
    }
    if(main.getIsEdit()){
        main.updateFamiliar(familiar);
    } else {
        main.createFamiliar(familiar);
    }

    main.getWindowForm().close();
})

if(main.getIsEdit()){
    const nombre_apellido = document.getElementById('nombre_apellido');
    const edad = document.getElementById('edad');
    const relacion = document.getElementById('relacion');
    const instruccion = document.getElementById('instruccion');
    const ocupacion = document.getElementById('ocupacion');
    const estado_civil = document.getElementById('estado_civil');
    const buttonForm = document.getElementById('button-form');

    idFamiliar = main.getIdFamiliar();

    const familiar = main.getFamiliar(idFamiliar);

    nombre_apellido.value = familiar.nombre_apellidos;
    edad.value = familiar.edad;
    relacion.value = familiar.relacion;
    instruccion.value = familiar.grado_instruccion;
    ocupacion.value = familiar.ocupacion;
    estado_civil.value = familiar.estado_civil;
    buttonForm.textContent = "Guardar Cambios";
    
}