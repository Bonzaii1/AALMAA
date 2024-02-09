import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { formFields } from "../constants/Pacientes"

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


export const generateForm = () => {
    return formFields.map((row, index) => (
        <div key={index} className="flex mx-8 my-2">
            {
                row.map((input, index) => (
                    <div key={index} className={`flex flex-col mr-${input.mr} w-${input.w}`}>
                        <label htmlFor={input.name} className="font-light py-2">{input.label}</label>
                        {
                            input.type === "select"
                                ? <select name={input.name} id={input.name} className="font-light rounded-md w-full border border-gray-300 hover:border-[#0072ff]">
                                    <option value="" className="font-light">--Elige {input.label}--</option>
                                    {input.options.map((option, index) => (
                                        <option key={index} value={option[0]} className="font-light">{option}</option>
                                    ))}
                                </select>
                                : <input type={input.type} name={input.name} id={input.name} className={`rounded-md w-${input.w} border border-gray-300 hover:border-[#0072ff] `} placeholder={input.label} />
                        }
                    </div>
                ))
            }
        </div>
    ))
}