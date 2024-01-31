
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './components/layouts/layout'
import Brigada from './pages/Brigada'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout><Outlet /></Layout>}>
          <Route index element={<Home />} />
          <Route path='/brigada' element={<Brigada />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
