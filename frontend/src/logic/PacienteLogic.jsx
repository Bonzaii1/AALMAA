import { Link } from "react-router-dom"
import { EditIcon, TrashIcon } from "../assets"

const headers = ["Id", "Nombre", "Edad", "Genero", "Modulos"]

export const generateHead = () => {
    return headers.map((header) => (
        <th key={header} className="py-2 px-4 border-r border-gray-100">{header}</th>
    ))
}


export const generateRows = (data) => {
    return data.map((data) => (
        <>
            <tr key={data.id} className="hover:bg-gray-100 text-center">
                <td className="py-2 px-4 border-b">{data.id}</td>
                <td className="py-2 px-4 border-b">{data.nombre}</td>
                <td className="py-2 px-4 border-b">{data.edad}</td>
                <td className="py-2 px-4 border-b">{data.genero ? "Hombre" : "Muher"}</td>
                <td className="py-2 px-4 border-b">{data.modulos}</td>
                <td className="py-2 px-4 border-b flex pb-3 justify-evenly">
                    <Link to={"detalle/" + data.id}><EditIcon h="18" /></Link>
                    <a href="/"><TrashIcon /></a>

                </td>
            </tr>
        </>
    ))
}