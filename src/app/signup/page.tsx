'use client'
import Link from 'next/link'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'
import toast, {Toaster} from 'react-hot-toast'


export default function Page() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setIsLoading(!isLoading)
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: formData
      })
      const message = await res.json()
      if (res.ok){
        router.push('/')
        
        toast.success(message.message)
      }else{
        throw new Error(message.error)
      }
    } catch (error: any) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
      setEmail("")
      setPassword("")
      setUsername("")
    }

  }
  return (
    <main className='flex flex-col bg-pink-200 h-screen text-gray-700'>
        <div className='w-full h-fit p-3 flex justify-between'>
            <h1 className='text-2xl md:text-5xl'>Schedule</h1>
            <Link href={'/login'} className='text-xl hover:bg-gray-50 rounded-full bg-gray-950 text-white hover:text-gray-950  hover:shadow-md h-fit p-2 shadow-black'>Login</Link>
        </div>
        <Toaster />
        <div className='flex justify-center items-center w-full h-full p-4'>
            <div className='bg-gray-900 w-11/12 lg:w-2/5 md:w-1/2  h-fit rounded-lg shadow-md shadow-black grid grid-rows-3 md:grid-rows-1 md:grid-cols-3'>
              <div className=' row-span-2  md:row-span-1 md:col-span-2 shadow-inner shadow-black rounded-lg p-6 w-full'>
                  <form action="" onSubmit={handleSubmit} className='flex flex-col gap-3 p-2 text-gray-50'>
                    <label htmlFor="username">Username</label>
                    <input className='text-black' name='username' onChange={(e)=>setUsername(e.target.value)} value={username} type="text" required />
                    <label htmlFor="email">Email</label>
                    <input className='text-black' name='email' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required />
                    <label htmlFor="password">Password</label>
                    <input className='text-black' onChange={(e)=>setPassword(e.target.value)} value={password} name='password' type={`${showPassword? "text" : "password"}`} required />
                    <div className='flex gap-2'>
                      <div onClick={()=>setShowPassword(!showPassword)} className={`w-4 h-4 ${showPassword? "bg-blue-500" :"bg-white"} shadow-inner shadow-black m-1`}></div>
                      <p className=''>Show Password</p>
                    </div>
                    
                    <button type="submit" disabled={isLoading} className='bg-orange-600 w-fit h-fit p-2 rounded-lg shadow-sm shadow-black hover:bg-orange-400'>{isLoading? "Loading..." :"Sign-Up"}</button>

                  </form>
              </div>
              <div className='bg-orange-200 w-full h-full rounded '>

              </div>
            </div>

        </div>
    </main>
  )
}
