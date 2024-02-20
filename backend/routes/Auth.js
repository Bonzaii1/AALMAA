const express = require("express")
const router = express.Router()
const Usuario = require("../DAO/UsuarioDao")
const jwt = require("jsonwebtoken")

router.post("/login", async (req, res) => {
    const usuario = await Usuario.verifyUsuario(req, res)
    if (usuario) {
        //const accessToken = jwt.sign(usuario.dataValues, process.env.ACCESS_TOKEN_SECRET)

        res.status(200).json(usuario)
    } else {
        res.status(401).send(false)
    }
})

// router.post("/token", (req, res) => {
//     const refreshToken = req.body.token
// })


module.exports = router