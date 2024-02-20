const express = require("express")
const router = express.Router()
const usuario = require("../DAO/UsuarioDao")

router.get("/", (req, res) => {
    usuario.getUsuarios(req, res)
})

router.get("/num/:id", (req, res) => {
    usuario.numeroPacientesPorUsuario(req, res)
})

router.get("/:id", (req, res) => {
    usuario.getUsuarioById(req, res)
})




module.exports = router