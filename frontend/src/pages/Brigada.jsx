import { useEffect, useState } from "react"
import { data } from "../constants/Brigadas"
import { EditIcon, TrashIcon } from "../assets"
import Modal from "../components/Modal"
import Alert from "../components/Alert"
import useAlert from "../hooks/useAlert"

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

    const saveBrigada = (e) => {
        e.preventDefault();

        const nombre = e.target.elements.nombre.value
        const lugar = e.target.elements.nombre.value

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

        <div className="w-full h-full flex flex-col">
            <div className="flex justify-between">
                <button className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#0072ff] hover:to-[#005bbb] p-2 rounded-md text-white" onClick={openModal}>Agregar Brigada</button>
                <input className="p-2 rounded-md w-64" type="text" id="search" name="search" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)}></input>
            </div>

            <table className="min-w-full bg-gray-200 my-6 rounded-t-2xl">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-r border-gray-100">#</th>
                        <th className="py-2 px-4 border-r border-gray-100">Nombre</th>
                        <th className="py-2 px-4 border-r border-gray-100">Lugar</th>
                        <th className="py-2 px-4 border-r border-gray-100">Fecha</th>
                        <th className="py-2 px-4 border-r border-gray-100">Modulos</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white">

                    {filteredData.map((data) => (
                        <>
                            <tr key={data.id} className="hover:bg-gray-100 text-center">
                                <td className="py-2 px-4 border-b">{data.id}</td>
                                <td className="py-2 px-4 border-b">{data.nombre}</td>
                                <td className="py-2 px-4 border-b">{data.lugar}</td>
                                <td className="py-2 px-4 border-b">{data.fecha}</td>
                                <td className="py-2 px-4 border-b">{data.modulos}</td>
                                <td className="py-2 px-4 border-b flex pb-3 justify-evenly">
                                    <a href="/"><EditIcon /></a>
                                    <a href="/"><TrashIcon /></a>

                                </td>
                            </tr>
                        </>
                    ))}




                </tbody>
            </table>


            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <form onSubmit={saveBrigada}>
                    <div className="flex flex-col">
                        <label htmlFor="nombre" className="font-light py-2">Nombre Brigada</label>
                        <input className="p-2 rounded-md w-full border border-gray-300 hover:border-[#0072ff]" type="text" id="nombre" name="nombre" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lugar" className="font-light py-2">Lugar</label>
                        <input className="p-2 rounded-md w-full border border-gray-300 hover:border-[#0072ff]" type="text" id="lugar" name="lugar" />
                    </div>
                    <div className="flex mt-12 justify-end">
                        <button className="w-1/5 p-2 mx-1 bg-light-1 border border-gray-300 rounded-md text-black text-sm" onClick={closeModal}>Cancelar</button>
                        <button className="w-1/5 p-2 mx-1 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#0072ff] hover:to-[#005bbb] rounded-md text-white text-sm" type="submit">Guardar</button>
                    </div>
                </form>

            </Modal>

            {alert.show && <Alert {...alert} />}

        </div >

    )
}

export default Brigada