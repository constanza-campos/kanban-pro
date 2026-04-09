const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('usuario', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { underscored: true });