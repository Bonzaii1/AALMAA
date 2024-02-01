import { useState } from "react";

const useAlert = () => {
    const [alert, setAlert] = useState({ show: false, text: "", type: 'danger', close: false })
    const showAlert = ({ text, type = 'danger' }) => setAlert({ show: true, text, type, close: false })
    const closeAlert = ({ text, type = 'danger' }) => setAlert({ show: true, text, type, close: true })
    const hideAlert = ({ text, type }) => setAlert({ show: false, text, type, close: false })
    return [alert, showAlert, closeAlert, hideAlert]
}

export default useAlert