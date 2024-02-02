import { useParams } from "react-router-dom"
import { brigadaIcon } from "../../assets/icons"
import { useEffect, useRef, useState } from "react";
import { EditIcon } from "../../assets";


const Input = ({ name, placeholder, type, w }) => {
    return (
        <input autoFocus className={`rounded-md ${w} border border-gray-300`} type={type} id={name} name={name} placeholder={placeholder} />
    )
}


const EditBrigada = () => {
    let { id } = useParams();
    const [hover, setHover] = useState({ title: false, pres: false })
    const [isInput, setIsInput] = useState({ title: false, pres: false })
    const inputRefs = {
        title: useRef(null),
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

        console.log(inputRefs)
        console.log(inputRefs["title"].current)
        setIsInput((prev) => ({
            ...prev,
            [element]: true
        }));
    }





    useEffect(() => {
        trueKeyRef.current = Object.keys(isInput).find((key) => isInput[key])
        const handleClickOutside = (event) => {

            if (inputRefs[trueKeyRef.current].current && !inputRefs[trueKeyRef.current].current.contains(event.target)) {
                console.log("Deactivate")
                setIsInput((prev) => ({
                    ...prev,
                    [trueKeyRef.current]: false
                }))
            }

        }

        if (trueKeyRef.current) {
            console.log("listener added")
            document.addEventListener("click", handleClickOutside)
        }



        return () => {
            console.log("dismounting")
            document.removeEventListener("click", handleClickOutside)
        }
    }, [isInput])

    return (
        <div className='w-full h-full flex flex-col ml-4'>
            <div className="flex">
                <img src={brigadaIcon} alt="brigada" className="w-28 h-28 bg-white p-3 rounded-md" />
                <div className="flex flex-col justify-end h-full ml-6">

                    <div ref={inputRefs.title} className="flex" onMouseOver={() => handleOver('title')} onMouseOut={() => handleOut('title')}>
                        {isInput.title ?
                            <Input type={"text"} name={"title"} placeholder={"Brigada 6"} w={"w-full"} />
                            : <h1 className=" text-3xl font-semibold mb-2">Brigada 6</h1>
                        }
                        {
                            hover.title &&
                            <a className="mt-2 ml-2" onClick={() => handleClick("title")} >
                                <EditIcon h="18" />
                            </a>
                        }
                    </div>

                    <div ref={inputRefs.pres} className="flex" onMouseOver={() => handleOver("pres")} onMouseOut={() => handleOut("pres")}>
                        {
                            isInput.pres ?
                                <h3 className="font-semibold mb-2"><span className=" text-gray-500 text-sm font-light">Presidente encargado:</span> <Input type={"text"} name={"pres"} placeholder={"lorem"} w={"w-12"} /></h3>
                                : <h3 className="font-semibold mb-2"><span className=" text-gray-500 text-sm font-light">Presidente encargado:</span> lorem</h3>

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

        </div>
    )
}

export default EditBrigada