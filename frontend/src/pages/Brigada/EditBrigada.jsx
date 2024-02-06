import { useParams } from "react-router-dom"
import { brigadaIcon } from "../../assets/icons"
import { useEffect, useRef, useState } from "react";
import { EditIcon } from "../../assets";
import { info, infoLists } from "../../constants/info"
import { data } from "../../constants/Brigadas";



const EditBrigada = () => {
    let { id } = useParams();
    const [brigada, setBrigada] = useState(data[id - 1])
    const [hover, setHover] = useState({ nombre: false, pres: false })
    const [isInput, setIsInput] = useState({ nombre: false, pres: false })
    const [labels, setLabels] = useState({ nombre: brigada.nombre, pres: brigada.pres })
    const inputRefs = {
        nombre: useRef(null),
        pres: useRef(null)
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
        trueKeyRef.current = Object.keys(isInput).find((key) => isInput[key])
        const handleClickOutside = (event) => {

            data[id - 1][trueKeyRef.current] = labels[trueKeyRef.current]

            console.log(data)

            if (inputRefs[trueKeyRef.current].current && !inputRefs[trueKeyRef.current].current.contains(event.target)) {
                setIsInput((prev) => ({
                    ...prev,
                    [trueKeyRef.current]: false
                }))
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
                                <EditIcon h="18" />
                            </a>
                        }
                    </div>

                    <div ref={inputRefs.pres} className="flex" onMouseOver={() => handleOver("pres")} onMouseOut={() => handleOut("pres")}>
                        {
                            isInput.pres ?
                                <h3 className="font-semibold mb-2"><span className=" text-gray-500 text-sm font-light">Presidente encargado:</span> <input autoFocus className={`rounded-md w-20 border border-gray-300`} type="text" id="pres" name="pres" value={labels.pres} onChange={(e) => setLabels((prev) => ({ ...prev, pres: e.target.value }))} /></h3>
                                : <h3 className="font-semibold mb-2"><span className=" text-gray-500 text-sm font-light">Presidente encargado:</span> {labels.pres}</h3>

                        }
                        {
                            hover.pres &&
                            <a className="w-2 h-2 mt-2 ml-1" onClick={() => handleClick("pres")} >
                                <EditIcon h="11" />
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
                                        <h2 className="font-semibold text-lg pl-4">{info.nombre}</h2>
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

        </div>
    )
}

export default EditBrigada