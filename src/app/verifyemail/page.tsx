'use client'

import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'



export default function Page() {
  const router = useRouter()
  const [data, setData] = useState<string>()
  const logout = async ()=>{
    try {
      await axios.get('/api/users/logout')
      router.push("/login")
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  const getUserDetails = async ()=> {
    const res = await axios.get("/api/users/me")
    console.log(res.data.data._id)
    setData(res.data.data._id)
  }
  return (
    <div>
        <h1>Profile</h1>
        <h2>{data ? <Link href={`/profile/${data}`}>Visit Profile</Link> : "No Data"}</h2>
        <button className=' bg-slate-600' onClick={getUserDetails}>GetId</button>
        <button className='bg-grey-400 p-2' onClick={logout}>Logout</button>
    </div>
  )
}
