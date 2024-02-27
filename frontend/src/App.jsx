
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/layouts/Layout'
import Brigada from './pages/Brigada/Brigada'
import EditBrigada from './pages/Brigada/EditBrigada'
import Paciente from './pages/Paciente/Paciente'
import { AuthProvider } from './Context/authContext'
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx'
import Login from './components/Auth/Login.jsx'
import Consulta from './pages/Consulta/Consulta.jsx'

function App() {

  // useEffect(() => {
  //   const setConfig = async () => {

  //     const existingSessionData = sessionStorage.getItem("sessionData")

  //     if (!existingSessionData) {
  //       try {
  //         const resBrigada = await getBrigadaActivo()
  //         const num = await getNumPatients("1190518")
  //         console.log(num)
  //         const initialSessionData = {
  //           usuario: {
  //             id: "1190518",
  //             nombreRecep: "Matt",
  //             pacientes: num.data,
  //           },
  //           brigadaActivo: resBrigada.data
  //         }
  //         sessionStorage.setItem("sessionData", JSON.stringify(initialSessionData))

  //       } catch (error) {
  //         console.log(error)
  //       }

  //     }

  //   }

  //   setConfig()
  // }, [])

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Layout><ProtectedRoute /></Layout>}>
            <Route index element={<Home />} />
            <Route path='/brigada'>
              <Route index element={<Brigada />} />
              <Route path='detalle/:id' element={<EditBrigada />} />
            </Route >
            <Route path='/consulta'>
              <Route index element={<Consulta />} />
            </Route >
            <Route path='/paciente'>
              <Route index element={<Paciente />} />
            </Route>

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
