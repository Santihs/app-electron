const { remote } = require('electron');
const main = remote.require('./main');

const policeForm = document.getElementById('policeForm')
const licencia = document.getElementById('licencia');
const vehiculo = document.getElementById('vehiculo');
const motocicleta = document.getElementById('motocicleta');
const nombre = document.getElementById('nombre');
const apellido_paterno = document.getElementById('apellidoP');
const apellido_materno = document.getElementById('apellidoM');
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

let isEdit = false;
let valorVehiculo = '';
vehiculo.addEventListener('change', (e) => {
    if (e.target.checked === true) {
        valorVehiculo = e.target.value;
        if (valorVehiculo == 'si') {
            licencia.removeAttribute("disabled")
        }
        else {
            if (motocicleta.value == 'no') {
                licencia.setAttribute("disabled", "")
                return
            }
            else {
                licencia.removeAttribute("disabled")
                return
            }
        }
    }
})

let valorMotocicleta = '';
motocicleta.addEventListener('change', (e) => {
    if (e.target.checked === true) {
        valorMotocicleta = e.target.value;
        if (valorMotocicleta == 'si') {
            licencia.removeAttribute("disabled")
        } else {
            licencia.setAttribute("disabled", "")
        }
    }
})

policeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = {
        nombre: nombre.value,
        apellido_paterno: apellido_paterno.value,
        apellido_materno: apellido_materno.value,
        ci: ci.value,
        otorgado: otorgado.value,
        serie: serie.value,
        seccion: seccion.value,
        estado_civil: estadoCivil.value,
        lugar_nacimiento: lugarNacimiento.value,
        fecha_nacimiento: fechaNacimiento.value,
        profesion: profesion.value,
        grado: grado.value,
        escalafon: escalafon.value,
        servicio_militar: libreta.value,
        domicilio: domicilio.value,
        zona: zona.value,
        numero: (numeroDom.value.length > 0) ? numeroDom.value : null,
        telefono: (telefono.value.length > 0) ? telefono.value : null,
        celular: (celular.value.length > 0) ? celular.value : null,
        nombre_padre: nombrePadre.value,
        nombre_madre: nombreMadre.value,
        emergencia: emergencia.value,
        unidad: unidad.value,
        destino: destino.value,
        fecha_ingreso_policia: fechaIngreso.value,
        fecha_destino: fechaDestino.value,
        motivo_destino: (motivoDestino.value.length > 0) ? licencia.value : null,
        motivo_repliegue: (motivoRepliegue.value.length > 0) ? licencia.value : null,
        fecha_repliegue: fechaRepliegue.value,
        vehiculo: valorVehiculo,
        motocicleta: valorMotocicleta,
        licencia: (licencia.value.length > 0) ? licencia.value : null,
        otra_ocupacion: (ocupacion.value.length > 0) ? ocupacion.value : null,
    }

    main.createPolice(datos)

    policeForm.reset();
    renderPolicias();

});


const renderPolicias = () => {
    const divPolicias = document.getElementById('lista_policias');
    divPolicias.innerHTML = ''

    const lista_Policias = main.getPolices();

    const fragment = document.createDocumentFragment();
    lista_Policias.map(policia => {
        const div = document.createElement('div')
        div.innerHTML = `<div class="card text-white bg-primary mb-3 mt-3">
        <div class="card-header">${policia.grado} ${policia.nombre} ${policia.apellido_paterno} ${policia.apellido_materno}</div>
        <div class="card-body">
        <p class="card-text"><b>Celular:</b> ${policia.celular} <b>Teléfono:</b> ${(policia.telefono === null) ? "No tiene" : policia.telefono} <br>
          <b>Fecha de Nacimiento:</b> ${policia.fecha_nacimiento} <br> <b>C.I:</b> ${policia.ci}</p>
          </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-outline-info" onclick="verDatosPolicia('${policia.ci}')">Ver Más...</button>
          <button type="button" class="btn btn-outline-success" onclick="updatePolice('${policia.ci}')">Editar</button>
          <button type="button" class="btn btn-outline-danger" onclick="deletePolice('${policia.ci}')">Eliminar</button>
          </div>
          </div>`
        fragment.appendChild(div)
    })

    divPolicias.appendChild(fragment)

}

const verDatosPolicia = (id) => {
    main.createWindowChild(id);
}

const deletePolice = (id) => {
    const response = confirm('¿Esta seguro que desea eliminar este policia?')
    if (response) {
        const datos = main.deletePolice(id);
        main.deleteDatos(datos);
    }
}

const updatePolice = (id) => {

    const vehiculoSi = document.getElementById('vehiculoSi');
    const vehiculoNo = document.getElementById('vehiculoNo');
    const motoSi = document.getElementById('motoSi');
    const motoNo = document.getElementById('motoNo');
    vehiculoSi.removeAttribute('checked');
    vehiculoNo.removeAttribute('checked');
    motoSi.removeAttribute('checked');
    motoNo.removeAttribute('checked');
    console.log(vehiculoSi);

    const police = main.getPolice(id);
    apellido_materno.value = police.apellido_materno;
    apellido_paterno.value = police.apellido_paterno;
    nombre.value = police.nombre;
    grado.value = police.grado;
    lugarNacimiento.value = police.lugar_nacimiento;
    fechaNacimiento.value = police.fecha_nacimiento;
    escalafon.value = police.escalafon;
    ci.value = police.ci;
    otorgado.value = police.otorgado_ci;
    seccion.value = police.seccion_ci;
    serie.value = police.serie_ci;
    estadoCivil.value = police.estado_civil;
    domicilio.value = police.domicilio;
    profesion.value = police.profesion;
    numeroDom.value = police.numero_domicilio;
    zona.value = police.zona;
    telefono.value = police.telefono;
    celular.value = police.celular;
    libreta.value = police.libreta_militar;
    nombreMadre.value = police.nombre_madre;
    nombrePadre.value = police.nombre_padre;
    emergencia.value = police.emergencia_llamar;
    destino.value = police.actual_destino;
    unidad.value = police.unidad;
    fechaIngreso.value = police.fecha_ingreso_policia;
    fechaDestino.value = police.fecha_destino;
    motivoDestino.value = police.motivo_destino;
    fechaRepliegue.value = police.fecha_repliegue;
    motivoRepliegue.value = police.motivo_repliegue;
    ocupacion.value = police.otra_ocupacion;
    (police.conduce_automovil === 0) ? vehiculoNo.setAttribute('checked', "true") : vehiculoSi.setAttribute('checked', 'true');
    (police.conduce_motocicleta === 0) ? motoNo.setAttribute('checked', "true") : motoSi.setAttribute('checked', "true");
    licencia.value = police.licencia;

    isEdit = true;

}

renderPolicias()