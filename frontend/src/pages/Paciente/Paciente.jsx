import { useEffect, useReducer, useState } from "react"
import { reducer } from "../../reducers/inputReducer"
import { useAuth } from "../../Context/authContext"
import ListLayout from "../../components/layouts/ListLayout"
import FormPaciente from "../../components/Forms/FormPaciente"
import Table from "../../components/Table"
import useAlert from "../../hooks/useAlert"
import { generateHead, generateRows } from "../../logic/PacienteLogic"
import ModalForm from "../../components/layouts/ListData/ModalPaciente"
import Alert from "../../components/Alert"
import SideForm from "../../components/SideForm"
import { deleteOne, getAll, getOne, addOne } from "../../api/routes/Paciente"
import { getBrigadaActivo } from "../../api/routes/Brigada"



const Paciente = () => {
    const [activeBrigada, setActiveBrigada] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [patient, setPatient] = useState({})
    const [state, dispatch] = useReducer(reducer, { nombre: "", edad: "", genero: "" })
    const [alert, showAlert, hideAlert, closeAlert] = useAlert()
    const [labels, setLabels] = useState({})
    const { user } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAll()
                setData(response.data)

                const res = await getBrigadaActivo()
                setActiveBrigada(res.data)

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

    const scrollToContainer = () => {
        const container = document.getElementById("top");
        console.log(container)
        container.scrollIntoView({ behavior: "smooth" });
    };

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

    const save = async (e) => {
        e.preventDefault();
        const brigada = activeBrigada
        const usuario = user ? user.USUARIO_ID : ""
        const n = data.filter((patient) => { return patient.PACIENTE_ID.includes(user ? user.USUARIO_ID : "") }).length + 1
        const num = n < 10 ? "00" + n.toString() : n < 100 ? "0" + n.toString() : n.toString()

        const id = brigada + "-" + usuario + "-" + num

        const paciente = {
            PACIENTE_ID: id,
            NOMBRE: state.nombre,
            EDAD: state.edad,
            GENERO: state.genero,
            NOMBRE_RECEP: user ? user.NOMBRE : ""
        }


        try {
            const res = await addOne(paciente)
            setData(res.data)
            closeModal()
            showAlert({ text: "Paciente Guardado!", type: "success" })

            setTimeout(() => {
                closeAlert({ text: "Paciente Guardado!", type: "success" })
            }, 3000)

            setTimeout(() => {
                hideAlert()
            }, 10)

            openForm(id)

        } catch (error) {
            console.error(error)
            closeModal()
            showAlert({ text: "ERROR!", type: "danger" })

            setTimeout(() => {
                closeAlert({ text: "ERROR!", type: "danger" })
            }, 3000)

            setTimeout(() => {
                hideAlert()
            }, 10)
        }


    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this patient?");

        if (confirmed) {
            console.log(id)
            try {
                const res = await deleteOne(id)
                setData(res.data)
                setFilteredData(res.data)
                showAlert({ text: "Paciente Borrada!", type: "success" })

                setTimeout(() => {
                    closeAlert({ text: "Paciente borrada!", type: "success" })
                }, 3000)

                setTimeout(() => {
                    hideAlert()
                }, 10)
            } catch (error) {
                console.error("ERROR IN PACIENTE ", error)
                showAlert({ text: "ERROR!", type: "danger" })

                setTimeout(() => {
                    closeAlert({ text: "ERROR!", type: "danger" })
                }, 3000)

                setTimeout(() => {
                    hideAlert()
                }, 10)
            }
        }
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
            <Table generateHead={generateHead()} generateRows={generateRows(filteredData, openForm, handleDelete)} />
            <ModalForm save={save} closeModal={closeModal} isModalOpen={isModalOpen} dispatch={dispatch} />
            <SideForm isOpen={isFormOpen} onClose={closeForm}>
                <FormPaciente patient={patient} setPatient={setPatient} labels={labels} setLabels={setLabels} setData={setData} scrollToContainer={scrollToContainer} />
            </SideForm>
            {alert.show && <Alert {...alert} isForm={false} />}
        </ListLayout>
    )
}

export default Paciente