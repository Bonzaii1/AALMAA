const express = require("express")
const http = require("http")
const socketIo = require("socket.io")

const app = express()
const server = http.createServer(app)

let clientCount = 0;
let modules = new Map()
let hub = new Map()

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3500",
        methods: ["GET", "POST"]
    }
})



io.on('connection', (socket) => {



    socket.on("user-init", (user) => {
        try {
            if (user.ROL_ID !== "HUB") {
                socket.emit('modulo-init', { socketId: socket.id })
                modules.set(socket.id, JSON.stringify({ user, state: "D" }))
                io.to("HUB").emit("update-modules", { modules: Object.fromEntries(modules) })
            } else {
                socket.join("HUB")
                socket.emit('hub-init', { socketId: socket.id, modules: Object.fromEntries(modules) })
                hub.set(socket.id, JSON.stringify(user))
            }
            clientCount++;
            console.log(`Client ${socket.id} is connected. Total Clients `, clientCount)
            console.log(modules, ":", hub)
        } catch (error) {
            console.log("ERROR IN USERINIT: ", error)
        }

    })

    socket.on("send-patient", (details, callback) => {
        let status = true
        try {
            socket.to(details.socket).emit("new-patient", details.pacienteId)
            let value = JSON.parse(modules.get(details.socket))
            const user = value.user
            modules.set(details.socket, JSON.stringify({ user, state: "C" }))
        } catch (error) {
            console.log("THERE WAS AN ERROR ON SEND-PATIENT: " + error)
            status = false
        }
        io.to("HUB").emit("update-modules", { modules: Object.fromEntries(modules) })
        callback({
            status: status
        })
    })

    socket.on("consult-over", (socketId) => {
        console.log(socketId)
        try {
            let value = JSON.parse(modules.get(socketId))
            const user = value.user
            modules.set(socketId, JSON.stringify({ user, state: "D" }))
            io.to("HUB").emit("update-modules", { modules: Object.fromEntries(modules) })
        } catch (error) {
            console.log("THERE WAS AN ERROR ON CONSULT-OVER: " + error)

        }
    })

    socket.on("disconnect", () => {
        if (hub.has(socket.id)) {
            hub.delete(socket.id)
        } else {
            modules.delete(socket.id)
            io.to("HUB").emit("update-modules", { modules: Object.fromEntries(modules) })
        }
        clientCount--;
        console.log(`Client ${socket.id} disconnectetd. Total Clients: `, clientCount)
    })
})


const port = process.env.PORTIO || 4000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
