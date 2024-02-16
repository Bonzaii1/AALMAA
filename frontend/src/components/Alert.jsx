import { useEffect, useState } from "react"


const Alert = ({ text, type, close, isForm }) => {
    const [modalClasses, setModalClasses] = useState("hidden")

    useEffect(() => {
        if (!close) {
            setModalClasses("opacity-0")
            setTimeout(() => {
                setModalClasses("opacity-100 transition-opacity duration-300 ease-in-out")
            }, 50)
        } else {
            setModalClasses("opacity-100");
            setTimeout(() => {
                setModalClasses("opacity-0 transition-opacity duration-300 ease-in-out");
            }, 50);

            setTimeout(() => {
                setModalClasses("hidden")
            }, 300);


        }
    }, [close])


    return (
        <div className={`absolute ${isForm ? " top-32" : "top-30"} left-0 right-0 flex justify-center items-center text-center ${modalClasses}`}>
            <div className={`${type === 'danger' ? 'bg-red-800' : ' bg-sky-800'} p-2 text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex items-center`}
                role="alert">
                <p className={`${type === 'danger' ? 'bg-red-500' : ' bg-sky-500'} flex rounded-full uppercase px-2 py-1 font-semibold mr-3 text-xs`}>{type === 'danger' ? 'Failed' : 'Success'}</p>
                <p className='mr-2 text-left'>{text}</p>
            </div>
        </div>
    )
}

export default Alert