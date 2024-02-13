const { DataTypes } = require("sequelize")
const { sequelize } = require("../middleware/connection")

const Brigada = sequelize.define("Brigada", {
    BRIGADA_ID: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    NOMBRE: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ENCARGADO: {
        type: DataTypes.STRING,
    },
    LUGAR: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FECHA: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ACTIVO: {
        type: DataTypes.CHAR,
        allowNull: false
    }
},
    {
        tableName: "BRIGADA",
        timestamps: false
    })

module.exports = Brigada;