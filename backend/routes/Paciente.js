const express = require("express")
const router = express.Router()
const paciente = require("../DAO/PacienteDao")

router.get("/", (req, res) => {
    paciente.getPacientes(req, res)
})

router.get("/:id", (req, res) => {
    paciente.getPacienteById(req, res)
})

router.post("/insert", (req, res) => {
    paciente.insertPaciente(req, res)
})

router.put("/update", (req, res) => {
    paciente.updatePaciente(req, res)
})

router.delete("/delete/:id", (req, res) => {
    paciente.deletePaciente(req, res)
})

router.put("/test", (req, res) => {
    paciente.testCall(req, res)
})

module.exports = router