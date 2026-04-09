const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tablero = sequelize.define('tablero', {
    titulo: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    descripcion: { 
        type: DataTypes.TEXT,
        allowNull: true 
    }
}, { 
    underscored: true,
    tableName: 'tableros'
});

module.exports = Tablero;