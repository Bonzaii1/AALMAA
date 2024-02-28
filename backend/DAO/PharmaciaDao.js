const { sequelize } = require("../middleware/connection")
const Pharmacia = require("../models/Pharmacia")


const getMedicina = async (request, response) => {
    try {
        const pharmacia = await Pharmacia.findAll()

        response.status(200).json(pharmacia)
    } catch (error) {
        console.log("Error in PacienteDao in method getMedicina: ", error);
        response.status(500).send("Internal Server Error");

    }
}

const getMedicinaById = async (request, response) => {
    try {
        const id = request.params.id

        const pharmacia = await Pharmacia.findByPk(id)
        response.status(200).json(pharmacia)
    } catch (error) {
        console.log("Error in PacienteDao in method getMedicinaById: ", error);
        response.status(500).send("Internal Server Error");
    }

}

const insertPharmacia = async (request, response) => {
    const { NOMBRE, CANTIDAD } = request.body
    try {
        const { count, rows } = await Pharmacia.findAndCountAll()
        const ID = count < 10 ? "00" + count : count < 100 ? "0" + count : count

        await Pharmacia.create({
            ID: ID,
            NOMBRE: NOMBRE,
            CANTIDAD: CANTIDAD
        })

        getMedicina(request, response)

    } catch (error) {
        console.log("Error in PacienteDao in method insertPharmacia: ", error);
        response.status(500).send("Internal Server Error");
    }

}

const updatePharmacia = async (request, response) => {
    const { ID, NOMBRE, CANTIDAD } = request.body
    try {
        const updatedPharmacia = Pharmacia.update({ NOMBRE, CANTIDAD }, { where: { ID }, returning: true })
        if (updatedPharmacia[0] === 0) {
            return response.status(404).json({ error: 'Paciente not found' });
        }

        return response.status(200).json(updatedPharmacia[1][0].dataValues)
    } catch (error) {
        console.log("Error in PacienteDao in method updatePharmacia: ", error);
        response.status(500).send("Internal Server Error");
    }
}

const deletePharmacia = async (request, response) => {
    const id = request.params.id
    try {
        await Pharmacia.destroy({
            where: {
                ID: id
            }
        })

        getPacientes(request, response)
    } catch (error) {
        console.log("Error in PacienteDao in method deletePharmacia: ", error);
        response.status(500).send("Internal Server Error");
    }
}

module.exports = { getMedicina, getMedicinaById, insertPharmacia, updatePharmacia, deletePharmacia }