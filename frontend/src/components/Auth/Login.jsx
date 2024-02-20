import { useReducer } from "react"
import { reducer } from "../../reducers/inputReducer"


const Login = () => {

    const [state, dispatch] = useReducer(reducer, { username: "", password: "" })

    return (
        <section className='login-container'>
            <div className="login-form">
                <div className="w-full bg-gray-200">
                    <h1 className="text-3xl tracking-wide font-semibold text-center p-8">Login</h1>
                </div>
                <div className="flex flex-col">

                    <input className="w-18 h-12 bg-gray-50" type="text" id="username" name="username" value={state.name} onChange={(e) => dispatch({ type: "update_name", nextName: e.target.value, key: "username" })} />
                    <input className="w-18 h-12 bg-gray-50" type="text" id="password" name="password" value={state.name} onChange={(e) => dispatch({ type: "update_name", nextName: e.target.value, key: "password" })} />

                </div>
            </div>

        </section>
    )
}

export default Login