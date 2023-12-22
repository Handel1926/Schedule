"use client"

import {useState, useEffect, FormEvent} from "react"
import { getMonth } from "@/helper/myDate"
import { Callendar } from "@/helper/currentYear"
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import {FaWindowClose} from 'react-icons/fa'
import {MdDeleteForever} from "react-icons/md"
import { useRouter } from "next/navigation"
import { NoteType, ReminderType, TodoType } from "../../type"
import {BiSolidEditAlt} from "react-icons/bi"



export default function Home() {
  const date = new Date()
  const currentYear = date.getFullYear()
  const monthN = date.getMonth() 
  const currentMonth = getMonth(monthN)
  const today = date.getDate()
  const newMonthN = monthN + 1
  const currentFullDate = `${currentYear}-${newMonthN <= 9 ? "0" + newMonthN.toString(): newMonthN}-${today <= 9 ? "0" + today.toString(): today}`


  const router = useRouter()
  const cal = Callendar(2023)
  const [showMonths, setShowMonths] = useState<boolean>(false)
  const [calender, setCalender] = useState(cal)
  const [chooseDate, setChooseDate] = useState<number>()
  const [chooseMonth, setChooseMonth] = useState<string>()
  const [chooseYear, setChooseYear] = useState<number>()
  const [currentTime, setCurrentTime] = useState<string>()
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false)
  const [showReminderForm, setShowReminderForm] = useState<boolean>(false)
  const [showNoteForm, setShowNoteForm] =  useState<boolean>(false)
  const [userName, setUserName] = useState<string>()
  const [todoList, setTodoList] = useState<TodoType[]>()
  const [reminderList, setReminderList] = useState<ReminderType[]>()
  const [noteList, setNoteList] = useState<NoteType[]>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [todoFormValue, setTodoFormValue] = useState<string>()
  const [reminderFormValue, setReminderFormValue] = useState<string>()
  const [reminderDate, setReminderDate] = useState<string>(currentFullDate)
  const [reminderTime, setReminderTime] = useState<string>(currentTime!)
  const [noteTitleFormValue, setNoteTitleFormValue] = useState<string>()
  const [noteBodyFormValue, setNoteBodyFormValue] = useState<string>()
  const [showNote, setShowNote] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [noteId, setNoteId] = useState<string>()

  
  
  
  
  

  useEffect(()=>{
    const loadPage =async () => {
      
    
    const date = new Date()
    const newYear = date.getFullYear()
    const monthN = date.getMonth()
    const newMonth = getMonth(monthN)
    const today = date.getDate()
    const newcalender = Callendar(newYear)
    
    const res = await fetch("/api/userDetails", {method: "GET"})
    const data = await res.json()
    const newUserName = data.data.username  || ""
    const newTodoList: TodoType[] = data.todo; 
    const newReminderList: ReminderType[] = data.reminder;
    const newNoteList: NoteType[] = data.note;

    setReminderList(newReminderList)
    setNoteList(newNoteList)
    setTodoList(newTodoList)
    setUserName(newUserName)
    setCalender(newcalender)
    setChooseDate(today)
    setChooseMonth(newMonth)
    setChooseYear(newYear)
  }
  loadPage()
  },[isLoading])

  useEffect(()=>{
    const date = new Date()
    const time = `${date.getHours() <= 9 ? "0" + date.getHours().toString(): date.getHours()}:${date.getMinutes()<= 9 ? "0" + date.getMinutes().toString(): date.getMinutes()}`
    setTimeout(()=>{
      setCurrentTime(time)
    }, 1000)
  }, [currentTime])

  const handleMonthBack = (id: number)=>{
    const newIndex = id === 0 ? 11 : id -1
    const newMonth = getMonth(newIndex)
    setChooseMonth(newMonth)
  }

  const handleMonthForward = (id: number)=>{
    const newIndex = id === 11 ? 0 : id + 1
    const newMonth = getMonth(newIndex)
    setChooseMonth(newMonth)
  }
const handleShowMonths = (monthName: string)=>{
  setChooseMonth(monthName)
  setShowMonths(!showMonths)
}
const handleYearBack = (year: number)=>{
  const newYear = year - 1 
  const newcalender = Callendar(newYear)
  setChooseYear(newYear)
  setCalender(newcalender)
}
const handleYearForward = (year: number)=>{
  const newYear = year + 1 
  const newcalender = Callendar(newYear)
  setChooseYear(newYear)
  setCalender(newcalender)
}
const handleLogout = async () => {
  try {
    await fetch("/api/logout",{
      method: "POST",
      body: JSON.stringify("hello")
    })
    router.push("/")
  } catch (error) {
    
  }
}

