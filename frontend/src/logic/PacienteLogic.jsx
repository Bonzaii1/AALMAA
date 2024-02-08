import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const headers = ["Id", "Nombre", "Edad", "Genero", "Modulos"]

export const generateHead = () => {
    return headers.map((header) => (
        <th key={header} className="py-2 px-4 border-r border-gray-100">{header}</th>
    ))
}


export const generateRows = (data, openForm) => {
    return data.map((data) => (
        <>
            <tr key={data.id} className="hover:bg-gray-100 text-center">
                <td className="py-2 px-4 border-b">{data.id}</td>
                <td className="py-2 px-4 border-b">{data.nombre}</td>
                <td className="py-2 px-4 border-b">{data.edad}</td>
                <td className="py-2 px-4 border-b">{data.genero ? "Hombre" : "Mujer"}</td>
                <td className="py-2 px-4 border-b">{data.modulos}</td>
                <td className="py-2 px-4 border-b flex pb-3 justify-evenly">
                    <a onClick={openForm}><FontAwesomeIcon icon={faPenToSquare} size="lg" className="hover:text-[#0072ff]" /></a>
                    <a href="/"><FontAwesomeIcon icon={faTrashCan} size="lg" className="text-red-400" /></a>

                </td>
            </tr>
        </>
    ))
}