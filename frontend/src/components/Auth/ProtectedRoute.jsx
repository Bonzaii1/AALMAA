import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../Context/authContext'
import LoadingIndicator from '../Auth/LoadingIndicator'

const ProtectedRoute = () => {

    const { user, loadingUser } = useAuth()


    if (loadingUser) {
        return <LoadingIndicator />
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Outlet />
}


export default ProtectedRoute