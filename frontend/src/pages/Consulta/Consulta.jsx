import ViewRecep from "./ViewRecep"
import ViewModulo from "./ViewModulo"
import { useAuth } from "../../Context/authContext"
import LoadingIndicator from "../../components/Auth/LoadingIndicator"


const Consulta = () => {

    const { user } = useAuth()


    return (

        <>
            {
                user ? user.ROL_ID === "HUB" ? <ViewRecep /> : <ViewModulo /> : <LoadingIndicator />
            }
        </>

    )
}

export default Consulta