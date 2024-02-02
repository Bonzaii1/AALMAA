import { useParams } from "react-router-dom"
import { brigadaIcon } from "../../assets/icons"
import { useState } from "react";
import { EditIcon } from "../../assets";



const EditBrigada = () => {
    let { id } = useParams();
    const [hover, setHover] = useState({ title: false, pres: false })
    const [isInput, setIsInput] = useState({ title: false, pres: false })

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




    return (
        <div className='w-full h-full flex flex-col ml-4'>
            <div className="flex">
                <img src={brigadaIcon} alt="brigada" className="w-28 h-28 bg-white p-3 rounded-md" />
                <div className="flex flex-col justify-end h-full ml-6">

                    <div className="flex" onMouseOver={() => handleOver('title')} onMouseOut={() => handleOut('title')}>
                        {isInput.title ?
                            <input className="rounded-md w-full border border-gray-300" type="text" id="title" name="title" placeholder="Brigada 6" />
                            : <h1 className=" text-3xl font-semibold mb-2">Brigada 6</h1>
                        }
                        {
                            hover.title &&
                            <a className="mt-2 ml-2" onClick={handleClick} >
                                <EditIcon h="18" />
                            </a>
                        }
                    </div>

                    <div className="flex" onMouseOver={() => handleOver("pres")} onMouseOut={() => handleOut("pres")}>
                        <h3 className="font-semibold mb-2"><span className=" text-gray-500 text-sm font-light">Presidente encargado:</span> lorem</h3>
                        {
                            hover.pres &&
                            <div className="w-2 h-2 mt-2 ml-1" >
                                <EditIcon h="11" />
                            </div>
                        }
                    </div>



                </div>
            </div>

        </div>
    )
}

export default EditBrigada