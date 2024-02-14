const express = require("express")
const bodyParser = require("body-parser")
var cors = require('cors')
const app = express()
const port = process.env.PORT || "3000"
const { authenticateConnection } = require("./middleware/connection")
const brigada = require("./DAO/BrigadaDao")
const brigadaRoutes = require("./routes/Brigada")
const pacienteRoutes = require("./routes/Paciente")


require('dotenv').config()

app.use(cors())

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use("/brigada", brigadaRoutes)
app.use("/paciente", pacienteRoutes)


authenticateConnection()

app.listen(port, () => {
    console.log(`App running on Port ${port}`);
});
