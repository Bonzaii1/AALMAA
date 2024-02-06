
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/layouts/layout'
import Brigada from './pages/Brigada/Brigada'
import EditBrigada from './pages/Brigada/editBrigada'
import Paciente from './pages/Paciente/Paciente'

function App() {

  return (
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
  )
}

export default App
