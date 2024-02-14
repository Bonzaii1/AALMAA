const { DataTypes } = require("sequelize")
const { sequelize } = require("../middleware/connection")

const Usuario = sequelize.define("Usuario", {
    USUARIO_ID: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    ROL: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: "Rol",
            key: "ROL_ID"
        }
    },
    NOMBRE: {
        type: DataTypes.STRING
    },
    CLAVE: {
        type: DataTypes.STRING
    }
})

module.exports = Usuario