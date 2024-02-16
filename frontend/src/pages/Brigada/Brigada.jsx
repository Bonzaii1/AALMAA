import { useEffect, useState } from "react"
//import { data } from "../../constants/Brigadas"
import Alert from "../../components/Alert"
import useAlert from "../../hooks/useAlert"
import ListLayout from "../../components/layouts/ListLayout"
import Table from "../../components/Table"
import ModalForm from "../../components/layouts/ListData/ModalBrigada"
import { generateHead, generateRows } from "../../logic/BrigadaLogic"
import { getAll, insertBrigada, deleteBrigada } from "../../api/routes/Brigada"
import { months } from "../../constants/months"


const Brigada = () => {
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, showAlert, closeAlert, hideAlert] = useAlert();
    //const [isLoading, setIsLoading] = useState(true);

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleDelete = async (id) => {

        try {
            const confirmed = window.confirm("Are you sure you want to delete this brigada?");
            if (confirmed) {
                const res = await deleteBrigada(id)
                setData(res.data)
                setFilteredData(res.data)
                showAlert({ text: "Brigada Borrada!", type: "success" })

                setTimeout(() => {
                    closeAlert({ text: "Brigada borrada!", type: "success" })
                }, 3000)

                setTimeout(() => {
                    hideAlert()
                }, 10)
            }


        } catch (error) {
            showAlert({ text: "ERROR!", type: "danger" })

            setTimeout(() => {
                closeAlert({ text: "ERROR!", type: "danger" })
            }, 3000)

            setTimeout(() => {
                hideAlert()
            }, 10)
            return console.error(error)
        }


    }

    const save = async (e) => {
        e.preventDefault();

        const nombre = e.target.elements.nombre.value
        const lugar = e.target.elements.lugar.value
        const encargado = e.target.elements.encargado.value
        const fecha = e.target.elements.fecha.value

        const splitDate = fecha.split("-")

        const findSimilar = data.filter((item) => {
            let fecha = item.FECHA
            let split = fecha.split("-")
            if (splitDate[0] == split[0] && splitDate[1] == split[1]) {
                return item
            }
        })
        const idNo = findSimilar.length + 1
        const brigadaId = idNo < 10 ? months[parseInt(splitDate[1]) - 1] + splitDate[0].substring(2) + "0" + idNo : months[splitDate[1]] + splitDate[0].substring(2) + idNo

        const brigada = {
            BRIGADA_ID: brigadaId,
            NOMBRE: nombre,
            LUGAR: lugar,
            ENCARGADO: encargado,
            FECHA: fecha,
            ACTIVO: 'I'
        }

        try {
            const res = await insertBrigada(brigada)
            setData(res.data)
            setFilteredData(res.data)

            closeModal()
            showAlert({ text: "Brigada Guardada!", type: "success" })

            setTimeout(() => {
                closeAlert({ text: "Brigada Guardada!", type: "success" })
            }, 3000)

            setTimeout(() => {
                hideAlert()
            }, 10)
        } catch (error) {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAll()
                console.log(response)
                setData(response.data)
            } catch (error) {
                console.error("Error fetching Brigadas: ", error)
            }
        }


        fetchData()
    }, [])

    useEffect(() => {
        if (searchQuery !== "") {
            const filtered = data.filter((item) => {
                const lowerCaseNombre = item.BRIGADA_ID.toLowerCase();
                console.log(lowerCaseNombre)
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
            <Table generateHead={generateHead()} generateRows={generateRows(filteredData, handleDelete)} />
            <ModalForm save={save} closeModal={closeModal} isModalOpen={isModalOpen} />
            {alert.show && <Alert {...alert} isForm={false} />}
        </ListLayout>

    )
}

export default Brigada

