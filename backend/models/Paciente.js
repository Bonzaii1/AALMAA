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
        type: DataTypes.CHAR,
        defaultValue: ""
    },
    RELIGION: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    OCUPACION: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    DIRECCION: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    CIUDAD: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    PESO: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    TALLA: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    TA: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    FCAR: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    FRESP: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    TEMPE: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ALERGIAS: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    APP: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    PADECIMIENTO: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    NOMBRE_RECEP: {
        type: DataTypes.STRING,
        defaultValue: ""
    },
    ESTADO: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        tableName: "PACIENTE",
        timestamps: true,
        createdAt: "CREADO",
        updatedAt: false
    })


module.exports = Paciente