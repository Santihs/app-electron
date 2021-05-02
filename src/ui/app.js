const { remote } = require('electron');
const main = remote.require('./main');

const policeForm = document.getElementById('policeForm')
const licencia = document.getElementById('licencia');
const vehiculo = document.getElementById('vehiculo');
const motocicleta = document.getElementById('motocicleta');

let valorVehiculo = '';
vehiculo.addEventListener('change', (e) => {
    if(e.target.checked === true){
        valorVehiculo = e.target.value;
        if(valorVehiculo == 'si'){
            licencia.removeAttribute("disabled")
        }
        else{
            if(motocicleta.value == 'no'){
                licencia.setAttribute("disabled", "")
                return
            }
            else{
                licencia.removeAttribute("disabled")
                return
            }
        }
    }
})

let valorMotocicleta = '';
motocicleta.addEventListener('change', (e) => {
    if(e.target.checked === true){
        valorMotocicleta = e.target.value;
        if(valorMotocicleta == 'si'){
            licencia.removeAttribute("disabled")
        } else {
            licencia.setAttribute("disabled", "")
        }
    }
})

policeForm.addEventListener( 'submit', (e) => {
    e.preventDefault();
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
    const fechaRepliegue = document.getElementById('fechaRepliegue');
    const ocupacion = document.getElementById('ocupacion');

    const datos = {
        id: ci.value,
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

const deletePolice = (id) => {
    const response = confirm('¿Esta seguro que desea eliminar este policia?')
    if( response ){
        main.deletePolice(id);
        renderPolicias()
    }
    return;
}

const renderPolicias = () => {
    const divPolicias = document.getElementById('lista_policias');
    divPolicias.innerHTML = ''

    const lista_Policias = main.getPolices();

    const fragment = document.createDocumentFragment();
    lista_Policias.map( policia => {
        const div = document.createElement('div')
        div.innerHTML = `<div class="card text-white bg-primary mb-3 mt-3">
        <div class="card-header">${policia.grado} ${policia.nombre} ${policia.apellido_paterno} ${policia.apellido_materno}</div>
        <div class="card-body">
          <p class="card-text"><b>Celular:</b> ${policia.celular} <b>Teléfono:</b> ${(policia.telefono === null) ? "No tiene" : policia.telefono} <br>
          <b>Fecha de Nacimiento:</b> ${policia.fecha_nacimiento} <br> <b>C.I:</b> ${policia.ci}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-info" onclick="verDatosPolicia('${policia.id}')">Ver datos</button>
            <button type="button" class="btn btn-outline-success">Editar</button>
            <button type="button" class="btn btn-outline-danger" onclick="deletePolice('${ policia.id }')">Eliminar</button>
        </div>
      </div>`
        fragment.appendChild(div)
    })

    divPolicias.appendChild(fragment)

}

const verDatosPolicia = (id) => {
    main.createWindowChild(id);
}

renderPolicias()