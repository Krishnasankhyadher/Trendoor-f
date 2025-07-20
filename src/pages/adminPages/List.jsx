import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { currency } from '../../admin/Admin'
import { toast } from 'react-toastify'
import { useOutletContext } from 'react-router-dom'


const List = () => {
  const { token ,backendurl } = useOutletContext()
  const [list, setlist] = useState([])

  const fetchlist = async () => {
    try {
      const response = await axios.get(backendurl + "/api/product/list")
      if (response.data.success) {
        setlist(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const remove= async (id)=>{
    try {
      const response= await axios.post(backendurl+'/api/product/remove',{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchlist()
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchlist()
  }, [])
  return (
    <>
      <p>All Product List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-3 border border-gray-400 bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {
          list.map((item, index)=>(
             <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
               <p>{item.name}</p>
               <p>{item.category}</p>
               <p>{currency}{item.price}</p>
               <p onClick={()=>remove(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
             </div>
          ))
        }
      </div>
    </>
  )
}

export default List
