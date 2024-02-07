import { useEffect, useState } from "react"
import { data } from "../../constants/Pacientes"
import ListLayout from "../../components/layouts/ListLayout"
import Table from "../../components/Table"
import useAlert from "../../hooks/useAlert"
import { generateHead, generateRows } from "../../logic/PacienteLogic"
import ModalForm from "../../components/layouts/ListData/ModalPaciente"
import Alert from "../../components/Alert"
import SideForm from "../../components/SideForm"


const Paciente = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredData, setFilteredData] = useState(data)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [alert, showAlert, hideAlert, closeAlert] = useAlert()

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
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
            <Table generateHead={generateHead()} generateRows={generateRows(filteredData)} />
            <ModalForm save={save} closeModal={closeModal} isModalOpen={isModalOpen} />
            {/* <SideForm>
                <h1>Test</h1>
            </SideForm> */}
            {alert.show && <Alert {...alert} />}
        </ListLayout>
    )
}

export default Paciente