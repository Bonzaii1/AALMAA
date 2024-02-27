const express = require("express")
const bodyParser = require("body-parser")
var cors = require('cors')
const app = express()
const port = process.env.PORT || "3000"
const { authenticateConnection } = require("./middleware/connection")
const authRoutes = require("./routes/Auth")
const brigadaRoutes = require("./routes/Brigada")
const pacienteRoutes = require("./routes/Paciente")
const usuarioRoutes = require("./routes/Usuario")
const { authenticateToken } = require("./middleware/authenticateToken")


require('dotenv').config()

app.use(cors())

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use("/", authRoutes)
//app.use(authenticateToken)

app.use("/brigada", brigadaRoutes)
app.use("/paciente", pacienteRoutes)
app.use("/usuario", usuarioRoutes)


authenticateConnection()

app.listen(port, "192.168.0.132", () => {
    console.log(`App running on Port ${port}`);
});
