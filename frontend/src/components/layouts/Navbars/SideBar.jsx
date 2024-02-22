import { NavLink } from 'react-router-dom'
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
                        <img className="p-1 w-10 h-10" src={item.src} alt={item.name} />
                        <h2 className="p-1 ">{item.name}</h2>
                    </NavLink>
                ))
            }
        </div >

    )
}

export default SideBar