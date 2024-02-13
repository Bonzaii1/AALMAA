const { sequelize } = require("../middleware/connection")
const Brigada = require("../models/Brigada")
const Rol = require("../models/Rol")
const association = require("../models/Brigada_Rol")


association()

const getBrigadas = async (request, response) => {
    try {
        const brigadas = await Brigada.findAll({
            order: [["FECHA", "DESC"]],
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
            group: ["Brigada.BRIGADA_ID"]
        })


        response.status(200).json(brigadas)
    } catch (error) {
        console.log("Error in BrigadaDao in method getBrigadas: ", error);
        response.status(500).send("Internal Server Error");
    }
}

const getBrigadaById = async (request, response) => {
    const id = request.params.id
    try {
        const brigada = await Brigada.findByPk(id)
        response.status(200).json(brigada)
    } catch (error) {
        console.log("Error in BrigadaDao in method getBrigadasById: ", error);
        response.status(500).send("Internal Server Error");
    }
}

const insertBrigada = async (request, response) => {
    const body = request.body

    try {
        await Brigada.create(body)

        // Fetch all brigadas after insertion
        const brigadas = await Brigada.findAll({
            order: [["FECHA", "DESC"]]
        });

        // Send the response with the fetched brigadas
        response.status(200).json(brigadas);
    } catch (error) {
        console.error("Error in BrigadaDao in insertBrigada: ", error)
        response.status(500).send("Internal Server Error")
    }
}

const deleteBrigada = async (request, response) => {
    const id = request.params.id
    try {
        const brigada = await Brigada.findByPk(id)

        if (!brigada) {
            return response.status(404).json({ error: 'Brigada not found' });
        }

        await brigada.destroy()

        const brigadas = await Brigada.findAll({ order: [["FECHA", "DESC"]] })

        return response.status(200).json(brigadas)
    } catch (error) {
        console.error("Error in BrigadaDao in deleteBrigada: ", error)
        response.status(500).send("Internal Server Error")
    }
}

const updateBrigada = async (request, response) => {
    const { BRIGADA_ID, NOMBRE, LUGAR, ENCARGADO, FECHA, ACTIVO } = request.body
    try {
        const updatedBrigada = await Brigada.update({ NOMBRE, LUGAR, ENCARGADO, FECHA, ACTIVO }, { where: { BRIGADA_ID }, returning: true })

        if (updatedBrigada[0] === 0) {
            return response.status(404).json({ error: 'Brigada not found' });
        }

        return response.status(200).json(updatedBrigada[1][0].dataValues)

    } catch (error) {
        console.error("Error in BrigadaDao in updateBrigada: ", error)
        response.status(500).send("Internal Server Error")
    }
}



module.exports = { getBrigadas, getBrigadaById, insertBrigada, updateBrigada, deleteBrigada }