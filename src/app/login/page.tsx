'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast, {Toaster} from 'react-hot-toast'

export default function Page() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setIsLoading(!isLoading)
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: formData
      })
      
      const message = await res.json()
      if (!res.ok){ 
        throw new Error(message.error)
      }else {
        toast.success(message.message)
        router.push('/')
      }
    } catch (error: any) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
      setEmail("")
      setPassword("")
    }
  }
  return (
    <main className='flex flex-col bg-pink-200 h-screen text-gray-700'>
        <div className='w-full h-fit p-3 flex justify-between'>
            <h1 className='text-5xl'>Schedule</h1>
            <Link href={'/signup'} className='text-xl hover:bg-gray-50 rounded-full bg-gray-950 text-white hover:text-gray-950  hover:shadow-md h-fit p-2 shadow-black'>SignUp</Link>
        </div>
        <Toaster />
        <div className='flex justify-center items-center w-full h-full p-4'>
            <div className='bg-gray-900 w-2/5 h-2/3 rounded-lg shadow-md shadow-black grid grid-cols-3'>
              <div className=' col-span-2 shadow-inner shadow-black rounded-lg p-6'>
                  <form action="" onSubmit={handleSubmit} className='flex flex-col gap-3 p-2 text-gray-50'>
                    <label htmlFor="email">Email</label>
                    <input className='text-black' onChange={(e)=>setEmail(e.target["value"])} name='email' value={email} type="email" required />
                    <label htmlFor="password">Password</label>
                    <input className='text-black' name='password' onChange={(e)=>setPassword(e.target.value)} value={password} type={`${showPassword? "text" : "password"}`} required />
                    <div className='flex gap-2'>
                      <div onClick={()=>setShowPassword(!showPassword)} className={`w-4 h-4 ${showPassword? "bg-blue-500" :"bg-white"} shadow-inner shadow-black m-1`}></div>
                      <p className=''>Show Password</p>
                    </div>
                    
                    <button type="submit" disabled={isLoading}  className={`${isLoading ? "bg-orange-300" :"bg-orange-600"} w-fit h-fit p-2 rounded-lg shadow-sm shadow-black hover:bg-orange-400`}>{isLoading ? "Loading..." :"Login"}</button>

                  </form>
              </div>
              <div className='bg-orange-200 w-full h-full rounded '>

              </div>
            </div>

        </div>
    </main>
  )
}
