import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sidebarItems } from '../../../constants/sidebar'
import { useAuth } from "../../../Context/authContext"
import LoadingIndicator from '../../Auth/LoadingIndicator'

const SideBar = () => {
    const { user, loadingUser } = useAuth()

    if (loadingUser) {
        return <LoadingIndicator />
    }

    return (
        <div className="side-bar" >
            {
                sidebarItems.map((item) => (

                    user && (item.roles[0] === "ALL" || item.roles.includes(user.ROL_ID)) &&
                    <NavLink to={item.to} className={({ isActive }) => isActive ? "side-bar-items font-bold text-black" : "side-bar-items text-gray-400"} key={item.name}>
                        <FontAwesomeIcon icon={item.src} className='w-6 h-6 mx-2' />
                        <h2 className="p-1 ">{item.name}</h2>
                    </NavLink>
                ))
            }
        </div >

    )
}

export default SideBar