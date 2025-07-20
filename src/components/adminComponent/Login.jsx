import React, { useState } from 'react'
import axios from 'axios'
import { backendurl } from '../../admin/Admin'
import { toast } from 'react-toastify'

const Login = ({settoken}) => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const onsubmithandler =async (e)=>{
        try {
            e.preventDefault()
        const response=await axios.post(backendurl +'/api/user/admin',{email,password})
        if(response.data.success){
            settoken(response.data.token)
        }
        else{
            toast.error(response.data.message)
        }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4 '>Admin Pannel</h1>
            <form onSubmit={onsubmithandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input onChange={(e)=>setemail(e.target.value)} value={email} className='rounded-md px-3 py-2 w-full border border-gray-300' type="email" placeholder='your@email.com' required />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=>setpassword(e.target.value)} value={password} className='rounded-md px-3 py-2 w-full border border-gray-300' type="password" placeholder='Password' required />
                </div>
                <button type='submit' className='mt-2 py-2 w-full px-4 rounded-md text-white bg-black'>Login </button>
            </form>
        </div>
      
    </div>
  )
}

export default Login
