import { Link } from "react-router-dom"
import { EditIcon, TrashIcon } from "../assets"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const headers = ["Id", "Nombre", "Lugar", "Fecha", "Modulos"]


export const generateHead = () => {
    return headers.map((header) => (
        <th key={header} className="py-2 px-4 border-r border-gray-100">{header}</th>
    ))

}


export const generateRows = (data) => {
    return data.map((data) => (
        <>
            <tr key={data.id} className="hover:bg-gray-100 text-center">
                {headers.map((header) => (
                    <td key={header} className="py-2 px-4 border-b">{data[header.toLowerCase()]}</td>
                ))}
                <td className="py-2 px-3 border-b flex pb-3 justify-evenly">
                    <Link to={"detalle/" + data.id}><FontAwesomeIcon icon={faPenToSquare} size="lg" className="hover:text-[#0072ff] hover:cursor-pointer" /></Link>
                    <a href="/"><FontAwesomeIcon icon={faTrashCan} size="lg" className=" text-red-400" /></a>

                </td>
            </tr>
        </>
    ))
}