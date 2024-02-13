import { Link } from "react-router-dom"
import { EditIcon, TrashIcon } from "../assets"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const headers = ["Id", "Nombre", "Lugar", "Fecha", "Modulos", "Activo"]


export const generateHead = () => {
    return headers.map((header) => (
        <th key={header} className="py-2 px-4 border-r border-gray-100">{header}</th>
    ))

}


export const generateRows = (data, handleDelete) => {
    return data.map((data, index) => (
        <>
            <tr key={index} className="hover:bg-gray-100 text-center">
                <td className="py-2 px-4 border-b">{data.BRIGADA_ID}</td>
                <td className="py-2 px-4 border-b">{data.NOMBRE}</td>
                <td className="py-2 px-4 border-b">{data.LUGAR}</td>
                <td className="py-2 px-4 border-b">{data.FECHA}</td>
                <td className="py-2 px-4 border-b">0</td>
                <td className="py-2 px-4 border-b">{data.ACTIVO === 'A' ? "Activo" : "Inactivo"}</td>
                <td className="py-2 px-3 border-b flex pb-3 justify-evenly">
                    <Link to={"detalle/" + data.BRIGADA_ID}><FontAwesomeIcon icon={faPenToSquare} size="lg" className="hover:text-[#0072ff] hover:cursor-pointer" /></Link>
                    <FontAwesomeIcon icon={faTrashCan} size="lg" className=" text-red-400 hover:cursor-pointer" onClick={() => handleDelete(data.BRIGADA_ID)} />

                </td>
            </tr>
        </>
    ))
}