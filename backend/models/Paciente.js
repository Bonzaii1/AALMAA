const { DataTypes } = require("sequelize")
const { sequelize } = require("../middleware/connection")


const Paciente = sequelize.define("Paciente", {
    PACIENTE_ID: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    NOMBRE: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EDAD: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    GENERO: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    ESTADO_CIVIL: {
        type: DataTypes.CHAR
    },
    RELIGION: {
        type: DataTypes.STRING
    },
    OCUPACION: {
        type: DataTypes.STRING
    },
    DIRECCION: {
        type: DataTypes.STRING
    },
    CIUDAD: {
        type: DataTypes.STRING
    },
    PESO: {
        type: DataTypes.INTEGER
    },
    TALLA: {
        type: DataTypes.INTEGER
    },
    TA: {
        type: DataTypes.INTEGER
    },
    FCAR: {
        type: DataTypes.INTEGER
    },
    FRESP: {
        type: DataTypes.INTEGER
    },
    TEMPE: {
        type: DataTypes.INTEGER
    },
    ALERGIAS: {
        type: DataTypes.STRING
    },
    APP: {
        type: DataTypes.STRING
    },
    PADECIMIENTO: {
        type: DataTypes.STRING
    },
    NOMBRE_RECEP: {
        type: DataTypes.STRING
    }
},
    {
        tableName: "PACIENTE",
        timestamps: true,
        createdAt: "CREADO",
        updatedAt: false
    })


module.exports = Paciente