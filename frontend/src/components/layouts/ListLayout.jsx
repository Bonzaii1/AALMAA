

const ListLayout = ({ children, openModal, setSearchQuery }) => {



    return (
        <section className="w-full h-full flex flex-col">
            <div className="flex justify-between">
                <button className="bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#0072ff] hover:to-[#005bbb] p-2 rounded-md text-white" onClick={() => openModal()}>Agregar</button>
                <input className="p-2 rounded-md w-64" type="text" id="search" name="search" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)}></input>
            </div>
            {children}
        </section>
    )
}

export default ListLayout