import { useEffect, useReducer, useState } from "react"
import FormPaciente from "../../components/Forms/FormPaciente"
//import { paciente } from "../../constants/Pacientes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../Context/authContext"
import io from 'socket.io-client'
import { getOne, updateConsultor } from "../../api/routes/Paciente"
import { reducer } from "../../reducers/inputReducer"


const ViewModulo = () => {
    const [labels, setLabels] = useState({ nombre: "", edad: "", genero: "" })
    const [patient, setPatient] = useState({})
    const { user } = useAuth()
    const [state, dispatch] = useReducer(reducer, { estudiante: "", diagnostico: "" })
    const [currentStatus, setCurrentStatus] = useState("D")
    const [socketConfig, setSocketConfig] = useState(null)
    const SOCKET_URL = 'http://192.168.0.132:4000'

    useEffect(() => {

        const socket = io(SOCKET_URL)

        socket.on("connect", () => {
            console.log("Connected to server")
            user ? socket.emit("user-init", user) : socket.emit("user-init", {})

        })

        socket.on("modulo-init", (config) => {
            setSocketConfig(config)
            console.log(config)
        })

        socket.on("new-patient", async (pacienteId) => {

            try {
                const res = await getOne(pacienteId)
                setPatient(res.data)
                setLabels({ nombre: res.data.NOMBRE, edad: res.data.EDAD, genero: res.data.GENERO })
                setCurrentStatus("C")
            } catch (error) {
                console.log("ERROR: " + error)
            }



        })

        socket.on("disconnect", () => {
            console.log("Disconnected from server")
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
    }, [labels, patient, setCurrentStatus])


    const finishConsulta = async () => {
        try {
            const socket = io(SOCKET_URL)
            const params = {
                PACIENTE_ID: patient.PACIENTE_ID,
                ROL_ID: user ? user.ROL_ID : "",
                USUARIO_ID: state.estudiante === "" ? "" : state.estudiante.split("-")[0].trim(),
                NOMBRE_ESTUDIANTE: state.estudiante === "" ? "" : state.estudiante.split("-")[1].trim(),
                DIAGNOSTICO: state.diagnostico
            }

            setCurrentStatus("D")


            await updateConsultor(params)

            socket.emit("consult-over", socketConfig.socketId)
        } catch (error) {
            console.error("ERROR ON FINISH CONSULTA: " + error)
        }

    }

    return (
        <>
            {
                currentStatus === "D" ?
                    <section className='w-full h-full relative flex inset-0 items-center justify-center'>
                        <div className=''>
                            <h1 className="font-bold text-3xl">Esperando nuevo Paciente...</h1>
                        </div>
                    </section> :
                    <section className="w-full h-full flex flex-col">
                        <FormPaciente patient={patient} labels={labels} isForm={false} />
                        <div className="flex w-[90%] h-12 p-2 mt-4 ml-10 bg-gray-200 rounded-t-md items-center">
                            <FontAwesomeIcon icon={faBars} className="w-5 h-5 mr-3" />
                            <h1 className="font-semibold">Diagnostico Final</h1>
                        </div>
                        <div className="flex flex-col w-[90%] p-4 ml-10 bg-white rounded-b-md">
                            <label htmlFor="ENCARGADO" className="text-xl font-semibold ml-10">Encargado: {user ? user.USUARIO_ID : ""}</label>
                            <div className="flex items-center ml-10 my-2">
                                <label className="mr-2" htmlFor="ESTUDIANTE">Id de Estudiante: </label>
                                <input type="text" name="ESTUDIANTE" id="ESTUDIANTE" onChange={(e) => dispatch({ type: "update_name", nextName: e.target.value, key: "estudiante" })} className={`rounded-md w-56 border p-1 border-gray-300 hover:border-[#0072ff] `} placeholder={"Matricula - Nombre Completo"} />
                            </div>
                            <textarea onChange={(e) => dispatch({ type: "update_name", nextName: e.target.value, key: "diagnostico" })} className="p-3 ml-6 h-52 border-2 w-[95%] border-gray-200 hover:border-[#0072ff]" name="DIAGNOSTICO" id="DIAGNOSTICO" cols="30" rows="10" />

                            <button onClick={finishConsulta} className="w-1/5 h-12 m-3 ml-10 blue-btn">Terminar Consulta</button>
                        </div>

                    </section>
            }
        </>


    )
}

export default ViewModulo