import { faBars, faClipboard, faPenToSquare, faPersonRifle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { generateForm } from "../../logic/PacienteLogic"
import { useEffect, useRef, useState } from "react"
import useAlert from "../../hooks/useAlert"


const FormPaciente = ({ patient, labels, setLabels }) => {
    const [hover, setHover] = useState({ nombre: false, edad: false, genero: false })
    const [isInput, setIsInput] = useState({ nombre: false, edad: false, genero: false })
    const [alert, showAlert, closeAlert, hideAlert] = useAlert();
    const trueKeyRef = useRef(null);
    const inputRefs = {
        nombre: useRef(null),
        edad: useRef(null),
        genero: useRef(null)
    }

    const handleOver = (element) => {
        setHover((prev) => ({
            ...prev,
            [element]: true
        }));
    }

    const handleOut = (element) => {
        setHover((prev) => ({
            ...prev,
            [element]: false
        }))
    }

    const handleClick = (element) => {

        setIsInput((prev) => ({
            ...prev,
            [element]: true
        }));
    }


    const saveData = () => {

    }
    useEffect(() => {
        trueKeyRef.current = Object.keys(isInput).find((key) => isInput[key])
        const handleClickOutside = async (event) => {
            patient[trueKeyRef.current.toUpperCase()] = labels[trueKeyRef.current]
            console.log(patient)

            if (inputRefs[trueKeyRef.current].current && !inputRefs[trueKeyRef.current].current.contains(event.target)) {
                setIsInput((prev) => ({
                    ...prev,
                    [trueKeyRef.current]: false
                }))

                try {
                    //const res = await updateBrigada(brigada)
                    //setBrigada(res.data)

                    // showAlert({ text: "Se Grabo!", type: "success" })

                    // setTimeout(() => {
                    //     closeAlert({ text: "Se Grabo!", type: "success" })
                    // }, 3000)

                    // setTimeout(() => {
                    //     hideAlert()
                    // }, 10)

                } catch (error) {
                    // showAlert({ text: "ERROR!", type: "danger" })

                    // setTimeout(() => {
                    //     closeAlert({ text: "ERROR!", type: "danger" })
                    // }, 3000)

                    // setTimeout(() => {
                    //     hideAlert()
                    // }, 10)
                    // return console.error(error)

                }

            }

        }

        if (trueKeyRef.current) {
            document.addEventListener("click", handleClickOutside)
        }
        return () => {

            document.removeEventListener("click", handleClickOutside)
        }
    }, [isInput, labels])


    return (
        <div className="flex flex-col w-full h-full bg-light-2">
            <div className="flex w-full h-1/4 mt-8 ml-20 items-center">
                <FontAwesomeIcon icon={faPersonRifle} className="w-20 h-20" />
                <div className="flex flex-col px-8 font-semibold">

                    <div ref={inputRefs.nombre} className="flex" onMouseOver={() => handleOver('nombre')} onMouseOut={() => handleOut('nombre')}>
                        {isInput.nombre ?
                            <input autoFocus className={`rounded-md w-full border border-gray-300`} type="text" id="nombre" name="nombre" value={labels.nombre} onChange={(e) => setLabels((prev) => ({ ...prev, nombre: e.target.value }))} />
                            : <h1 className="text-3xl">{labels.nombre}</h1>
                        }
                        {
                            hover.nombre &&
                            <a className="mt-2 ml-2" onClick={() => handleClick("nombre")} >
                                <FontAwesomeIcon icon={faPenToSquare} size="lg" className="hover:text-[#0072ff]" />
                            </a>
                        }
                    </div>

                    <div ref={inputRefs.edad} className="flex" onMouseOver={() => handleOver('edad')} onMouseOut={() => handleOut('edad')}>
                        {isInput.edad ?
                            <>
                                <p className="text-small">Edad: </p>
                                <input autoFocus className={`rounded-md w-full border border-gray-300`} type="text" id="edad" name="edad" value={labels.edad} onChange={(e) => setLabels((prev) => ({ ...prev, edad: e.target.value }))} />
                            </>
                            : <p className="text-small">Edad: {labels.edad}</p>
                        }
                        {
                            hover.edad &&
                            <a className="ml-2" onClick={() => handleClick("edad")} >
                                <FontAwesomeIcon icon={faPenToSquare} className="hover:text-[#0072ff]" />
                            </a>
                        }
                    </div>
                    <div ref={inputRefs.genero} className="flex" onMouseOver={() => handleOver('genero')} onMouseOut={() => handleOut('genero')}>
                        {isInput.genero ?
                            <>
                                <p className="text-small">Genero: </p>
                                <select name="genero" id="genero" defaultValue={labels.genero} className="rounded-md p-1 w-full border border-gray-300 hover:border-[#0072ff]" onChange={(e) => setLabels((prev) => ({ ...prev, genero: e.target.value == "true" ? true : false }))}>
                                    <option value={"true"} >Hombre</option>
                                    <option value={"false"} >Mujer</option>
                                </select>
                            </>
                            : <p className="text-small">Genero: {labels.genero ? "Hombre" : "Mujer"}</p>
                        }
                        {
                            hover.genero &&
                            <a className="ml-2" onClick={() => handleClick("genero")} >
                                <FontAwesomeIcon icon={faPenToSquare} className="hover:text-[#0072ff]" />
                            </a>
                        }
                    </div>


                    {/* <h1 className="text-3xl ">{patient.NOMBRE}</h1> */}
                    {/* <p className="text-small">Edad: {patient.EDAD}</p> */}
                    {/* <p className="text-small">Genero: {patient.GENERO ? "Hombre" : "Mujer"}</p> */}
                </div>

            </div>
            <form onSubmit={saveData}>
                <div className="flex w-[90%] h-12 p-2 mt-4 ml-10 bg-gray-200 rounded-t-md items-center">
                    <FontAwesomeIcon icon={faClipboard} className="w-5 h-5 mr-3" />
                    <h1 className="font-semibold">Datos Personales</h1>
                </div>
                <div className="flex flex-col w-[90%] h-auto p-2 ml-10 bg-white rounded-md">

                    {
                        generateForm()
                    }


                </div>


                <div className="flex w-[90%] h-12 p-2 mt-4 ml-10 bg-gray-200 rounded-t-md items-center">
                    <FontAwesomeIcon icon={faBars} className="w-5 h-5 mr-3" />
                    <h1 className="font-semibold">Padecimiento Actual</h1>
                </div>
                <div className="flex w-[90%] h-20 p-2 ml-10 bg-white rounded-b-md">
                    <h1>Test</h1>
                </div>
            </form>
        </div>
    )
}

export default FormPaciente