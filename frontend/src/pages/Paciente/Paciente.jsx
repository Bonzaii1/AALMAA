import { useEffect, useState } from "react"
import { data } from "../../constants/Pacientes"
import ListLayout from "../../components/layouts/ListLayout"
import Table from "../../components/Table"
import useAlert from "../../hooks/useAlert"
import { generateForm, generateHead, generateRows } from "../../logic/PacienteLogic"
import ModalForm from "../../components/layouts/ListData/ModalPaciente"
import Alert from "../../components/Alert"
import SideForm from "../../components/SideForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPersonRifle, faBars, faClipboard } from "@fortawesome/free-solid-svg-icons"



const Paciente = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredData, setFilteredData] = useState(data)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [patient, setPatient] = useState({})
    const [alert, showAlert, hideAlert, closeAlert] = useAlert()

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const openForm = (id) => {
        setPatient(data[id - 1])
        setIsFormOpen(true)
    }

    const closeForm = () => {
        setIsFormOpen(false)
    }

    const save = (e) => {
        e.preventDefault();
        console.log("IN")
        const nombre = e.target.elements.nombre.value
        const edad = e.target.elements.edad.value
        const genero = e.target.elements.genero.value

        const paciente = {
            id: data.length + 1,
            nombre: nombre,
            edad: edad,
            genero: genero,
            peso: 0,
            modulos: 0
        }

        data.push(paciente)
        closeModal()
        showAlert({ text: "Paciente Guardado!", type: "success" })

        setTimeout(() => {
            closeAlert({ text: "Paciente Guardado!", type: "success" })
        }, 3000)

        setTimeout(() => {
            hideAlert()
        }, 10)

    }

    const saveData = () => {

    }

    useEffect(() => {
        if (searchQuery !== "") {
            const filtered = data.filter((item) => {
                const lowerCaseNombre = item.nombre.toLowerCase();
                const lowerCaseQuery = searchQuery.toLowerCase();

                return lowerCaseNombre.substring(0, lowerCaseQuery.length) === lowerCaseQuery;
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }

    }, [searchQuery, data])



    return (
        <ListLayout openModal={openModal} setSearchQuery={setSearchQuery}>
            <Table generateHead={generateHead()} generateRows={generateRows(filteredData, openForm)} />
            <ModalForm save={save} closeModal={closeModal} isModalOpen={isModalOpen} />
            <SideForm isOpen={isFormOpen} onClose={closeForm}>
                <div className="flex flex-col w-full h-full bg-light-2">
                    <div className="flex w-full h-1/4 mt-8 ml-20 items-center">
                        <FontAwesomeIcon icon={faPersonRifle} className="w-20 h-20" />
                        <div className="flex flex-col px-8 font-semibold">
                            <h1 className="text-3xl ">{patient.nombre}</h1>
                            <p className="text-small">Edad: {patient.edad}</p>
                            <p className="text-small">Genero: {patient.genero ? "Hombre" : "Mujer"}</p>
                        </div>

                    </div>
                    <form onSubmit={saveData}>
                        <div className="flex w-[90%] h-12 p-2 mt-4 ml-10 bg-gray-200 rounded-t-md items-center">
                            <FontAwesomeIcon icon={faClipboard} className="w-5 h-5 mr-3" />
                            <h1 className="font-semibold">Datos Personales</h1>
                        </div>
                        <div className="flex flex-col w-[90%] h-auto p-2 ml-10 bg-white rounded-md">

                            {
                                generateForm()
                            }


                        </div>


                        <div className="flex w-[90%] h-12 p-2 mt-4 ml-10 bg-gray-200 rounded-t-md items-center">
                            <FontAwesomeIcon icon={faBars} className="w-5 h-5 mr-3" />
                            <h1 className="font-semibold">Padecimiento Actual</h1>
                        </div>
                        <div className="flex w-[90%] h-20 p-2 ml-10 bg-white rounded-b-md">
                            <h1>Test</h1>
                        </div>
                    </form>
                </div>
            </SideForm>
            {alert.show && <Alert {...alert} />}
        </ListLayout>
    )
}

export default Paciente