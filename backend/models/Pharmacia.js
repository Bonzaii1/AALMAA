const { DataTypes } = require("sequelize")
const { sequelize } = require("../middleware/connection")

const Pharmacia = sequelize.define("Pharmacia", {
    ID: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.STRING
    },
    NOMBRE: {
        type: DataTypes.STRING
    },
    CANTIDAD: {
        type: DataTypes.STRING
    }
},
    {
        timestamps: false,
        tableName: "PHARMACIA"
    })


module.exports = Pharmacia

