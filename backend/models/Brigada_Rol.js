const { DataTypes } = require("sequelize");
const { sequelize } = require("../middleware/connection");
const Brigada = require("../models/Brigada")
const Rol = require("../models/Rol")

const BrigadaRol = sequelize.define('BrigadaRol', {
    // Define other attributes if necessary
    BRIGADA_ID: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: 'Brigada', // Reference to the User model
            key: 'BRIGADA_ID',     // Primary key in the User model
        }
    },
    ROL_ID: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: 'Rol', // Reference to the Role model
            key: 'ROL_ID',     // Primary key in the Role model
        }
    },
}, {
    tableName: 'BRIGADA_ROL', // Specify the table name if it differs from the default
    timestamps: false,      // If you don't need timestamps
});

const association = () => {
    Brigada.belongsToMany(Rol, { through: BrigadaRol, foreignKey: "BRIGADA_ID", otherKey: "ROL_ID" })
    Rol.belongsToMany(Brigada, { through: BrigadaRol, foreignKey: "ROL_ID", otherKey: "BRIGADA_ID" })
}

module.exports = association