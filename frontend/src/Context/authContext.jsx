import { createContext, useContext, useEffect, useState } from "react";
import { verifyUser } from "../api/routes/Auth"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoadingUser(false)
    }, [])

    const login = async (userData) => {

        try {
            const res = await verifyUser(userData)
            if (res.data) {
                setUser(res.data)
                localStorage.setItem("user", JSON.stringify(res.data))
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error("there was an error on login: ", error)
        }

    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    const hasRole = (roles) => {
        return user && roles.includes(user.data.ROL_ID)
    }

    return (
        <AuthContext.Provider value={{ user, loadingUser, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    )

}