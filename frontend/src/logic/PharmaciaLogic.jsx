import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const headers = ["Id", "Nombre", "Cantidad", "Filler", "Filler2"]

export const generateHead = () => {
    return headers.map((header) => (
        <th key={header} className="py-2 px-8 border-r border-gray-100">{header}</th>
    ))
}

export const generateRows = (data, openForm, handleDelete) => {
    return data.map((data) => (
        <>
            <tr key={data.id} className="hover:bg-gray-100 text-center">
                <td className="py-2 px-4 border-b">{data.ID}</td>
                <td className="py-2 px-4 border-b">{data.NOMBRE}</td>
                <td className="py-2 px-4 border-b">{data.CANTIDAD}</td>
                <td className="py-2 px-4 border-b">filler</td>
                <td className="py-2 px-4 border-b">filler</td>
                <td className="py-2 px-4 border-b flex pb-3 justify-evenly">
                    <a onClick={() => openForm(data.ID)}><FontAwesomeIcon icon={faPenToSquare} size="lg" className="hover:text-[#0072ff] hover:cursor-pointer" /></a>
                    <FontAwesomeIcon icon={faTrashCan} size="lg" className=" text-red-400 hover:cursor-pointer" onClick={() => handleDelete(data.PACIENTE_ID)} />

                </td>
            </tr>
        </>
    ))
}