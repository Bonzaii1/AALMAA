const Pool = require("pg").Pool
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PGPORT
})

const getBrigadas = (request, response) => {
    pool.query('SELECT * FROM BRIGADA ORDER BY FECHA DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getBrigadaById = (request, response) => {
    const id = request.params.id
    pool.query('SELECT * FROM BRIGADA WHERE BRIGADA_ID = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createBrigada = (request, response) => {
    const { brigadaId, nombre, encargado, lugar, fecha, activo } = request.body

    pool.query('INSERT INTO BRIGADA (BRIGADA_ID, NOMBRE, ENCARGADO, LUGAR, FECHA, ACTIVO) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [brigadaId, nombre, encargado, lugar, fecha, activo], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}