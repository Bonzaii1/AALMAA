const { Op } = require("sequelize")
const { sequelize } = require("../middleware/connection")
const Paciente = require("../models/Paciente")
const Rol = require("../models/Rol")
const { association, PacienteRol } = require("../models/Paciente_Rol")


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

const numeroPacientesPorUsuario = async (request, response) => {
    const id = request.params.id
    console.log(id)
    try {
        const num = await Paciente.findOne({
            attributes:
                [[sequelize.literal('RIGHT("PACIENTE_ID", 3)'), "NUM"]]
            ,
            where: {
                PACIENTE_ID: {
                    [Op.like]: `%${id}%`
                }
            },
            order: sequelize.literal('RIGHT("PACIENTE_ID", 3)::INTEGER DESC'),
            limit: 1
        })
        response.status(200).send(num.dataValues.NUM)
    } catch (error) {
        console.log("Error in PacienteDao in method numeroPacientesPorUsuario: ", error);
        response.status(500).send("Internal Server Error");

    }


}

const insertPaciente = async (request, response) => {
    const { PACIENTE_ID, NOMBRE, EDAD, GENERO, NOMBRE_RECEP } = request.body
    console.log(PACIENTE_ID, NOMBRE, EDAD, GENERO)
    try {
        await Paciente.create({
            PACIENTE_ID: PACIENTE_ID,
            NOMBRE: NOMBRE,
            EDAD: EDAD,
            GENERO: GENERO,
            NOMBRE_RECEP: NOMBRE_RECEP
        })

        getPacientes(request, response)
    } catch (error) {
        console.log("Error in PacienteDao in method insertPaciente: ", error);
        response.status(500).send("Internal Server Error");
    }

}

const updatePaciente = async (request, response) => {
    const { PACIENTE_ID, NOMBRE, EDAD, GENERO, ESTADO_CIVIL, RELIGION, OCUPACION, DIRECCION, CIUDAD, PESO, TALLA, TA, FCAR, FRESP, TEMPE, ALERGIAS, APP, PADECIMIENTO, Rols } = request.body

    try {
        const updatedPaciente = await Paciente.update({ NOMBRE, EDAD, GENERO, ESTADO_CIVIL, RELIGION, OCUPACION, DIRECCION, CIUDAD, PESO, TALLA, TA, FCAR, FRESP, TEMPE, ALERGIAS, APP, PADECIMIENTO }, { where: { PACIENTE_ID }, returning: true })

        if (updatedPaciente[0] === 0) {
            return response.status(404).json({ error: 'Paciente not found' });
        }

        for (r of Rols) {
            await PacienteRol.findOrCreate({
                where: { PACIENTE_ID: PACIENTE_ID, ROL_ID: r.ROL_ID },
                defaults: {
                    PACIENTE_ID: PACIENTE_ID,
                    ROL_ID: r.ROL_ID
                }
            })
        }

        const pacienteRol = await PacienteRol.findAll({ where: { PACIENTE_ID: PACIENTE_ID } })

        for (p of pacienteRol) {
            if (!Rols.some(obj => obj.ROL_ID === p.ROL_ID)) {
                await PacienteRol.destroy({ where: { PACIENTE_ID: PACIENTE_ID, ROL_ID: p.ROL_ID } })
            }
        }


        return response.status(200).json(updatedPaciente[1][0].dataValues)
    } catch (error) {
        console.log("Error in PacienteDao in method updatePaciente: ", error);
        response.status(500).send("Internal Server Error");
    }
}

const deletePaciente = async (request, response) => {
    const id = request.params.id
    try {
        await PacienteRol.destroy({
            where: {
                PACIENTE_ID: id
            }
        })

        await Paciente.destroy({
            where: {
                PACIENTE_ID: id
            }
        })
        getPacientes(request, response)
    } catch (error) {
        console.log("Error in PacienteDao in method deletePaciente: ", error);
        response.status(500).send("Internal Server Error");
    }
}

const testCall = async (request, response) => {
    const { PACIENTE_ID, NOMBRE, EDAD, GENERO, ESTADO_CIVIL, RELIGION, OCUPACION, DIRECCION, CIUDAD, PESO, TALLA, TA, FCAR, FRESP, TEMPE, ALERGIAS, APP, PADECIMIENTO, Rols } = request.body
    try {
        console.log(PACIENTE_ID, NOMBRE, EDAD, GENERO, ESTADO_CIVIL, RELIGION, OCUPACION, DIRECCION, CIUDAD, PESO, TALLA, TA, FCAR, FRESP, TEMPE, ALERGIAS, APP, PADECIMIENTO, Rols)
        response.status(200).json(request.body)
    } catch (error) {
        console.log("Error in PacienteDao in method testCall: ", error);
        response.status(500).send("Internal Server Error");
    }

}


module.exports = { getPacientes, getPacienteById, numeroPacientesPorUsuario, insertPaciente, updatePaciente, deletePaciente, testCall }