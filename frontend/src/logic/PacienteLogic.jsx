import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { formFields } from "../constants/Pacientes"

const headers = ["Id", "Nombre", "Edad", "Genero", "Modulos", "Fec. Creado", "Estado"]

export const generateHead = () => {
    return headers.map((header) => (
        <th key={header} className="py-2 px-4 border-r border-gray-100">{header}</th>
    ))
}


export const generateRows = (data, openForm, handleDelete) => {
    return data.map((data) => (
        <>
            <tr key={data.id} className="hover:bg-gray-100 text-center">
                <td className="py-2 px-4 border-b">{data.NOMBRE_RECEP} - {data.PACIENTE_ID.slice(-3)}</td>
                <td className="py-2 px-4 border-b">{data.NOMBRE}</td>
                <td className="py-2 px-4 border-b">{data.EDAD}</td>
                <td className="py-2 px-4 border-b">{data.GENERO ? "Hombre" : "Mujer"}</td>
                <td className="py-2 px-4 border-b">{data.MODULOS}</td>
                <td className="py-2 px-4 border-b">{data.CREADO.slice(0, 10)} {data.CREADO.slice(11, 19)}</td>
                <td className="py-2 px-4 border-b">{data.ESTADO ? "Listo!" : "Pendiente..."}</td>
                <td className="py-2 px-4 border-b flex pb-3 justify-evenly">
                    <a onClick={() => openForm(data.PACIENTE_ID)}><FontAwesomeIcon icon={faPenToSquare} size="lg" className="hover:text-[#0072ff] hover:cursor-pointer" /></a>
                    <FontAwesomeIcon icon={faTrashCan} size="lg" className=" text-red-400 hover:cursor-pointer" onClick={() => handleDelete(data.PACIENTE_ID)} />

                </td>
            </tr>
        </>
    ))
}


export const generateForm = (patient, setPatient, rols) => {

    const handleRadioChange = (e) => {
        const val = e.target.value
        const isChecked = e.target.checked
        const vals = val.split("-")

        if (isChecked) {
            setPatient(arr => ({ ...arr, Rols: [...arr.Rols, { ROL_ID: vals[0], NOMBRE: vals[1], PacienteRol: { PACIENTE_ID: patient.PACIENTE_ID, ROL_ID: vals[0] } }] }))
        } else {
            setPatient(prevPatient => ({
                ...prevPatient,
                Rols:
                    prevPatient.Rols.filter(rol => rol.ROL_ID != vals[0])
            }))
        }
    }

    return formFields.map((row, index) => (
        <div key={index} className="flex mx-8 justify-around my-2">
            {
                row.map((input, index) => (
                    <div key={index} className={`flex flex-col mr-${input.mr} w-${input.w}`}>
                        {
                            input.type === "select"
                                ? <><label htmlFor={input.name} className="font-light py-2">{input.label}</label>
                                    <select name={input.name} value={patient.ESTADO_CIVIL ? patient.ESTADO_CIVIL : "-"} id={input.name} onChange={e => setPatient(prev => ({ ...prev, [input.name]: e.target.value }))} className="rounded-md p-1 w-full border border-gray-300 hover:border-[#0072ff]">
                                        <option value="-" className="font-light">--Elige {input.label}--</option>
                                        {input.options.map((option, index) => (
                                            <option key={index} value={option[0]}>{option}</option>
                                        ))}
                                    </select>
                                </>
                                : input.type === "radio"
                                    ? <div className="flex items-center mt-2">
                                        <input type="checkbox" id={input.name} name={input.name} value={input.name + "-" + input.label} checked={rols && rols.some(rol => rol.ROL_ID === input.name)} onChange={handleRadioChange} className="mr-2" />
                                        <label htmlFor={input.name} className="font-light">{input.label}</label>
                                    </div>
                                    : <><label htmlFor={input.name} className="font-light py-2">{input.label}</label>
                                        <input type={input.type} name={input.name} id={input.name} className={`rounded-md w-${input.w} border p-1 border-gray-300 hover:border-[#0072ff] `} placeholder={input.label} value={patient[input.name] ? patient[input.name] !== "" && patient[input.name] != 0 ? patient[input.name] : "" : ""} onChange={(e) => setPatient(prev => ({ ...prev, [input.name]: e.target.value }))} />
                                    </>
                        }
                    </div>
                ))
            }
        </div>
    ))
}