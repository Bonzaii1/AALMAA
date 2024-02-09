import { useEffect, useState } from "react"



const SideForm = ({ isOpen, onClose, children }) => {
    const [formClasses, setFormClasses] = useState("")

    useEffect(() => {
        if (isOpen) {
            setFormClasses("w-2/3 transition-transform duration-500 ease-in-out translate-x-0")
        } else {
            setFormClasses("w-0 transition-transform duration-500 ease-in-out translate-x-full")
        }
    }, [isOpen])

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-end ${isOpen ? "scale-100" : "scale-0"}`}>
            <div onClick={onClose} className={`absolute inset-0 bg-black ${isOpen ? 'opacity-50' : 'opacity-0'} transition-opacity`}></div>

            <div className={`${formClasses} h-full overflow-y-auto bg-white transform`}>
                <div className="flex bg-white h-20 w-full justify-end items-center">
                    <button onClick={onClose} className="w-12 h-12 pr-2 pt-2 mr-4 text-2xl">X</button>
                </div>


                {children}
            </div>



        </div>
    )
}

export default SideForm