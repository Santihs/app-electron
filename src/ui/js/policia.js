const { remote } = require('electron');
const main = remote.require('./main');

let ciPolicia;

const datosPolicia = () => {

    const nombre = document.getElementById('nombre');
    const apellido_paterno = document.getElementById('apellidoPapa');
    const apellido_materno = document.getElementById('apellidoMama');
    const ci = document.getElementById('ci');
    const otorgado = document.getElementById('otorgado');
    const serie = document.getElementById('serie');
    const seccion = document.getElementById('seccion');
    const estadoCivil = document.getElementById('estadoCivil');
    const lugarNacimiento = document.getElementById('lugarNacimiento');
    const fechaNacimiento = document.getElementById('fechaNacimiento');
    const profesion = document.getElementById('profesion');
    const grado = document.getElementById('grado');
    const escalafon = document.getElementById('escalafon');
    const libreta = document.getElementById('libreta');
    const domicilio = document.getElementById('domicilio');
    const zona = document.getElementById('zona');
    const numeroDom = document.getElementById('numeroDom');
    const telefono = document.getElementById('telefono');
    const celular = document.getElementById('celular');
    const nombrePadre = document.getElementById('nombrePadre');
    const nombreMadre = document.getElementById('nombreMadre');
    const emergencia = document.getElementById('emergencia');
    const unidad = document.getElementById('unidad');
    const destino = document.getElementById('destino');
    const fechaIngreso = document.getElementById('fechaIngreso');
    const fechaDestino = document.getElementById('fechaDestino');
    const motivoDestino = document.getElementById('motivoDestino');
    const motivoRepliegue = document.getElementById('motivoRepliegue')
    const fechaRepliegue = document.getElementById('fechaRepliegue');
    const ocupacion = document.getElementById('ocupacion');
    const vehiculo = document.getElementById('conduceVehiculo');
    const moto = document.getElementById('conduceMoto');
    const licencia = document.getElementById('licencia');
    
    ciPolicia = main.getCiPolicia();
    const police = main.getPolice(ciPolicia);
    
    apellido_materno.textContent = police.apellido_materno;
    apellido_paterno.textContent = police.apellido_paterno;
    nombre.textContent = police.nombre;
    grado.textContent = police.grado;
    lugarNacimiento.textContent = police.lugar_nacimiento;
    fechaNacimiento.textContent = police.fecha_nacimiento;
    escalafon.textContent = police.escalafon;
    ci.textContent = police.ci;
    otorgado.textContent = police.otorgado_ci;
    seccion.textContent = police.seccion_ci;
    serie.textContent = police.serie_ci;
    estadoCivil.textContent = police.estado_civil;
    domicilio.textContent = police.domicilio;
    profesion.textContent = police.profesion;
    numeroDom.textContent = police.numero_domicilio;
    zona.textContent = police.zona;
    telefono.textContent = police.telefono;
    celular.textContent = police.celular;
    libreta.textContent = police.libreta_militar;
    nombreMadre.textContent = police.nombre_madre;
    nombrePadre.textContent = police.nombre_padre;
    emergencia.textContent = police.emergencia_llamar;
    destino.textContent = police.actual_destino;
    unidad.textContent = police.unidad;
    fechaIngreso.textContent = police.fecha_ingreso_policia;
    fechaDestino.textContent = police.fecha_destino;
    motivoDestino.textContent = police.motivo_destino;
    fechaRepliegue.textContent = police.fecha_repliegue;
    motivoRepliegue.textContent = police.motivo_repliegue;
    ocupacion.textContent = police.otra_ocupacion;
    vehiculo.textContent = (police.conduce_automovil === 0)? 'No' : 'Si';
    moto.textContent = (police.conduce_motocicleta === 0)? 'No' : 'Si';
    licencia.textContent = police.licencia;
    
}

const cargarFamiliares = () => {
    const tabla_familiares = document.getElementById('familiares');
    tabla_familiares.innerHTML = ``;

    const familiares = main.getFamiliares(ciPolicia);
    console.log(familiares)
    
    const fragment = document.createDocumentFragment();
    familiares.map((familiar, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <th scope="row">${i+1}</th>
            <td>${familiar.nombre_apellidos}</td>
            <td>${familiar.edad}</td>
            <td>${familiar.relacion}</td>
            <td>${familiar.estado_civil}</td>
            <td>${familiar.grado_instruccion}</td>
            <td>${familiar.ocupacion}</td>
            <td><button class="btn btn-info" onclick="editarFamiliar('${ familiar.id_familiar }')">Editar</button>
            <button class="btn btn-danger" onclick="deleteFamiliar('${ familiar.id_familiar }')">Eliminar</button></td>`;
        fragment.appendChild(tr);
    })

    tabla_familiares.appendChild(fragment);

}

const deleteFamiliar = (id_familiar) => {
    const response = confirm('¿Esta seguro que desea eliminar este familiar?')
    if( response ){
        main.deleteFamiliar(id_familiar);
        // cargarFamiliares();
    }
    return;
}

const aniadirFamiliar = () => {
    main.createWindowForm(ciPolicia, false)
}

const editarFamiliar = (id_familiar) => {
    main.createWindowForm(ciPolicia, true, id_familiar);
}

datosPolicia();
cargarFamiliares();