import { useAuth } from '../../Context/authContext'
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const AccountModal = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const modalRef = useRef(null);

    const handleLogout = () => {
        logout()
        navigate("/login")

    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (

        <div ref={modalRef} className={`flex flex-col absolute top-16 right-4 mt-6 bg-white rounded w-56 h-auto shadow-lg ${isOpen ? 'scale-100' : 'scale-0'} transition-transform`}>
            <h1 className='font-semibold text-lg ml-2 p-3'>{user ? user.NOMBRE : ""} - {user ? user.Rol.NOMBRE : ""}</h1>
            <td className="w-full border-b-2 flex justify-evenly" />
            <div className="absolute top-0 right-3 w-10 h-10 bg-white  transform rotate-45" />
            <div onClick={handleLogout} className='flex m-2 p-3 items-center hover:bg-gray-200 hover:cursor-pointer rounded-md inset-2'>
                <FontAwesomeIcon icon={faRightToBracket} className='mx-1' />
                <h2 className='mx-1 font-semibold text-lg'>Logout</h2>
            </div>
        </div>

    )
}

export default AccountModal