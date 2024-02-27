const { DataTypes } = require("sequelize");
const { sequelize } = require("../middleware/connection");
const Paciente = require("../models/Paciente")
const Rol = require("../models/Rol")


const PacienteRol = sequelize.define("PacienteRol", {
    PACIENTE_ID: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: 'Paciente',
            key: "PACIENTE_ID"
        }
    },
    ROL_ID: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
            model: "Rol",
            key: "ROL_ID"
        }
    },
    ESTADO: {
        type: DataTypes.CHAR
    },
    USUARIO_ID: {
        type: DataTypes.STRING,
        references: {
            model: "Usuario",
            key: "USUARIO_ID"
        }
    },
    NOMBRE_ESTUDIANTE: {
        type: DataTypes.STRING
    },
    DIAGNOSTICO: {
        type: DataTypes.STRING
    }
},
    {
        tableName: "PACIENTE_ROL",
        timestamps: false
    })

const association = () => {
    Paciente.belongsToMany(Rol, { through: PacienteRol, foreignKey: "PACIENTE_ID", otherKey: "ROL_ID" })
    Rol.belongsToMany(Paciente, { through: PacienteRol, foreignKey: "ROL_ID", otherKey: "PACIENTE_ID" })
}

module.exports = { association, PacienteRol }