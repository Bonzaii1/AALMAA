import { useEffect, useState } from 'react'
//import buttonSound from '../../assets/sounds/button.mp3'
import buttonSound from '../../assets/sounds/quick.mp3'
import io from 'socket.io-client'
import { useAuth } from '../../Context/authContext'
import Modal from '../../components/Modals/Modal'
import { getByModulo, updateEstado } from '../../api/routes/Paciente'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons'
import useAlert from '../../hooks/useAlert'
import Alert from '../../components/Alert'

const ViewRecep = () => {
    const { user } = useAuth()
    const [alert, showAlert, hideAlert, closeAlert] = useAlert()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [socketConfig, setSocketConfig] = useState(null)
    const [currentSocketId, setCurrentSocketId] = useState("")
    const [currentRol, setCurrentRol] = useState("")
    const [listSinPaciente, setListSinPaciente] = useState([])
    const [listConsulta, setListConsulta] = useState([])
    const [listInactivo, setListInactivo] = useState([])
    const [lisPacientes, setLisPacientes] = useState([])
    const [sinPacientelength, setSinPacienteLength] = useState(listSinPaciente.length)
    const SOCKET_URL = 'http://localhost:4000'

    const playSound = () => {
        const audio = new Audio(buttonSound)
        audio.play()
    }

    useEffect(() => {
        const socket = io(SOCKET_URL)

        socket.on("connect", () => {
            console.log("Connected to server")
            user ? socket.emit("user-init", user) : socket.emit("user-init", {})

        })

        socket.on("hub-init", (conf) => {
            setSocketConfig(conf)

            for (const [key, value] of Object.entries(conf.modules)) {
                const json = JSON.parse(value)
                json.user.socketId = key
                json.state === "D" ? setListSinPaciente(prev => [...prev, json.user]) : json.state === "C" ? setListConsulta(prev => [...prev, json.user]) : setListInactivo(prev => [...prev, json.user])

            }
        })

        socket.on("update-modules", (mod) => {
            console.log(mod)
            let count = 0
            setListSinPaciente([])
            setListConsulta([])
            setListInactivo([])
            console.log("length: ", sinPacientelength)
            for (const [key, value] of Object.entries(mod.modules)) {
                const json = JSON.parse(value)
                console.log(json)
                json.user.socketId = key
                json.state === "D" && count++
                console.log("count: ", count)
                json.state === "D" ? setListSinPaciente(prev => [...prev, json.user]) : json.state === "C" ? setListConsulta(prev => [...prev, json.user]) : setListInactivo(prev => [...prev, json.user])
            }

            if (count > sinPacientelength) {
                playSound()
            }
            setSinPacienteLength(count)
        })

        socket.on()

        socket.on("disconnect", () => {
            console.log("Disconnected from server")
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
        console.log(listSinPaciente)
    }, [listSinPaciente, listConsulta, listInactivo])

    const onOpen = async (modId, socketId) => {
        const res = await getByModulo(modId)
        setLisPacientes(res.data)
        setCurrentSocketId(socketId)
        setCurrentRol(modId)
        setIsModalOpen(true)
    }

    const onClose = () => {
        setCurrentSocketId("")
        setCurrentRol("")
        setIsModalOpen(false)
    }

    const sendPatient = (pacienteId) => {
        const socket = io(SOCKET_URL)
        socket.emit("send-patient", { socket: currentSocketId, pacienteId: pacienteId }, async (response) => {
            onClose()

            if (response.status) {

                await updateEstado({ PACIENTE_ID: pacienteId, ROL_ID: currentRol, ESTADO: "C" })

                showAlert({ text: "Paciente Mandado!", type: "success" })

                setTimeout(() => {
                    closeAlert({ text: "Paciente Mandado!", type: "success" })
                }, 3000)

                setTimeout(() => {
                    hideAlert()
                }, 10)
            } else {
                showAlert({ text: "ERROR!", type: "danger" })

                setTimeout(() => {
                    closeAlert({ text: "ERROR!", type: "danger" })
                }, 3000)

                setTimeout(() => {
                    hideAlert()
                }, 10)
            }
        })

    }


    return (
        <section className='flex h-full w-full p-10 justify-evenly'>

            <div className='w-1/4 h-full'>

                <div className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <h1 className="text-2xl font-semibold">Disponible</h1>
                        <h1 className='text-xl p-2 bg-green-400 rounded-md font-semibold'>{listSinPaciente.length}</h1>
                    </div>

                    <td className="w-full border-b-2 border-gray-400 flex justify-evenly mt-3" />



                </div>

                <div className="custom-scrollbar w-full h-96 overflow-y-auto">
                    <div className="flex flex-col my-4">


                        {
                            listSinPaciente.map((mod, index) => (
                                <>
                                    <div key={index} className="flex flex-col w-full h-28 bg-white p-2 rounded-md my-2">

                                        <div className="flex justify-evenly">
                                            <h1 className="text-lg font-semibold text-gray-500">{mod.NOMBRE} - {mod.USUARIO_ID}</h1>
                                            <h1 className="text-lg font-semibold text-gray-500">{mod.ROL_ID}</h1>
                                        </div>
                                        <td className="w-full border-b-2 border-gray-200 flex justify-evenly mt-3" />

                                        <button onClick={() => onOpen(mod.ROL_ID, mod.socketId)} className="w-1/4 h-12 p-1 m-2 blue-btn">Asignar</button>
                                    </div>
                                </>
                            ))
                        }

                    </div>
                </div>


            </div>

            <div className='w-1/4 h-full '>

                <div className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <h1 className="text-2xl font-semibold">En Consulta</h1>
                        <h1 className='text-xl p-2 bg-yellow-300 rounded-md font-semibold'>{listConsulta.length}</h1>
                    </div>

                    <td className="w-full border-b-2 border-gray-400 flex justify-evenly mt-3" />

                </div>

                <div className="custom-scrollbar w-full h-96 overflow-y-auto">
                    <div className="flex flex-col my-4">

                        {
                            listConsulta.map((mod, index) => (
                                <>
                                    <div key={index} className="flex flex-col w-full h-28 bg-white p-2 rounded-md my-2">

                                        <div className="flex justify-evenly">
                                            <h1 className="text-lg font-semibold text-gray-500">{mod.NOMBRE} - {mod.USUARIO_ID}</h1>
                                            <h1 className="text-lg font-semibold text-gray-500">{mod.ROL_ID}</h1>
                                        </div>
                                        <td className="w-full border-b-2 border-gray-200 flex justify-evenly mt-3" />

                                    </div>
                                </>
                            ))
                        }



                    </div>
                </div>

            </div>

            <div className='w-1/4 h-full '>

                <div className='flex flex-col'>
                    <div className='flex justify-between items-center'>
                        <h1 className="text-2xl font-semibold">Inactivo</h1>
                        <h1 className='text-xl p-2 bg-red-300 rounded-md font-semibold'>{listInactivo.length}</h1>
                    </div>

                    <td className="w-full border-b-2 border-gray-400 flex justify-evenly mt-3" />

                </div>
                <div className="custom-scrollbar w-full h-96 overflow-y-auto">
                    <div className="flex flex-col my-4">


                    </div>
                </div>



            </div>


            <Modal isOpen={isModalOpen} onClose={onClose} title={"Lista Pacientes"} >

                <div className="flex flex-col p-6 h-96 overflow-y-scroll">

                    {
                        lisPacientes.map((paciente, index) => (
                            <>
                                <div key={index} className='flex w-full h-1 my-4 justify-evenly'>
                                    <FontAwesomeIcon icon={faUser} className='w-6 h-6' />
                                    <h1>{paciente.NOMBRE}</h1>
                                    <h1>{paciente.EDAD}</h1>
                                    <h1>{paciente.GENERO == "H" ? "Hombre" : paciente.GENERO ? "Mujer" : "Otro"}</h1>
                                    <div onClick={() => sendPatient(paciente.PACIENTE_ID)} className=' hover:cursor-pointer'>
                                        <FontAwesomeIcon icon={faArrowRight} className='w-6 h-6' />
                                    </div>

                                </div>
                                <td className="w-full border-b-2 border-gray-200 flex justify-evenly mt-3" />
                            </>
                        ))
                    }

                </div>
            </Modal>
            {alert.show && <Alert {...alert} isForm={false} />}
        </section>
    )
}

export default ViewRecep