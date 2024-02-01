import { useEffect, useState } from "react"

const Modal = ({ isOpen, onClose, children }) => {
    const [modalClasses, setModalClasses] = useState("hidden")

    useEffect(() => {

        if (isOpen) {
            setModalClasses('scale-0 opacity-0')
            setTimeout(() => {
                setModalClasses("scale-100 opacity-100 transition-transform duration-300 ease-in-out")
            }, 50)
        } else {
            setModalClasses("hidden")
        }
    }, [isOpen])

    return (

        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'scale-100' : 'scale-0'}`}>
            <div className={`absolute inset-0 bg-black opacity-50 ${isOpen ? 'opacity-50' : 'opacity-0'} transition-opacity`}></div>
            <div className={`z-10 bg-white p-6 rounded-lg shadow-lg w-96 h-96 ${modalClasses}`}>
                <div className="w-full flex justify-between">
                    <h1 className="text-xl font-semibold p-3 ">Agrega Brigada</h1>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        X
                    </button>
                </div>
                <div className="p-3">
                    {children}
                </div>

            </div>
        </div>

    )
}

export default Modal