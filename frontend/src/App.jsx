
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Layout from './components/layouts/layout'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout><Outlet /></Layout>}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
