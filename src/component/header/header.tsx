
import { getMonth } from '@/helper/myDate'
import {useEffect, useState} from 'react'

export default function Header() {
    
    const date = new Date()
    const currentYear = date.getFullYear()
    const monthN = date.getMonth()
    const currentMonth = getMonth(monthN)
    const today = date.getDate()

       

  return (
    <nav className=' w-full flex justify-items-stretch stroke-pink-300'>
        <div className=' w-full  p-2'></div>
        <div className='w-full'>Calendar</div>
        <div className=' w-full p-2'>
            <h1>{`${today}th/${currentMonth}/${currentYear}`}</h1>
        </div>
    </nav>
  )
}
