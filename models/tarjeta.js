const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('tarjeta', {
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT }
}, { underscored: true });