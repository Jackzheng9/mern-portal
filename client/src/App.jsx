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
import SetPassword from './components/SetPassword';
import OnBoarding from './components/OnBoarding';
import AdminLayout from './components/admin/AdminLayout';
import AdminUserDetails from './components/admin/AdminUserDetails';
import UserSolutions from './components/UserSolutions';
import UserResources from './components/UserResources';
import SolutionDetails from './components/admin/SolutionDetails';
import EditSolution from './components/admin/EditSolution';
import UserSolutionDetails from './components/UserSolutionDetails';
import Resources from './components/admin/Resources';
import ResourceDetails from './components/admin/ResourceDetails';
import UserResourceDetails from './components/UserResourceDetails';
import UsrRsrcLectFileDetails from './components/UsrRsrcLectFileDetails';
import Settings from './components/Settings';
import Profile from './components/Profile';
import HomeContent from './components/admin/HomeContent';
import Terms from './components/admin/terms/Terms';
import Support from './components/admin/support/Support';
import RequestPassChange from './components/RequestPassChange';
import NewPassword from './components/NewPassword';
import AdminLogin from './components/AdminLogin';
import Contact from './components/contact/Contact';

function App() {
  
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/solutions" element={<UserSolutions />} />
            <Route path="/solutions/:slug" element={<UserSolutionDetails />} />         
            <Route path="/resources" element={<UserResources />} />       
            <Route path="/resources/:slug" element={<UserResourceDetails />} />      
            <Route path="/resources/file/" element={<UsrRsrcLectFileDetails />} />   
            <Route path="/settings" element={<Settings />} />  
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />

            
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="/admin/dashboard" element={<Admin />} />
            <Route path="/admin/solutions" element={<Solutions />} />
            <Route path="/admin/solutions/:slug" element={<SolutionDetails />} />
            <Route path="/admin/solutions/:slug/edit" element={<EditSolution />} />
            <Route path="/admin/user/:id" element={<AdminUserDetails />} />
            <Route path="/admin/resources" element={<Resources />} />
            <Route path="/admin/resources/:slug" element={<ResourceDetails />} />
            <Route path="/admin/home-content" element={<HomeContent />} />
            <Route path="/admin/terms" element={<Terms />} />
            <Route path="/admin/support" element={<Support />} />
          </Route>


          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/setpassword" element={<SetPassword />} />
          <Route path="/reset-password" element={<RequestPassChange />} />
          <Route path="/reset-password/:token" element={<NewPassword />} />
          <Route path="/onboarding" element={<OnBoarding />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
