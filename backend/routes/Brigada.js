const express = require("express")
const router = express.Router()
const brigada = require("../DAO/BrigadaDao")

router.get("/", (req, res) => {
    brigada.getBrigadas(req, res)
})

router.get("/activo", (req, res) => {
    brigada.getBrigadaActivo(req, res)
})

router.get("/:id", (req, res) => {
    brigada.getBrigadaById(req, res)
})

router.post("/insert", (req, res) => {
    brigada.insertBrigada(req, res)
})

router.put("/update", (req, res) => {
    brigada.updateBrigada(req, res)
})

router.delete("/delete/:id", (req, res) => {
    brigada.deleteBrigada(req, res)
})

module.exports = router