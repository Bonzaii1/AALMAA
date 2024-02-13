const { Sequelize } = require("sequelize")
require('dotenv').config()


const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
})

const authenticateConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to Database Successful");
    } catch (error) {
        console.error("Unable to connect to Database: ", error);
    }
}


module.exports = { authenticateConnection, sequelize }


