import { useParams } from "react-router-dom"
import { brigadaIcon } from "../../assets/icons"
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { info, infoLists } from "../../constants/info"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { getBrigada, updateBrigada } from "../../api/routes/Brigada"
import useAlert from "../../hooks/useAlert";
import Alert from "../../components/Alert";



const EditBrigada = () => {
    let { id } = useParams();
    const [brigada, setBrigada] = useState({})
    const [hover, setHover] = useState({ nombre: false, encargado: false })
    const [isInput, setIsInput] = useState({ nombre: false, encargado: false })
    const [labels, setLabels] = useState({})
    const [alert, showAlert, closeAlert, hideAlert] = useAlert();

    const inputRefs = {
        nombre: useRef(null),
        encargado: useRef(null)
    }
    const trueKeyRef = useRef(null);

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


    useEffect(() => {
        const fetchBrigada = async () => {
            try {
                const response = await getBrigada(id)
                setBrigada(response.data)
                console.log("DATA RESPONSE: ", response.data)
                console.log("BRIGADA: ", brigada)
            } catch (error) {
                console.error("ERROR: ", error)
            }
        }

        fetchBrigada()
    }, [])

    useEffect(() => {
        setLabels({ nombre: brigada.NOMBRE, encargado: brigada.ENCARGADO })
    }, [brigada])


    useEffect(() => {
        trueKeyRef.current = Object.keys(isInput).find((key) => isInput[key])
        const handleClickOutside = async (event) => {
            brigada[trueKeyRef.current.toUpperCase()] = labels[trueKeyRef.current]

            if (inputRefs[trueKeyRef.current].current && !inputRefs[trueKeyRef.current].current.contains(event.target)) {
                setIsInput((prev) => ({
                    ...prev,
                    [trueKeyRef.current]: false
                }))

                try {
                    const res = await updateBrigada(brigada)
                    setBrigada(res.data)

                    showAlert({ text: "Se Grabo!", type: "success" })

                    setTimeout(() => {
                        closeAlert({ text: "Se Grabo!", type: "success" })
                    }, 3000)

                    setTimeout(() => {
                        hideAlert()
                    }, 10)

                } catch (error) {
                    showAlert({ text: "ERROR!", type: "danger" })

                    setTimeout(() => {
                        closeAlert({ text: "ERROR!", type: "danger" })
                    }, 3000)

                    setTimeout(() => {
                        hideAlert()
                    }, 10)
                    return console.error(error)

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
        <div className='w-full h-full flex flex-col ml-4'>
            {/* Brigada nombre area */}
            <div className="flex">
                <img src={brigadaIcon} alt="brigada" className="w-28 h-28 bg-white p-3 rounded-md" />
                <div className="flex flex-col justify-end h-full ml-6">

                    <div ref={inputRefs.nombre} className="flex" onMouseOver={() => handleOver('nombre')} onMouseOut={() => handleOut('nombre')}>
                        {isInput.nombre ?
                            <input autoFocus className={`rounded-md w-full border border-gray-300`} type="text" id="nombre" name="nombre" value={labels.nombre} onChange={(e) => setLabels((prev) => ({ ...prev, nombre: e.target.value }))} />
                            : <h1 className=" text-3xl font-semibold mb-2">{labels.nombre}</h1>
                        }
                        {
                            hover.nombre &&
                            <a className="mt-2 ml-2" onClick={() => handleClick("nombre")} >
                                <FontAwesomeIcon icon={faPenToSquare} size="lg" className="hover:text-[#0072ff]" />
                            </a>
                        }
                    </div>

                    <div ref={inputRefs.encargado} className="flex" onMouseOver={() => handleOver("encargado")} onMouseOut={() => handleOut("encargado")}>
                        {
                            isInput.encargado ?
                                <h3 className="font-semibold mb-2"><span className=" text-gray-500 text-sm font-light">encargadoidente encargado:</span> <input autoFocus className={`rounded-md w-20 border border-gray-300`} type="text" id="encargado" name="encargado" value={labels.encargado} onChange={(e) => setLabels((prev) => ({ ...prev, encargado: e.target.value }))} /></h3>
                                : <h3 className="font-semibold mb-2"><span className=" text-gray-500 text-sm font-light">encargadoidente encargado:</span> {labels.encargado}</h3>

                        }
                        {
                            hover.encargado &&
                            <a className="w-2 h-2 ml-1" onClick={() => handleClick("encargado")} >
                                <FontAwesomeIcon icon={faPenToSquare} size="sm" className="hover:text-[#0072ff]" />
                            </a>
                        }
                    </div>



                </div>
            </div>

            <div className="flex my-12">
                <div className="flex flex-col w-2/3">

                    {infoLists.map((info) => (
                        <>
                            <div className="py-4 w-5/6">
                                <div className="flex ml-2 bg-gray-200 h-12 p-8 rounded-t-md justify-between items-center">
                                    <div className="flex">
                                        <img src={brigadaIcon} alt="brigada" className="w-5 h-5 mt-1 -ml-3" />
                                        <h2 className="font-semibold text-lg pl-4">{info.title}</h2>
                                    </div>
                                    <div>
                                        <h2>Total Something: 0</h2>
                                    </div>

                                </div>

                                <div className="flex bg-white p-3 ml-2 h-12 items-center">
                                    <h1 className="p-3">{info.desc}</h1>
                                </div>

                                <div className="flex bg-white p-8 ml-2 h-12 items-center border-t border-gray-200 rounded-b-md">
                                    <h1 className="text-blue hover:cursor-pointer hover:underline">Add new Something</h1>
                                </div>
                            </div>
                        </>
                    ))}

                </div>

                <div className="flex flex-col w-1/3">

                    <div className="flex bg-gray-200 p-8 w-full h-12 items-center rounded-t-md">
                        <img src={brigadaIcon} alt="brigada" className="w-5 h-5 -ml-4" />
                        <h2 className="font-semibold text-lg px-4">Filler</h2>
                    </div>

                    {info.map((info) => (
                        <>

                            <div className="flex bg-white p-3 w-full border-t border-gray-200">
                                <div className="flex flex-col ml-2 pl-2">
                                    <img src={brigadaIcon} alt="brigada" className="w-8 h-8 -ml-3 mt-0.5" />
                                    <div className="h-full w-full"></div>
                                </div>
                                <div className="flex flex-col ml-1">
                                    <h1 className=" text-gray-500 text-lg">{info.label}</h1>
                                    <h1 className="mt-2 text-blue hover:cursor-pointer hover:underline">{info.hrefText}</h1>
                                </div>

                            </div>
                        </>
                    ))}

                </div>

            </div>
            {alert.show && <Alert {...alert} isForm={true} />}

        </div>
    )
}

export default EditBrigada