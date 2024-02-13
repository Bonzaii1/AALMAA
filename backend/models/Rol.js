const { DataTypes } = require("sequelize")
const { sequelize } = require("../middleware/connection")

const Rol = sequelize.define("Rol", {
    ROL_ID: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    NOMBRE: {
        type: DataTypes.STRING
    }
},
    {
        tableName: "ROLES",
        timestamps: false
    })


module.exports = Rol

