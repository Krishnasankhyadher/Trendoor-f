import React, { useEffect, useState } from 'react'
import Navbar from '../components/adminComponent/Navbar'
import Sidebar from '../components/adminComponent/Sidebar'
import { Routes, Route, Outlet } from 'react-router-dom'

import Login from '../components/adminComponent/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminPromoCodes from '../pages/adminPages/Promotion'

// Move this inside the App component or to a config file
export const backendurl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹"

const Admin = () => {
  const [token, settoken] = useState(localStorage.getItem('token') || '')
  
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {!token ? (
        <Login settoken={settoken} />
      ) : (
        <>
          <Navbar settoken={settoken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              {/* <Routes>
                <Route path='/add' element={<Add token={token} backendurl={backendurl} />} />
                <Route path='/orders' element={<Order token={token} backendurl={backendurl} />} />
                <Route path='/list' element={<List token={token} backendurl={backendurl} />} />
                <Route 
                  path='/promo' 
                  element={
                    <AdminPromoCodes 
                      token={token} 
                      backendurl={backendurl} 
                    />
                  } 
                />
                
              </Routes> */}
              <Outlet context={{token,backendurl}}/>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Admin