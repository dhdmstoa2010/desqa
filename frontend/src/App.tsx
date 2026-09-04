import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import RequireAuth from './components/RequireAuth.tsx'
import Home from './pages/home.tsx'
import Login from './pages/login.tsx'
import Signup from './pages/signup.tsx'
import MyPage from './pages/mypage.tsx'
import Result from './pages/result.tsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/mypage"
          element={
            <RequireAuth>
              <MyPage />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  )
}

export default App
