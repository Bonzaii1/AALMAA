const { DataTypes } = require("sequelize")
const { sequelize } = require("../middleware/connection")
const Rol = require("../models/Rol")

const Usuario = sequelize.define("Usuario", {
    USUARIO_ID: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    ROL_ID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Rol,
            key: "ROL_ID"
        }
    },
    NOMBRE: {
        type: DataTypes.STRING
    },
    CLAVE: {
        type: DataTypes.STRING
    }
},
    {
        tableName: "USUARIO",
        timestamps: false
    })

Usuario.belongsTo(Rol, { foreignKey: "ROL_ID" })

module.exports = Usuario