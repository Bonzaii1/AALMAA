import { useParams } from "react-router-dom"
import { brigadaIcon } from "../../assets/icons"


const EditBrigada = () => {
    let { id } = useParams();
    return (
        <div className='w-full h-full flex flex-col'>
            <div className="flex">
                <img src={brigadaIcon} alt="brigada" className="w-28 h-28 bg-white p-3 rounded-md" />
                <div className="flex flex-col  justify-end h-full">
                    <h1 className=" text-3xl font-semibold">Brigada 6</h1>
                    <h3 className="font-semibold"><span className=" text-gray-500 text-sm font-light">Presidente encargado:</span> lorem</h3>
                </div>
            </div>

        </div>
    )
}

export default EditBrigada