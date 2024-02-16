
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/layouts/Layout'
import Brigada from './pages/Brigada/Brigada'
import EditBrigada from './pages/Brigada/EditBrigada'
import Paciente from './pages/Paciente/Paciente'
import { getBrigadaActivo } from './api/routes/Brigada.js'
import { ConfigContext } from './Context/configContext.js'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    const setConfig = async () => {

      const existingSessionData = sessionStorage.getItem("sessionData")

      if (!existingSessionData) {
        try {
          const resBrigada = await getBrigadaActivo()
          const initialSessionData = {
            usuario: {
              id: "1190518",
              nombreRecep: "Matt",
              pacientes: 0,
            },
            brigadaActivo: resBrigada.data
          }
          sessionStorage.setItem("sessionData", JSON.stringify(initialSessionData))

        } catch (error) {
          console.log(error)
        }

      }

    }

    setConfig()
  }, [])

  return (
    <ConfigContext.Provider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout><Outlet /></Layout>}>
            <Route index element={<Home />} />
            <Route path='/brigada'>
              <Route index element={<Brigada />} />
              <Route path='detalle/:id' element={<EditBrigada />} />
            </Route >
            <Route path='/paciente'>
              <Route index element={<Paciente />} />
            </Route>

          </Route>
        </Routes>
      </Router>
    </ConfigContext.Provider>
  )
}

export default App
