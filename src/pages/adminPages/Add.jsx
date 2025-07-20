import React, { useState } from 'react'
import axios from "axios"

import { toast } from 'react-toastify'
import { useOutletContext } from 'react-router-dom'


const Add = () => {
  const { token ,backendurl } = useOutletContext()
  const [image1, setimage1]=useState(false)
  const [image2, setimage2]=useState(false)
  const [image3, setimage3]=useState(false)
  const [image4, setimage4]=useState(false)

  const [price,setprice]=useState('249')
  const [description,setdescription]=useState('')
  const [category,setcategory]=useState('women')
  const [name,setname]=useState('')
  const [bestseller,setbestseller]=useState(false)
  const [subcategory,setsubcategory]=useState('topwear')
  const [size,setsize]=useState([])

  const onsubmithandler =async (e)=>{
e.preventDefault()
try {
  const formdata =new FormData()

  formdata.append("name",name)
  formdata.append("description",description)
  formdata.append("price",price)
  formdata.append("category",category)
  formdata.append("subcategory",subcategory)
  formdata.append("size",JSON.stringify(size))
  formdata.append("bestseller",bestseller)

  image1 && formdata.append("image1",image1)
  image2 && formdata.append("image2",image2)
  image3 && formdata.append("image3",image3)
  image4 && formdata.append("image4",image4)

  const response =await axios.post(backendurl +"/api/product/add", formdata,{headers:{token}})
 if(response.data.success){
  toast.success(response.data.message)
  setname('')
  setdescription('')
  setimage1(false)
  setimage2(false)
  setimage3(false)
  setimage4(false)
  setprice('')

 }else{
  toast.error(response.data.message)
 }
} catch (error) {
  console.log(error)
  toast.error(error.message)
  
}
  }
  return (
    <form onSubmit={onsubmithandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? "Screenshot 2025-07-12 155258.png" : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setimage1(e.target.files[0])} type="file" id='image1'  />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? "Screenshot 2025-07-12 155258.png" : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setimage2(e.target.files[0])} type="file" id='image2'  />
          </label>
          <label htmlFor="image3">
            <img  className='w-20' src={!image3 ? "Screenshot 2025-07-12 155258.png" : URL.createObjectURL(image3)} alt="" />
            <input type="file" id='image3' onChange={(e)=>setimage3(e.target.files[0])}   />
          </label>
          <label htmlFor="image4">
            <img  className='w-20' src={!image4 ? "Screenshot 2025-07-12 155258.png" : URL.createObjectURL(image4)} alt="" />
            <input type="file" id='image4' onChange={(e)=>setimage4(e.target.files[0])} hidden />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
         <input onChange={(e)=>setname(e.target.value)} value={name} type="text" className='w-full max-w-[500px] px-3 py-2' placeholder='Type Here' required />
      </div>
       <div className='w-full'>
        <p className='mb-2'>Product Description</p>
         <textarea onChange={(e)=>setdescription(e.target.value)} value={description}  type="text" className='w-full max-w-[500px] px-3 py-2' placeholder='write description here' required />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

      <div>
        <p className='mb-3'>Product category </p>
        <select onChange={(e)=>setcategory(e.target.value)} className='w-full px-3 py-2' >
          <option value="women">Women</option>
          <option value="men">Men</option>
        </select>
      </div>
       <div>
        <p className='mb-3'>Product subcategory </p>
        <select onChange={(e)=>setsubcategory(e.target.value)} className='w-full px-3 py-2' >
          <option value="topwear">Upper Wear</option>
          <option value="bottomwear">Lower wear</option>
        </select>
      </div>
      <div>
        <p className='mb-3'>Product price</p>
        <input onChange={(e)=>setprice(e.target.value)} value={price} type="number" placeholder='$' className='w-full px-3 py-2 sm:w-[120px]' />
      </div>
      <div>
        <p className='mb-3'>Product Size</p>
        <div className='flex gap-3'>

        <div onClick={()=>setsize(prev=> prev.includes("S") ? prev.filter(item=>item !=="S") : [...prev ,"S"])}>
          <p className={`${size.includes("S") ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
        </div>
           <div onClick={()=>setsize(prev=> prev.includes("M") ? prev.filter(item=>item !=="M") : [...prev,"M"])}>
          <p className={`${size.includes("M") ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
        </div>
           <div onClick={()=>setsize(prev=> prev.includes("L") ? prev.filter(item=>item !=="L") : [...prev,"L"])}>
          <p className={`${size.includes("L") ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
        </div>
           <div onClick={()=>setsize(prev=> prev.includes("XL") ? prev.filter(item=>item !=="XL") : [...prev,"XL"])}>
          <p className={`${size.includes("XL") ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
        </div>
           <div onClick={()=>setsize(prev=> prev.includes("XXL") ? prev.filter(item=>item !=="XXL") : [...prev,"XXL"])}>
          <p className={`${size.includes("XXL") ? "bg-blue-200" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXl</p>
        </div>
        </div>
      </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input onChange={()=>setbestseller(prev =>!prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>
      <button className='w-28 py-3 mt-4 bg-black text-white' type='submit'>ADD</button>
    </form>
  )
}

export default Add
