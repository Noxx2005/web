import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profiles from './pages/Profiles'
import ProfileDetail from './pages/ProfileDetail'
import Search from './pages/Search'
import Account from './pages/Account'
import Callback from './pages/Callback'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/callback" element={<Callback />} />
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" /> : <Login />} 
      />
      <Route 
        path="/" 
        element={user ? <Layout /> : <Navigate to="/login" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="profiles" element={<Profiles />} />
        <Route path="profiles/:id" element={<ProfileDetail />} />
        <Route path="search" element={<Search />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  )
}

export default App
