import SideBar from "./Navbars/SideBar"
import TopNavbar from "./Navbars/TopNavbar"


const Layout = ({ children }) => {
    return (
        <div>
            <main>

                <div className="flex flex-col">
                    <TopNavbar />

                    <div className="flex flex-row">
                        <SideBar />
                        <section className="main-container">
                            {children}
                        </section>
                    </div>

                </div>


            </main>
        </div>
    )
}

export default Layout