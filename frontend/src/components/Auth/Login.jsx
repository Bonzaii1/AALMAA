import { useReducer, useState } from "react"
import { reducer } from "../../reducers/inputReducer"
import { useAuth } from "../../Context/authContext"
import { useNavigate } from "react-router-dom"


const Login = () => {

    const [state, dispatch] = useReducer(reducer, { id: "", password: "" })
    const { login } = useAuth()
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {

        const res = await login(state)

        if (res) {
            navigate("/")
        } else {
            setMessage("INCORRECT USER OR PASSWORD")
        }

    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLogin()
        }
    }

    return (
        <section className='login-container' >
            <div className="login-form" onKeyDown={handleKeyDown}>
                <div className="w-full bg-gray-200">
                    <h1 className="text-3xl tracking-wide font-semibold text-center p-8">Login</h1>
                </div>
                <div className="my-4 flex flex-col items-center">

                    <p className=" text-red-400 text-lg font-semibold">{message}</p>

                    <input className="login-input" type="text" id="id" name="id" placeholder="1190518" maxLength={7} onChange={(e) => dispatch({ type: "update_name", nextName: e.target.value, key: "id" })} />
                    <input className="login-input" type="password" id="password" name="password" placeholder="password" onChange={(e) => dispatch({ type: "update_name", nextName: e.target.value, key: "password" })} />

                    <button className="login-button" onClick={handleLogin}>Login</button>


                </div>


            </div>



        </section>
    )
}

export default Login