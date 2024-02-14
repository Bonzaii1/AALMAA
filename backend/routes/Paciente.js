const express = require("express")
const router = express.Router()
const paciente = require("../DAO/PacienteDao")

router.get("/", (req, res) => {
    paciente.getPacientes(req, res)
})

module.exports = router