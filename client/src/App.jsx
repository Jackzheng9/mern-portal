import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route,useParams,useSearchParams  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Home from './components/Home';
import Solutions from './components/admin/Solutions';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/admin/Admin';
import UserList from './components/admin/UserList';
import AdminUserEdit from './components/admin/AdminUserEdit';
import SetPassword from './components/SetPassword';
import OnBoarding from './components/OnBoarding';
import AdminLayout from './components/AdminLayout';


function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/users/:id" element={<AdminUserEdit />} />           

            
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Admin />} />
            <Route path="/admin/solutions" element={<Solutions />} />
          </Route>


          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setpassword" element={<SetPassword />} />
          <Route path="/onboarding" element={<OnBoarding />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
