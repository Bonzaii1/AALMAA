import { useEffect, useState } from "react"
import { data } from "../../constants/Brigadas"
import Alert from "../../components/Alert"
import useAlert from "../../hooks/useAlert"
import ListLayout from "../../components/layouts/ListLayout"
import Table from "../../components/Table"
import ModalForm from "../../components/layouts/ListData/ModalBrigada"
import { generateHead, generateRows } from "../../logic/BrigadaLogic"


const Brigada = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredData, setFilteredData] = useState(data)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, showAlert, closeAlert, hideAlert] = useAlert();

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const save = (e) => {
        e.preventDefault();

        const nombre = e.target.elements.nombre.value
        const lugar = e.target.elements.lugar.value

        const brigada = {
            id: data.length + 1,
            nombre: nombre,
            lugar: lugar,
            fecha: "TBD",
            modulos: 0
        }

        data.push(brigada)
        closeModal()
        showAlert({ text: "Brigada Guardada!", type: "success" })

        setTimeout(() => {
            closeAlert({ text: "Brigada Guardada!", type: "success" })
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
    }, [searchQuery, data]);



    return (

        <ListLayout openModal={openModal} setSearchQuery={setSearchQuery}>
            <Table generateHead={generateHead()} generateRows={generateRows(filteredData)} />
            <ModalForm save={save} closeModal={closeModal} isModalOpen={isModalOpen} />
            {alert.show && <Alert {...alert} />}
        </ListLayout>

    )
}

export default Brigada

