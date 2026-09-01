import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthenticationPage from './pages/AuthenticationPage'
import HomePage from './pages/HomePage'
import GroupsPage from './pages/GroupsPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthenticationPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/groups" element={<GroupsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default App
