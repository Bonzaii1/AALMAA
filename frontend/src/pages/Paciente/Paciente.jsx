import { useEffect, useState } from "react"
import { data } from "../../constants/Pacientes"
import ListLayout from "../../components/layouts/ListLayout"
import FormPaciente from "../../components/Forms/FormPaciente"
import Table from "../../components/Table"
import useAlert from "../../hooks/useAlert"
import { generateHead, generateRows } from "../../logic/PacienteLogic"
import ModalForm from "../../components/layouts/ListData/ModalPaciente"
import Alert from "../../components/Alert"
import SideForm from "../../components/SideForm"
import { getAll, getOne } from "../../api/routes/Paciente"



const Paciente = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [patient, setPatient] = useState({})
    const [alert, showAlert, hideAlert, closeAlert] = useAlert()
    const [labels, setLabels] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAll()
                setData(response.data)
            } catch (error) {
                console.error("Error fetching Brigadas: ", error)
                showAlert({ text: "ERROR!", type: "danger" })

                setTimeout(() => {
                    closeAlert({ text: "ERROR!", type: "danger" })
                }, 3000)

                setTimeout(() => {
                    hideAlert()
                }, 10)
            }
        }

        fetchData()
    }, [])

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const openForm = async (id) => {
        const res = await getOne(id)
        setPatient(res.data)
        setLabels({ nombre: res.data.NOMBRE, edad: res.data.EDAD, genero: res.data.GENERO })
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
                const lowerCaseNombre = item.NOMBRE.toLowerCase();
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
                <FormPaciente patient={patient} labels={labels} setLabels={setLabels} />
            </SideForm>
            {alert.show && <Alert {...alert} />}
        </ListLayout>
    )
}

export default Paciente