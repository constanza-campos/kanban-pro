const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('lista', {
    titulo: { type: DataTypes.STRING, allowNull: false },
    orden: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { underscored: true });