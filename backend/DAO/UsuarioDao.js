const { Op } = require("sequelize")
const { sequelize } = require("../middleware/connection")
const Usuario = require("../models/Usuario")
const Rol = require("../models/Rol")
const { association } = require("../models/Usuario_Rol")
const Paciente = require("../models/Paciente")

//association()

const getUsuarios = async (request, response) => {
    try {
        const usuarios = await Usuario.findAll()

        if (usuarios.length == 0) return response.status(401).send("No Usuarios Found")

        response.status(200).json(usuarios)
    } catch (error) {
        console.log("Error in UsuarioDao in method getUsuarios: ", error);
        response.status(500).send("Internal Server Error");
    }
}

const getUsuarioById = async (request, response) => {
    const id = request.params.id
    try {
        const usuario = await Usuario.findByPk(id)

        if (!usuario) return response.status(401).send("Usuario not Found")
        console.log(usuario)
        response.status(200).json(usuario)
    } catch (error) {
        console.log("Error in UsuarioDao in method getUsuarioById: ", error);
        response.status(500).send("Internal Server Error");
    }
}

const verifyUsuario = async (request, response) => {
    const { id, pass } = request.body
    try {
        const usuario = await Usuario.findByPk(id)

        if (!usuario) {
            //response.status(401).send(false)
            return false
        }

        if (usuario.dataValues.CLAVE === pass) {
            //response.status(200).send(true);
            return usuario;
        }
        else {
            //response.status(401).send(false)
            return false
        }

    } catch (error) {
        console.log("Error in UsuarioDao in method verifyUsuario: ", error);
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
        console.log("Error in UsuarioDao in method numeroPacientesPorUsuario: ", error);
        response.status(500).send("Internal Server Error");

    }
}

module.exports = { getUsuarios, getUsuarioById, verifyUsuario, numeroPacientesPorUsuario }