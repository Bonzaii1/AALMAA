import Modal from "../../Modals/Modal"


const ModalForm = ({ save, closeModal, isModalOpen, dispatch }) => {
    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>

            <div className="flex flex-col">
                <label htmlFor="nombre" className="font-light py-2">Nombre</label>
                <input onChange={(e) => dispatch({ type: "update_name", nextName: e.target.value, key: "nombre" })} className="p-2 rounded-md w-full border border-gray-300 hover:border-[#0072ff]" type="text" id="nombre" name="nombre" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="edad" className="font-light py-2">Edad</label>
                <input onChange={(e) => dispatch({ type: "update_name", nextName: e.target.value, key: "edad" })} className="p-2 rounded-md w-full border border-gray-300 hover:border-[#0072ff]" type="text" id="edad" name="edad" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="lugar" className="font-light py-2">Genero</label>
                <select onChange={(e) => dispatch({ type: "update_name", nextName: e.target.value, key: "genero" })} name="genero" id="genero" className="p-2 rounded-md w-full border border-gray-300 hover:border-[#0072ff]">
                    <option value="">--Elige Genero--</option>
                    <option value="H">Hombre</option>
                    <option value="M">Mujer</option>
                    <option value="O">Otro</option>
                </select>
            </div>
            <div className="flex mt-12 justify-end">
                <button className="w-1/5 p-2 mx-1 bg-light-1 border border-gray-300 rounded-md text-black text-sm" type="button" onClick={closeModal}>Cancelar</button>
                <button className="w-1/5 p-2 mx-1 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:from-[#0072ff] hover:to-[#005bbb] rounded-md text-white text-sm" type="button" onClick={save}>Guardar</button>
            </div>
        </Modal>
    )
}

export default ModalForm