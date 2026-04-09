const sequelize = require('../config/database');
const Usuario = require('../models/usuario');
const Tablero = require('../models/tablero');
const Lista = require('../models/lista');
const Tarjeta = require('../models/tarjeta');

// Re-definir relaciones para que el motor las reconozca en este proceso
Usuario.hasMany(Tablero, { foreignKey: 'usuario_id' });
Tablero.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Tablero.hasMany(Lista, { foreignKey: 'tablero_id' });
Lista.belongsTo(Tablero, { foreignKey: 'tablero_id' });
Lista.hasMany(Tarjeta, { foreignKey: 'lista_id' });
Tarjeta.belongsTo(Lista, { foreignKey: 'lista_id' });

async function testIntegridad() {
    try {
        console.log("--- INICIANDO PRUEBAS CRUD ---");

        // 1. LEER: Obtener Tablero con sus Listas y Tarjetas (Eager Loading)
        const miTablero = await Tablero.findOne({
            where: { titulo: 'Desarrollo Backend Sprint 2' },
            include: {
                model: Lista,
                include: [Tarjeta]
            }
        });
        console.log(`READ: Tablero '${miTablero.titulo}' cargado con sus relaciones.`);

        // 2. CREAR: Nueva tarjeta en una lista existente
        const listaDestino = await Lista.findOne({ where: { titulo: 'Por Hacer' } });

        // Usamos el modelo Tarjeta directamente para evitar errores de métodos mágicos
        const nuevaT = await Tarjeta.create({
            titulo: 'Prueba de Integridad',
            descripcion: 'Verificando inserción',
            lista_id: listaDestino.id // Pasamos el ID manualmente
        });

        console.log(`CREATE: Tarjeta '${nuevaT.titulo}' creada exitosamente.`);

        // 3. ACTUALIZAR: Modificar título de una tarjeta
        await Tarjeta.update({ titulo: 'Configuración de Modelos (OK)' }, { where: { id: 1 } });
        console.log("UPDATE: Título de tarjeta actualizado.");

        // 4. BORRAR: Eliminar una tarjeta específica
        await Tarjeta.destroy({ where: { id: nuevaT.id } });
        console.log("DELETE: Tarjeta de prueba eliminada correctamente.");

        console.log("--- TODAS LAS OPERACIONES COMPLETADAS ---");
    } catch (error) {
        console.error("ERROR en Test-CRUD:", error.message);
    } finally {
        await sequelize.close();
    }
}

testIntegridad();