const handleTRD = (id: number)=>{
  if (id === 1){
    setShowTaskForm(!showTaskForm)
    setShowNoteForm(false)
    setShowReminderForm(false)
    setNoteTitleFormValue('')
    setNoteBodyFormValue('')
    setIsEdit(false)
    
  setShowNote(false)
  }else if (id === 2){
    setShowTaskForm(false)
    setShowNoteForm(false)
    setShowReminderForm(!showReminderForm)
    setNoteTitleFormValue('')
    setNoteBodyFormValue('')
    setIsEdit(false)
  }else if (id === 3){
    setShowTaskForm(false)
    setShowNoteForm(!showNoteForm)
    setShowReminderForm(false)
    setNoteTitleFormValue('')
    setNoteBodyFormValue('')
    setIsEdit(false)
  }else if(id === 4){
    setShowTaskForm(false)
    setShowNoteForm(false)
    setShowReminderForm(false)
    setNoteTitleFormValue('')
    setNoteBodyFormValue('')
    setIsEdit(false)
  }
}

const handleDelet = async (id: string, tdr: string)=>{
  setIsLoading(true)
  const formData = new FormData()
  formData.set("id", id)
  formData.set("tdr", tdr)
  try {
    const res = await fetch("/api/userDetails", {
      method: "DELETE",
      body: formData
    })
  } catch (error) {
    
  }finally{
    setIsLoading(false)
  }
}

const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  const formData = new FormData(e.currentTarget)
  setIsLoading(!isLoading)
  try {
    if (!isEdit){
      const res = await fetch("/api/userDetails", {
        method: "POST",
        body: formData
      })
    }else{
      const res = await fetch("/api/userDetails", {
        method: "PUT",
        body: formData
      })
    }
    
  } catch (error) {
    
  }finally{
    setShowNoteForm(false)
    setShowReminderForm(false)
    setShowTaskForm(false)
    setIsLoading(false)
    setNoteBodyFormValue("")
    setNoteTitleFormValue("")
    setReminderFormValue("")
    setTodoFormValue("")
    setReminderDate(currentFullDate)
    setReminderTime(currentTime!)
    setIsEdit(false)
  }
}
const handleShowNote = (id: string)=>{
  
  if (!noteList) return;
  const newNoteList = noteList.map(note=>{
    return note._id === id ? {...note, display: true} : {...note, display: false}
  })
  
  setNoteList(newNoteList)
}
const handleCloseNote = (id: string)=>{
  if (!noteList) return;
  const newNoteList = noteList.map(note=>{
    return note._id === id ? {...note, display: false} : {...note}
  })
  setNoteList(newNoteList)
  setIsEdit(false)
}

