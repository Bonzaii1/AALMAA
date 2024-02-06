import Modal from "../../Modal"


const ModalForm = ({ save, closeModal, isModalOpen }) => {
    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <form onSubmit={save}>
                <div className="flex flex-col">
                    <label htmlFor="nombre" className="font-light py-2">Nombre Brigada</label>
                    <input className="p-2 rounded-md w-full border border-gray-300 hover:border-[#0072ff]" type="text" id="nombre" name="nombre" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lugar" className="font-light py-2">Lugar</label>
                    <input className="p-2 rounded-md w-full border border-gray-300 hover:border-[#0072ff]" type="text" id="lugar" name="lugar" />
                </div>
                <div className="flex mt-12 justify-end">
                    <button className="w-1/5 p-2 mx-1 bg-light-1 border border-gray-300 rounded-md text-black text-sm" type="button" onClick={closeModal}>Cancelar</button>
                    <button className="w-1/5 p-2 mx-1 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#0072ff] hover:to-[#005bbb] rounded-md text-white text-sm" type="submit">Guardar</button>
                </div>
            </form>
        </Modal>
    )
}

export default ModalForm