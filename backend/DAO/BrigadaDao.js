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


const getBrigadas = async (request, response) => {
    try {
        const brigadas = await Brigada.findAll({
            order: [["FECHA", "DESC"]]
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


module.exports = { getBrigadas, getBrigadaById, insertBrigada, deleteBrigada }