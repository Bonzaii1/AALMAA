import { NavLink } from 'react-router-dom'
import { sidebarItems } from '../../../constants/sidebar'


const SideBar = () => {
    return (
        <div className="side-bar" >
            {
                sidebarItems.map((item) => (
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