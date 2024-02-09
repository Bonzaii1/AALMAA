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
                    <a onClick={() => openForm(data.id)}><FontAwesomeIcon icon={faPenToSquare} size="lg" className="hover:text-[#0072ff] hover:cursor-pointer" /></a>
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
                        {
                            input.type === "select"
                                ? <><label htmlFor={input.name} className="font-light py-2">{input.label}</label>
                                    <select name={input.name} id={input.name} className="rounded-md p-1 w-full border border-gray-300 hover:border-[#0072ff]">
                                        <option value="" className="font-light">--Elige {input.label}--</option>
                                        {input.options.map((option, index) => (
                                            <option key={index} value={option[0]}>{option}</option>
                                        ))}
                                    </select>
                                </>
                                : input.type === "radio"
                                    ? <div className="flex items-center mt-2">
                                        <input type="checkbox" id={input.name} name={input.name} value={input.name} className="mr-2" />
                                        <label htmlFor={input.name} className="font-light">{input.label}</label>
                                    </div>
                                    : <><label htmlFor={input.name} className="font-light py-2">{input.label}</label>
                                        <input type={input.type} name={input.name} id={input.name} className={`rounded-md w-${input.w} border p-1 border-gray-300 hover:border-[#0072ff] `} placeholder={input.label} />
                                    </>
                        }
                    </div>
                ))
            }
        </div>
    ))
}