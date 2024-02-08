import { useEffect, useState } from "react"
import { data } from "../../constants/Pacientes"
import ListLayout from "../../components/layouts/ListLayout"
import Table from "../../components/Table"
import useAlert from "../../hooks/useAlert"
import { generateHead, generateRows } from "../../logic/PacienteLogic"
import ModalForm from "../../components/layouts/ListData/ModalPaciente"
import Alert from "../../components/Alert"
import SideForm from "../../components/SideForm"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPersonRifle } from "@fortawesome/free-solid-svg-icons"


const Paciente = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredData, setFilteredData] = useState(data)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [alert, showAlert, hideAlert, closeAlert] = useAlert()

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const openForm = () => {
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
                            <h1 className="text-3xl ">John Doe</h1>
                            <p className="text-small">Edad: 24</p>
                            <p className="text-small">Genero: Hombre</p>
                        </div>

                    </div>

                    <div className="flex flex-col w-[90%] h-80  mt-4 ml-10 bg-white rounded-md">
                        <div className="flex mx-8 my-2">
                            <div className="flex flex-col">
                                <label htmlFor="EstadoCivil" className="font-light py-2">Estado Civil</label>
                                <select name="EstadoCivil" id="EstadoCivil" className="rounded-md w-full border border-gray-300 hover:border-[#0072ff]">
                                    <option value="">--Elige Estado--</option>
                                    <option value="S">Soltero</option>
                                    <option value="C">Casado</option>
                                </select>

                            </div>

                        </div>
                    </div>

                </div>
            </SideForm>
            {alert.show && <Alert {...alert} />}
        </ListLayout>
    )
}

export default Paciente