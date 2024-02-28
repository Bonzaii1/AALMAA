const express = require("express")
const router = express.Router()
const Pharmacia = require("../DAO/PharmaciaDao")

router.get("/", (req, res) => {
    Pharmacia.getMedicina(req, res)
})

router.get("/:id", (req, res) => {
    Pharmacia.getMedicinaById(req, res)
})

router.put("/insert", (req, res) => {
    Pharmacia.insertPharmacia(req, res)
})

router.post("/update", (req, res) => {
    Pharmacia.updatePharmacia(req, res)
})

router.delete("/delete/:id", (req, res) => {
    Pharmacia.deletePharmacia(req, res)
})

module.exports = router