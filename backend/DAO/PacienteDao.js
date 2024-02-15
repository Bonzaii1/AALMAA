const { sequelize } = require("../middleware/connection")
const Paciente = require("../models/Paciente")
const Rol = require("../models/Rol")
const association = require("../models/Paciente_Rol")


association()

const getPacientes = async (request, response) => {
    try {
        const pacientes = await Paciente.findAll({
            order: [["CREADO"]],
            include: {
                model: Rol,
                required: false,
                attributes: [],
                through: { attributes: [] }
            },
            attributes: {
                include: [
                    [sequelize.fn("COUNT", sequelize.col("Rols.ROL_ID")), "MODULOS"]
                ]
            },
            group: ["Paciente.PACIENTE_ID"]
        })

        response.status(200).json(pacientes)
    } catch (error) {
        console.log("Error in PacienteDao in method getPacientes: ", error);
        response.status(500).send("Internal Server Error");

    }

}

const getPacienteById = async (request, response) => {
    const id = request.params.id
    try {
        const paciente = await Paciente.findByPk(id, {
            include: Rol
        })

        response.status(200).json(paciente)
    } catch (error) {
        console.log("Error in PacienteDao in method getPacienteById: ", error);
        response.status(500).send("Internal Server Error");
    }



}


module.exports = { getPacientes, getPacienteById }