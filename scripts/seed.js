const sequelize = require('../config/database');
const Usuario = require('../models/usuario');
const Tablero = require('../models/tablero');
const Lista = require('../models/lista');
const Tarjeta = require('../models/tarjeta');

// DEFINICIÓN DE ASOCIACIONES (Arquitectura de Datos)
Usuario.hasMany(Tablero, { foreignKey: 'usuario_id' });
Tablero.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Tablero.hasMany(Lista, { foreignKey: 'tablero_id' });
Lista.belongsTo(Tablero, { foreignKey: 'tablero_id' });

Lista.hasMany(Tarjeta, { foreignKey: 'lista_id' });
Tarjeta.belongsTo(Lista, { foreignKey: 'lista_id' });

async function poblarBaseDeDatos() {
    try {
        // Sincronización forzada para limpiar datos previos
        await sequelize.sync({ force: true });
        console.log("INFO: Base de datos reseteada y sincronizada.");

        // 1. Crear Usuarios
        const u1 = await Usuario.create({ nombre: 'Constanza Campos', email: 'constanza@kanbanpro.com' });
        const u2 = await Usuario.create({ nombre: 'David PM', email: 'david@kanbanpro.com' });

        // 2. Crear Tableros (Asociados a los usuarios)
        const t1 = await u1.createTablero({ titulo: 'Desarrollo Backend Sprint 2', descripcion: 'Tareas de infraestructura y DB' });
        const t2 = await u1.createTablero({ titulo: 'Diseño UI/UX', descripcion: 'Mejoras visuales del dashboard' });
        const t3 = await u2.createTablero({ titulo: 'Hoja de Ruta 2026', descripcion: 'Planificación anual' });

        // // 3. Crear Listas para el Tablero 1
        const l1 = await Lista.create({ titulo: 'Por Hacer', orden: 1, tablero_id: t1.id });
        const l2 = await Lista.create({ titulo: 'En Progreso', orden: 2, tablero_id: t1.id });

        // // 4. Crear Tarjetas asociadas a las listas
        await Tarjeta.create({ titulo: 'Configurar Modelos', descripcion: 'Definir archivos en carpeta /models', lista_id: l1.id });
        await Tarjeta.create({ titulo: 'Escribir Seed script', descripcion: 'Poblar tablas con datos realistas', lista_id: l2.id });

        console.log("INFO: Poblado de datos (Seed) finalizado con éxito.");
    } catch (error) {
        console.error("FATAL ERROR en el Seed:", error.message);
    } finally {
        await sequelize.close();
    }
}

poblarBaseDeDatos();