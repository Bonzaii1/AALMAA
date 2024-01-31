import { sidebarItems } from '../../../constants/sidebar'


const SideBar = () => {
    return (
        <div className="side-bar" >
            {
                sidebarItems.map((item) => (
                    <div className="flex items-center p-4" key={item.name}>
                        <img className="p-1 w-10 h-10" src={item.src} alt={item.name} />
                        <h2 className="p-1 text-gray-400">{item.name}</h2>
                    </div>

                ))
            }
        </div>

    )
}

export default SideBar