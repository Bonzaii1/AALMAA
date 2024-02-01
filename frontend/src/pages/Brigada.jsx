import { useEffect, useState } from "react"
import { data } from "../constants/Brigadas"
import { EditIcon, TrashIcon } from "../assets"
import Modal from "../components/Modal"

const Brigada = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredData, setFilteredData] = useState(data)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
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
                                    <a href="/"><TrashIcon color="red" /></a>

                                </td>
                            </tr>
                        </>
                    ))}




                </tbody>
            </table>


            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h1>Hello World</h1>
                <p>This is a Modal Test</p>
            </Modal>

        </div >

    )
}

export default Brigada