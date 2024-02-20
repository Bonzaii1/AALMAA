
const Usuario = require("../models/Usuario")
const Rol = require("../models/Rol")

const association = () => {
    Usuario.belongsTo(Rol, { foreignKey: "ROL_ID", as: "Rol" })
    Rol.hasMany(Usuario)
}

module.exports = { association }