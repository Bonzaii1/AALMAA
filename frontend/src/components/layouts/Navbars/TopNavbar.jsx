import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AccountModal from "../../Modals/AccountModal"
import { useState } from "react"


const TopNavbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onClose = () => {
        setIsModalOpen(false)
    }

    const handleClick = () => {
        setIsModalOpen(true)
    }

    return (
        <nav className="top-bar">
            <div className="logo flex -ml-3 items-center">
                <img className="w-auto h-auto" src="/AALMAA (1).png" />
                <h2 className="font-bold tracking-tight">AALMAA</h2>
            </div>
            <div onClick={handleClick}>
                <FontAwesomeIcon icon={faUser} className="w-9 h-9 hover:cursor-pointer mr-3 mt-1"></FontAwesomeIcon>
            </div>

            <AccountModal isOpen={isModalOpen} onClose={onClose} />

        </nav>

    )
}

export default TopNavbar