import { Navigate, Route, Routes } from 'react-router-dom'
import AuthenticationPage from './pages/AuthenticationPage'
import GroupsPage from './pages/GroupsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<AuthenticationPage />} />
      <Route path="/groups" element={<GroupsPage />} />
    </Routes>
  )
}

export default App
