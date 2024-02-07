


const SideForm = ({ children }) => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-end'>
            <div className='absolute inset-0 bg-black opacity-50'></div>

            <div className=" w-2/3 h-full bg-white">

                {children}
            </div>



        </div>
    )
}

export default SideForm