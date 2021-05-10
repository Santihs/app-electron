
const { getConnection, closeConnection } = require('./database');

const queryBD = (ci_policia) => {
    
    const getPolices = () => {
        const db = getConnection();
        const row = db.prepare('SELECT Datos_Policia.*, Documentacion_Policia.*, Domicilio_Policia.*, Info_Conduccion.*, Contacto_Policia.*, Destino_Policia.* FROM Registro INNER JOIN Datos_Policia ON Datos_Policia.ci = Registro.ci INNER JOIN Documentacion_Policia ON Registro.id_documentacion = Documentacion_Policia.id_documentacion INNER JOIN Domicilio_Policia ON Domicilio_Policia.id_domicilio = Registro.id_domicilio INNER JOIN Info_Conduccion ON Registro.id_info_conduccion = Info_Conduccion.id_info_conduccion INNER JOIN Contacto_Policia ON Registro.id_contacto = Contacto_Policia.id_contacto INNER JOIN Destino_Policia ON Destino_Policia.id_destino = Registro.id_destino;');
        const allPolices = row.all();
        closeConnection(db);
        return allPolices;
    }
    
    const getPolice = (ci) => {
        const db = getConnection();
        const row = db.prepare('SELECT Datos_Policia.*, Documentacion_Policia.*, Domicilio_Policia.*, Info_Conduccion.*, Contacto_Policia.*, Destino_Policia.* FROM Registro INNER JOIN Datos_Policia ON Datos_Policia.ci = Registro.ci INNER JOIN Documentacion_Policia ON Registro.id_documentacion = Documentacion_Policia.id_documentacion INNER JOIN Domicilio_Policia ON Domicilio_Policia.id_domicilio = Registro.id_domicilio INNER JOIN Info_Conduccion ON Registro.id_info_conduccion = Info_Conduccion.id_info_conduccion INNER JOIN Contacto_Policia ON Registro.id_contacto = Contacto_Policia.id_contacto INNER JOIN Destino_Policia ON Destino_Policia.id_destino = Registro.id_destino where Registro.ci = ?');
        const police = row.get(ci);
        closeConnection(db);
        return police;
    }
    
    const createPolice = (datos) => {
        try {
            datos.ci = parseFloat(datos.ci)
            datos.serie = parseFloat(datos.serie)
            datos.seccion = parseFloat(datos.seccion)
            datos.celular = parseFloat(datos.celular)
            datos.telefono = parseFloat(datos.telefono)
            
            const { ci, nombre, apellido_materno, apellido_paterno, fecha_nacimiento, lugar_nacimiento, estado_civil, libreta_militar, escalafon, nombre_madre, nombre_padre, telefono, celular, emergencia, fecha_ingreso_policia, fecha_destino, fecha_repliegue, destino, unidad, motivo_repliegue, motivo_destino, serie, seccion, otorgado, grado, profesion, domicilio, numero, zona, vehiculo, motocicleta, licencia, otra_ocupacion } = datos;
            
            const db = getConnection();
            const tabla_policia = db.prepare('INSERT INTO Datos_Policia(ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, lugar_nacimiento, estado_civil, libreta_militar, escalafon, nombre_madre, nombre_padre) VALUES (?,?,?,?,?,?,?,?,?,?,?)');
            tabla_policia.run(ci, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, lugar_nacimiento, estado_civil, libreta_militar, escalafon, nombre_madre, nombre_padre)
            
            const tabla_contacto = db.prepare('INSERT INTO Contacto_Policia(telefono, celular, emergencia_llamar) VALUES (?,?,?)');
            tabla_contacto.run(telefono, celular, emergencia);
            
            const tabla_destino = db.prepare('INSERT INTO Destino_Policia(fecha_ingreso_policia, fecha_destino, fecha_repliegue, actual_destino, unidad, motivo_repliegue, motivo_destino) VALUES (?,?,?,?,?,?,?)');
            tabla_destino.run(fecha_ingreso_policia, fecha_destino, fecha_repliegue, destino, unidad, motivo_repliegue, motivo_destino);
            
            const tabla_documentacion = db.prepare('INSERT INTO Documentacion_Policia(serie_ci, seccion_ci, otorgado_ci, profesion, grado) VALUES (?, ?, ?, ?, ?)');
            tabla_documentacion.run(serie, seccion, otorgado, profesion, grado);
            
            const tabla_domicilio = db.prepare('INSERT INTO domicilio_policia(domicilio, zona, numero_domicilio) VALUES (?, ?, ?)');
            tabla_domicilio.run(domicilio, zona, numero);
            
            const tabla_conduccion = db.prepare('INSERT INTO Info_Conduccion(conduce_automovil, conduce_motocicleta, licencia, otra_ocupacion) VALUES (?, ?, ?, ?)');
            tabla_conduccion.run((vehiculo === 'si') ? 1 : 0, (motocicleta === 'si') ? 1 : 0, licencia, otra_ocupacion);
            
            closeConnection(db);
    
            const db2 = getConnection();
            
            const id_tabla_contacto = db2.prepare('SELECT MAX(id_contacto) FROM Contacto_Policia')
            const id_contacto = id_tabla_contacto.get();
            const id_tabla_destino = db2.prepare('SELECT MAX(id_destino) FROM Destino_Policia')
            const id_destino = id_tabla_destino.get();
            const id_tabla_docu = db2.prepare('SELECT MAX(id_documentacion) FROM Documentacion_Policia')
            const id_docu = id_tabla_docu.get();
            const id_tabla_domicilio = db2.prepare('SELECT MAX(id_domicilio) FROM Domicilio_Policia')
            const id_domicilio = id_tabla_domicilio.get();
            const id_tabla_conduccion = db2.prepare('SELECT MAX(id_info_conduccion) FROM Info_Conduccion');
            const id_conduccion = id_tabla_conduccion.get();
            
            const tabla_registro = db2.prepare('INSERT INTO Registro(ci, id_domicilio, id_documentacion, id_info_conduccion, id_contacto, id_destino) VALUES (?, ?, ?, ?, ?, ?)');
            tabla_registro.run(ci, id_domicilio['MAX(id_domicilio)'], id_docu['MAX(id_documentacion)'], id_conduccion['MAX(id_info_conduccion)'], id_contacto['MAX(id_contacto)'], id_destino['MAX(id_destino)']);
            
            closeConnection(db2);
            
            new Notification({
                title: 'Un policia ha sido añadido',
                body: 'Se ha guardado un policia en el sistema'
            }).show();
        } catch (error) {
            console.log(error)
        } finally {
            closeConnection(db);
            closeConnection(db2);
        }
    }
    
    const createFamiliar = (familiar) => {
        try {
            familiar.edad = parseFloat(familiar.edad)
            
            const {nombres_apellidos, edad, estado_civil, relacion, grado_instruccion, ocupacion} = familiar;
            
            const db = getConnection();
            const tabla_familiares = db.prepare('INSERT INTO Familiares(nombre_apellidos, edad, estado_civil, relacion, grado_instruccion, ocupacion) VALUES (?,?,?,?,?,?)');
            tabla_familiares.run(nombres_apellidos, edad, estado_civil, relacion, grado_instruccion, ocupacion);
            
            closeConnection(db);
            
            const db2 = getConnection();
            const id_tabla_familiar = db2.prepare('SELECT MAX(id_familiar) FROM Familiares')
            const id_familiar = id_tabla_familiar.get();
            const tabla_familiares_policia = db2.prepare('INSERT INTO Familiares_Policia(ci, id_familiar) VALUES (?,?)')
            tabla_familiares_policia.run(ci_policia, id_familiar['MAX(id_familiar)']);
            
            closeConnection(db2);
            
            new Notification({
                title: 'Un familiar ha sido añadido',
                body: 'Se ha guardado familiar en el sistema'
            }).show();
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const deletePolice = (ci) => {
        try {
            const db = getConnection();
            const row = db.prepare('SELECT * FROM Registro where ci = ?')
            const datos = row.get(ci);
            
            const delete_registro = db.prepare('DELETE FROM Registro WHERE ci = ?');
            delete_registro.run(ci);
            
            const delete_familiares = db.prepare('DELETE FROM Familiares_Policia WHERE ci = ?');
            delete_familiares.run(ci);
            
            closeConnection(db);
            
            return datos;
        } catch (error) {
            console.log(error)
        }
    }
    
    const deleteDatos = (datos) => {
        try {
            const db2 = getConnection()
            
            const delete_policia = db2.prepare('DELETE FROM Datos_Policia WHERE ci = ?');
            delete_policia.run(datos.ci);
            
            const delete_contacto = db2.prepare('DELETE FROM Contacto_Policia WHERE id_contacto = ?');
            delete_contacto.run(datos.id_contacto);
            
            const delete_destino = db2.prepare('DELETE FROM Destino_Policia WHERE id_destino = ?');
            delete_destino.run(datos.id_destino);
            
            const delete_documentacion = db2.prepare('DELETE FROM Documentacion_Policia WHERE id_documentacion = ?');
            delete_documentacion.run(datos.id_documentacion);
            
            const delete_domicilio = db2.prepare('DELETE FROM Domicilio_Policia WHERE id_domicilio = ?');
            delete_domicilio.run(datos.id_domicilio);
            
            const delete_conduccion = db2.prepare('DELETE FROM Info_Conduccion WHERE id_info_conduccion = ?');
            delete_conduccion.run(datos.id_info_conduccion);
            
            closeConnection(db2);
            
            new Notification({
                title: 'Se ha eliminado un policia',
                body: 'Ha sido eliminado un policia'
            }).show();
        } catch (error) {
            console.log(error)
        }
    }
    
    const getFamiliares = (ci) => {
        const db = getConnection();

        const stmt = db.prepare('SELECT Familiares.* FROM Familiares_Policia INNER JOIN Familiares ON Familiares_Policia.id_familiar = Familiares.id_Familiar where ci = ?');
        const familiares = stmt.all(ci);

        closeConnection(db);

        return familiares;
    }
    
    const getFamiliar = (id_familiar) => {
        const db = getConnection();

        const stmt = db.prepare('SELECT * FROM Familiares WHERE id_familiar = ?');
        const familiar = stmt.get(id_familiar);
        
        closeConnection(db);
        
        return familiar;
    }
    
    const deleteFamiliar = (id_familiar) => {
        const db = getConnection();

        const delete_foreign = db.prepare('DELETE FROM Familiares_Policia WHERE id_familiar = ?')
        delete_foreign.run(id_familiar);
        
        closeConnection(db);
        
        const db2 = getConnection();

        const delete_familiar = db2.prepare('DELETE FROM Familiares WHERE id_familiar = ?')
        delete_familiar.run(id_familiar);
        
        closeConnection(db2);
    }
    
    const updateFamiliar = (familiar) => {
        const db = getConnection();

        const {id_familiar, nombres_apellidos, edad, estado_civil, relacion, grado_instruccion, ocupacion} = familiar;
        
        const update_familiar = db.prepare('UPDATE Familiares SET nombre_apellidos = ?, edad = ?, estado_civil = ?, relacion = ?, grado_instruccion = ?, ocupacion = ? WHERE id_familiar = ?');
        update_familiar.run(nombres_apellidos, edad, estado_civil, relacion, grado_instruccion, ocupacion, id_familiar);

        closeConnection(db);
    }

    return {
        getFamiliar,
        getFamiliares,
        getPolice,
        getPolices,
        createFamiliar,
        createPolice,
        deleteDatos,
        deleteFamiliar,
        deletePolice,
        updateFamiliar,
    }

}

module.exports = {
    queryBD,
}