const handleNull = ()=>{

}
const handleNoteEdit = async (title: string, note: string, id?: string)=>{
  
  handleTRD(3)
  setNoteTitleFormValue(title)
  setNoteBodyFormValue(note)
  setNoteId(id)
  setIsEdit(true)
  
  if (!noteList) return;
  const newNoteList = noteList.map(note=>{
    return note._id === id ? {...note, display: false} : {...note}
  })
  setNoteList(newNoteList)
}
 
  return (
    <main className=" overflow-scroll bg-orange-100 pt-12 text-gray-950 grid grid-rows-7  lg:grid-cols-5 lg:grid-rows-1 h-screen lg:overflow-hidden">
      <nav className='w-full flex p-2 fixed top-0 z-50 bg-gray-950 text-orange-50 shadow-sm shadow-emerald-900'>
        
        <div className='w-full text-center cursor-pointer'>{userName}</div>
        <div className=' w-full text-center cursor-pointer'>
            <h1>{`${today}th/${currentMonth}/${currentYear}`}</h1>
        </div>
        <button className=' w-full text-center cursor-pointer' onClick={()=>handleLogout()}>Logout</button>
      </nav>
      <div className=" bg-gray-50 relative  flex items-center flex-col p-2 row-span-3">
        <h1  className="absolute top-0 z-10 text-center flex justify-around flex-nowrap bg-slate-300 h-fit p-2 w-full rounded-sm shadow-sm shadow-black">
          <span  className="p-1" onClick={()=>handleYearBack(chooseYear as number)} ><AiOutlineArrowLeft /></span>
          <span>{chooseYear}</span>
          <span className="p-1" onClick={()=>handleYearForward(chooseYear as number)} ><AiOutlineArrowRight /></span>
        </h1>
          <div className={`${showMonths ? 'block': 'hidden'} z-20 bg-slate-200 text-black text-xs rounded-md h-fit p-2 grid grid-cols-3 mt-10`}>
          {calender.map(month=>(
            <p className={`p-2 hover:bg-slate-400`} onClick={()=>handleShowMonths(month.month)} key={`show${month.month}`}>{month.month}</p>
          ))}
        </div>
        <div className="lg:relative w-full h-full">
      {calender.map((month, index)=>(
        <div key={month.month} className={ `${chooseMonth === month.month ? "block": "hidden"} cursor-pointer bg-orange-200 mt-8 p-2 lg:mt-2 lg:absolute top-8  shadow-sm shadow-black rounded-lg w-full`}>
          <div>
            <h1 key={`${month.month}h1`} className=" text-center flex justify-around flex-nowrap ">
              <span onClick={()=>handleMonthBack(index)} className="p-2" ><AiOutlineArrowLeft /></span>
              <span onClick={()=>setShowMonths(!showMonths)}>{month.month}</span>
              <span className="p-2" onClick={()=>handleMonthForward(index)}><AiOutlineArrowRight /></span>
            </h1>
          </div>
      
          <div className="flex flex-row">
            <div key={`${month.month}sunday`} className="w-full h-full">
              <h1 className="p-2 flex items-center justify-center">S</h1>
              <ul>
              {month.sunday.map(day=>(
                <li key={`${month.month}sunday${day}`} className={` ${today === day && chooseYear === currentYear && chooseMonth === currentMonth ?"bg-gray-600 rounded-xl shadow-sm shadow-black": ""} ${day === 0 && "h-8"} p-1 flex items-center judtify-center`}>{day === 0? " ": day}</li>
              ))}
              </ul>
              
            </div>
            <div key={`${month.month}monday`} className="w-full h-full">
              <h1 className="p-2 flex items-center justify-center">M</h1>
              <ul>
              {month.monday.map(day=>(
                <li key={`${month.month}monday${day}`} className={` ${today === day && chooseYear === currentYear && chooseMonth === currentMonth ?"bg-gray-600 rounded-xl shadow-sm shadow-black": ""} ${day === 0 && "h-8"} p-1 flex items-center judtify-center`}>{day === 0? " ": day}</li>
              ))}
              </ul>
              
            </div>
            <div key={`${month.month}tuesday`} className="w-full h-full">
              <h1 className="p-2 flex items-center justify-center">T</h1>
              <ul>
              {month.tuesday.map(day=>(
                <li key={`${month.month}tuesday${day}`}className={` ${today === day && chooseYear === currentYear && chooseMonth === currentMonth ?"bg-gray-600 rounded-xl shadow-sm shadow-black": ""} ${day === 0 && "h-8"} p-1 flex items-center judtify-center`}>{day === 0? " ": day}</li>
              ))}
              </ul>
              
            </div>
            <div key={`${month.month}wednesday`} className="w-full h-full">
              <h1 className="p-2 flex items-center judtify-center">W</h1>
              <ul>
              {month.wednesday.map(day=>(
                <li key={`${month.month}wednesday${day}`}className={` ${today === day && chooseYear === currentYear && chooseMonth === currentMonth ?"bg-gray-600 rounded-xl shadow-sm shadow-black": ""} ${day === 0 && "h-8"} p-1 flex items-center judtify-center`}>{day === 0? " ": day}</li>
              ))}
              </ul>
        
            </div>
            <div key={`${month.month}thursday`} className="w-full h-full">
              <h1 className="p-2 flex items-center judtify-center">T</h1>
              <ul>
              {month.thursday.map(day=>(
                <li key={`${month.month}thursday${day}`}className={` ${today === day && chooseYear === currentYear && chooseMonth === currentMonth ?"bg-gray-600 rounded-xl shadow-sm shadow-black": ""} ${day === 0 && "h-8"} p-1 flex items-center judtify-center `}>{day === 0? " ": day}</li>
              ))}
              </ul>
              
            </div>
            <div key={`${month.month}friday`} className="w-full h-full">
              <h1 className="p-2 flex items-center judtify-center">F</h1>
              <ul>
              {month.friday.map(day=>(
                <li key={`${month.month}friday${day}`}className={` ${today === day && chooseYear === currentYear && chooseMonth === currentMonth ?"bg-gray-600 rounded-xl shadow-sm shadow-black": ""} ${day === 0 && "flex items-center judtify-center"} p-1`}>{day === 0? " ": day}</li>
              ))}
              </ul>
              
            </div>
            <div key={`${month.month}saturday`} className="w-full h-full">
              <h1 className="p-2 flex items-center judtify-center">S</h1>
              <ul>
              {month.saturday.map(day=>(
                <li key={`${month.month}saturday${day}`}className={` ${today === day && chooseYear === currentYear && chooseMonth === currentMonth ?"bg-gray-600 rounded-xl shadow-sm shadow-black": ""} ${day === 0 && "flex items-center judtify-center"} p-1`}>{day === 0? " ": day}</li>
              ))}
              </ul>
              
            </div>
          </div>
        </div>
      ))}
       </div>
      <div className=" h-1/3 w-full md:py-6 cursor-pointer flex justify-evenly lg:flex-col mt-1 gap-2 lg:gap-1">
        <h1 className="w-fit  shadow-sm shadow-black rounded-md p-1 taskBar text-xs" onClick={()=>handleTRD(1)}>ToDo +</h1>
        <h1 className="w-fit shadow-sm shadow-black rounded-md  taskBar p-1 text-xs" onClick={()=>handleTRD(2)}>Reminder +</h1>
        <h1 className="w-fit h-fit  text-xs shadow-sm shadow-black rounded-md p-1 taskBar" onClick={()=>handleTRD(3)}>Notes +</h1>
      </div>
      </div>
    
      
      <div className=" row-span-3 lg:col-span-3 p-4 pt-0 h-full ">
        <div className=" rounded-lg shadow-sm shadow-black bg-gray-900 w-full lg:h-5/6 overflow-y-scroll flex flex-col p-4 lg:relative cursor-pointer h-full">
                <div className=" bg-gray-100 text-black w-full flex flex-col gap-2 p-2 ">
                  <h1 className="bg-gray-300" >Todo</h1>
                  {todoList && todoList.length > 0 ? 
                  todoList.map((todo, index)=>(
                    <div className="flex justify-between" key={`div${index}`}>
                      <p key={`${index}todo`}>{todo.todo}</p>
                      <p onClick={()=>handleDelet(todo._id, "todo")} className="p-2 text-red-700"><MdDeleteForever /></p>
                    </div>
                    
                  )): <p>No Task</p>
                }
                </div>
                <div className=" bg-gray-100 text-black w-full flex flex-col gap-2 p-2">
                  <h1 className="bg-gray-300">Reminder</h1>
                  {reminderList && reminderList.length > 0? 
                  reminderList.map((reminder, index)=>(
                    <div className="flex justify-between" key={`remdiv${index}`}>
                      <p key={`${index}reminder`}>{reminder.reminder}</p>
                      <p><span>{reminder.date} -- {reminder.time}</span></p>
                      <p onClick={()=>handleDelet(reminder._id, "reminder")} className="p-2 text-red-700"><MdDeleteForever /></p>
                    </div>
                    
                  )): <p>No Reminder</p>
                }
                </div>
                <div className=" bg-gray-100 text-black w-full flex flex-col gap-2 p-2">
                  <h1 className="bg-gray-300">Note</h1>
                  {noteList && noteList.length > 0 ?
                    noteList.map((note, index)=>(
                      <div key={`${index}notef`}>
                        <div className="flex justify-between">
                        <p key={index} onClick={()=>handleShowNote(note._id)}>{note.title}</p>
                        <p onClick={()=>handleDelet(note._id, "note")} className="p-2 text-red-700"><MdDeleteForever /></p>
                        </div>
                        
                        {/* <p key={`${index}some`}>{`${note.note?.substring(0, 25)}...`}</p> */}
                        <div key={`${index}notes`} className={`${note.display ? "block": "hidden"} absolute top-10 w-full h-full lg:top-0 left-0 bg-slate-50 text-black z-10`}>
                          <div key={`${index}notet`} className="bg-gray-300 flex justify-between p-1">
                            <h1 key={`${index}noetitle`}>{note.title}</h1>
                            <p onClick={()=>handleNoteEdit(note.title, note.note, note._id)}><BiSolidEditAlt/></p>
                            <p onClick={()=>handleDelet(note._id, "note")} className="p-2 text-red-700"><MdDeleteForever /></p>
                            <p  className="p-2" onClick={()=>handleCloseNote(note._id)}><FaWindowClose /></p>
                          </div>
                          <p key={`${index}notemain`} className="p-2 overflow-y-scroll">{note.note}</p>
                        </div>
                      </div>
                      
                    )): <p>No Note</p>

                  }
                </div>
              <div className={`${showTaskForm ? "block" : "hidden"} absolute top-32 md:top-4 w-4/5 h-fit md:w-1/3 md:h-1/3 p-1 bg-gray-400 rounded-md shadow-sm shadow-black`}>
              <div className="flex justify-between">
                  <h1>Add ToDo </h1>
                  <p className="p-2" onClick={()=>handleTRD(4)}><FaWindowClose /></p>
                </div>
                <form action="" onSubmit={handleSubmit} className="flex flex-col" >
                    <input type="text" value={"todo"} onChange={handleNull} name="tdr" className="hidden"/>
                    <textarea name="newTask" id="task" cols={32} rows={3} onChange={(e)=>setTodoFormValue(e.target.value)} value={todoFormValue} className="shadow-inner shadow-black rounded-md"></textarea>
                    <button type="submit" className=" w-fit h-fit bg-orange-700 p-2 md:absolute bottom-2 right-1 rounded-md shadow-sm shadow-black">{isLoading? "Loading...":"ADD"}</button>
                </form>
              </div>
              <div className={`${showReminderForm ? "block" : "hidden"} absolute top-32 md:top-4 w-4/5 h-fit md:w-1/2 md:h-1/2 p-1 bg-gray-400 rounded-md shadow-sm shadow-black`}>
                <div className="flex justify-between">
                  <h1>Add Reminder</h1>
                  <p className="p-2" onClick={()=>handleTRD(4)}><FaWindowClose /></p>
                </div>
                
                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-3" >
                    <input type="text" value={"reminder"} onChange={handleNull} name="tdr" className="hidden"/>
                    <textarea name="newTask" id="task" cols={30} rows={5} onChange={(e)=>setReminderFormValue(e.target.value)} value={reminderFormValue} className="shadow-inner shadow-black rounded-md"></textarea>
                    <input type="time" name="time" id="" onChange={(e)=>setReminderTime(e.target.value)} value={reminderTime} className="w-fit"/>
                    <input type="date" name="date" onChange={(e)=>setReminderDate(e.target.value)} value={reminderDate} className="w-fit" />
                    <button type="submit" className=" w-fit h-fit bg-orange-700 p-2 md:absolute bottom-2 right-1 rounded-md shadow-sm shadow-black">ADD</button>
                </form>
              </div>
              <div className={`${showNoteForm ? "block" : "hidden"} absolute top-32 md:top-4 w-4/5 h-fit md:w-3/4 md:h-3/4 p-1 bg-gray-400 rounded-md shadow-sm shadow-black`}>
                <div className="flex justify-between">
                <h1>Add Note</h1>
                <p className="p-2" onClick={()=>handleTRD(4)}><FaWindowClose /></p>
                </div>
                
                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-8" >
                    {isEdit &&
                      <input className="hidden" type="text" value={noteId} name="id" onChange={handleNull} />
                    }
                    <input type="text" value={"note"} onChange={handleNull} name="tdr" className="hidden"/>
                    <input type="text" name='noteTitle' placeholder="Title" className=" shadow-inner shadow-black rounded-md" onChange={(e)=>setNoteTitleFormValue(e.target.value)} value={noteTitleFormValue} />
                    <textarea name="note" id="task" cols={30} rows={10} className="shadow-inner shadow-black rounded-md" placeholder="body" onChange={(e)=>setNoteBodyFormValue(e.target.value)} value={noteBodyFormValue}></textarea>
                    <button type="submit" className=" w-fit h-fit bg-orange-700 p-2 md:absolute bottom-2 right-1 rounded-md shadow-sm shadow-black">ADD</button>
                </form>
              </div>
        </div>
        
      </div>
      <div className=" mb-32 flex justify-center w-full">
        <h1 className="p-4 bg-black text-white text-5xl text-center rounded-lg shadow-sm shadow-black w-4/5 md:w-fit h-fit md:text-5xl">{currentTime}</h1>
      </div>
    </main>
   
  )
}
