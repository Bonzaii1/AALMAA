import { useEffect, useReducer, useState } from 'react'
import ListLayout from '../../components/layouts/ListLayout'
import { addOne, getAll, getOne, updateOne } from '../../api/routes/Pharmacia'
import useAlert from '../../hooks/useAlert'
import Alert from '../../components/Alert'
import Table from '../../components/Table'
import { generateHead, generateRows } from '../../logic/PharmaciaLogic'
import Modal from '../../components/Modals/Modal'
import { reducer } from '../../reducers/inputReducer'

const Pharmacia = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [state, dispatch] = useReducer(reducer, { nombre: "", cantidad: "" })

    const [alert, showAlert, hideAlert, closeAlert] = useAlert()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAll()
                setData(response.data)

            } catch (error) {
                console.error("Error fetching Pharmacia: ", error)
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

    const openModal = async (param) => {
        try {
            if (param) {
                const medicina = await getOne(param)
                console.log(medicina)
                dispatch({ type: 'update_name', nextName: medicina.data.NOMBRE, key: "nombre" })
                dispatch({ type: 'update_name', nextName: medicina.data.CANTIDAD, key: "cantidad" })
            } else {
                dispatch({ type: 'update_name', nextName: "", key: "nombre" })
                dispatch({ type: 'update_name', nextName: "", key: "cantidad" })
            }
        } catch (error) {
            console.log(error)
            showAlert({ text: "ERROR!", type: "danger" })

            setTimeout(() => {
                closeAlert({ text: "ERROR!", type: "danger" })
            }, 3000)

            setTimeout(() => {
                hideAlert()
            }, 10)
        }
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleDelete = () => {

    }

    const save = async (param) => {
        try {
            if (param) {
                const obj = { ID: param, NOMBRE: state.nombre, CANTIDAD: state.cantidad }

                await updateOne(obj)
                showAlert({ text: "SE GRABO EXITOSAMENTE!", type: "success" })

                setTimeout(() => {
                    closeAlert({ text: "SE GRABO EXITOSAMENTE!", type: "success" })
                }, 3000)

                setTimeout(() => {
                    hideAlert()
                }, 10)

            } else {
                const obj = { NOMBRE: state.nombre, CANTIDAD: state.cantidad }
                await addOne(obj)
                showAlert({ text: "SE GRABO EXITOSAMENTE!", type: "success" })

                setTimeout(() => {
                    closeAlert({ text: "SE GRABO EXITOSAMENTE!", type: "success" })
                }, 3000)

                setTimeout(() => {
                    hideAlert()
                }, 10)

            }
        } catch (error) {
            console.log(error)
            showAlert({ text: "ERROR!", type: "danger" })

            setTimeout(() => {
                closeAlert({ text: "ERROR!", type: "danger" })
            }, 3000)

            setTimeout(() => {
                hideAlert()
            }, 10)
        }

    }

    return (
        <ListLayout openModal={openModal} setSearchQuery={setSearchQuery}>

            <Table generateHead={generateHead()} generateRows={generateRows(filteredData, openModal, handleDelete)} />
            <Modal isOpen={isModalOpen} onClose={closeModal} title={"Add Medicine"} >
                <div className="flex flex-col p-6">
                    <div className="flex flex-col">
                        <label htmlFor="nombre" className="font-light py-2">Nombre</label>
                        <input value={state.nombre} onChange={(e) => dispatch({ type: "update_name", nextName: e.target.value, key: "nombre" })} className="p-2 rounded-md w-full border border-gray-300 hover:border-[#0072ff]" type="text" id="nombre" name="nombre" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="cantidad" className="font-light py-2">Cantidad</label>
                        <input value={state.cantidad} onChange={(e) => dispatch({ type: "update_name", nextName: e.target.value, key: "cantidad" })} className="p-2 rounded-md w-full border border-gray-300 hover:border-[#0072ff]" type="number" id="cantidad" name="cantidad" />
                    </div>
                    <div className="flex mt-12 justify-end">
                        <button className="w-1/5 p-2 mx-1 bg-light-1 border border-gray-300 rounded-md text-black text-sm" type="button" onClick={closeModal}>Cancelar</button>
                        <button className="w-1/5 p-2 mx-1 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#0072ff] hover:to-[#005bbb] rounded-md text-white text-sm" type="button" onClick={() => save()}>Guardar</button>
                    </div>
                </div>
            </Modal>
            {alert.show && <Alert {...alert} isForm={false} />}
        </ListLayout>

    )
}

export default Pharmacia