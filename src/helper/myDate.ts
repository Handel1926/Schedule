import { Month, daysArray } from "../../type";
import getDay, {CenturyCode, MonthCode, YearCode} from "./getCodes";


const months: Month[] = [
    {
        month: "January",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        leapDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        
    },
    {
        month: "February",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
        leapDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
         
    },
    {
        month: "March",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        leapDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
         
    },
    {
        month: "April",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        leapDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
         
    },
    {
        month: "May",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        leapDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
         
    },
    {
        month: "June",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        leapDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
         
    },
    {
        month: "July",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        leapDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
         
    },
    {
        month: "August",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        leapDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
         
    },
    {
        month: "September",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        leapDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
         
    },
    {
        month: "October",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        leapDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
         
    },
    {
        month: "November",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        leapDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
         
    },
    {
        month: "December",
        days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        leapDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
         
    }
]



export const Sunday = (monthName: string, year: string): number[] =>{
    const month: Month = months.find(mont=>{
        return mont && mont.month.toLowerCase() === monthName.toLowerCase()
    }) as Month
    const Leap = isLeap(year)
    const yearcode = YearCode(year)
    const centCode = CenturyCode(year) as number
    
    let dates = month.days
    if (Leap){
        if (month.month === "February")
        dates = month.leapDays
    }
    let daycode: daysArray = dates.filter(days=>{
        return days && getDay(yearcode, monthName, centCode, days, Leap) === 0
    }) 
    if (daycode[0] as number !== 1 ) {
        daycode = [0, ...daycode]
    }

    return daycode
}
export const Monday = (monthName: string, year: string): number[]=>{
    const month = months.find(mont=>{
        return mont && mont.month.toLowerCase() === monthName.toLowerCase()
    }) as Month
    const Leap = isLeap(year)
    const yearcode = YearCode(year)
    
    const centCode = CenturyCode(year) as number
    let dates = month.days
    if (Leap){
        if (month.month === "February")
        dates = month.leapDays
    }
    let daycode: daysArray = dates.filter(days=>{
        return days && getDay(yearcode, monthName, centCode, days, Leap) === 1
    }) 
    if (daycode[0] as number > 2 ) {
        daycode = [0, ...daycode]
    } 
    return daycode
}
export const Tuesday = (monthName: string, year: string): number[]=>{
    const month = months.find(mont=>{
        return mont && mont.month.toLowerCase() === monthName.toLowerCase()
    }) as Month
    const Leap = isLeap(year)
    const yearcode = YearCode(year)
    
    const centCode = CenturyCode(year) as number
    let dates = month.days
    if (Leap){
        if (month.month === "February")
        dates = month.leapDays
    }
    let daycode: daysArray = dates.filter(days=>{
        return days && getDay(yearcode, monthName, centCode, days, Leap) === 2
    }) 
    if (daycode[0] as number > 3 ) {
        daycode = [0, ...daycode]
    }
    return daycode
}
export const Wednesday = (monthName: string, year: string): number[]=>{
    const month = months.find(mont=>{
        return mont && mont.month.toLowerCase() === monthName.toLowerCase()
    }) as Month
    const Leap = isLeap(year)
    const yearcode = YearCode(year)
    
    const centCode = CenturyCode(year) as number
    let dates = month.days
    if (Leap){
        if (month.month === "February")
        dates = month.leapDays
    }
    let daycode: daysArray = dates.filter(days=>{
        return days && getDay(yearcode, monthName, centCode, days, Leap) === 3
    }) 
    
    if (daycode[0] as number >  4) {
        daycode = [0, ...daycode]
    }
    return daycode
}
export const Thursday = (monthName: string, year: string): number[]=>{
    const month = months.find(mont=>{
        return mont && mont.month.toLowerCase() === monthName.toLowerCase()
    }) as Month
    const Leap = isLeap(year)
    const yearcode = YearCode(year)
    const centCode = CenturyCode(year) as number
    let dates = month.days
    
    if (Leap){
        if (month.month === "February")
        dates = month.leapDays
    }
    let daycode: daysArray = dates.filter(days=>{
        return days && getDay(yearcode, monthName, centCode, days, Leap) === 4
    }) 
    if (daycode[0] as number >  5) {
        daycode = [0, ...daycode]
    }
    return daycode
}
export const Friday = (monthName: string, year: string): number[]=>{
    const month = months.find(mont=>{
        return mont && mont.month.toLowerCase() === monthName.toLowerCase()
    }) as Month
    const Leap = isLeap(year)
    const yearcode = YearCode(year)
    
    const centCode = CenturyCode(year) as number
    let dates = month.days
    if (Leap){
        if (month.month === "February")
        dates = month.leapDays
    }
    let daycode: daysArray = dates.filter(days=>{
        return days && getDay(yearcode, monthName, centCode, days, Leap) === 5
    }) 
    if (daycode[0] as number > 6 ) {
        daycode = [0, ...daycode]
    }
    return daycode
}
export const Saturday = (monthName: string, year: string): number[]=>{
    const month = months.find(mont=>{
        return mont && mont.month.toLowerCase() === monthName.toLowerCase()
    }) as Month
    const Leap = isLeap(year)
    const yearcode = YearCode(year)
    
    const centCode = CenturyCode(year) as number
    let dates = month.days
    if (Leap){
        if (month.month === "February")
        dates = month.leapDays
    }
    let daycode: daysArray = dates.filter(days=>{
        return days && getDay(yearcode, monthName, centCode, days, Leap) === 6
    }) 
    return daycode
}

export default function isLeap(years: string| unknown): boolean{
    let year: number
    if (years) {
         year = Number(years)
    } else {
        const date = new Date();
         year = date.getFullYear()
    }
    
    
    let isLeap: boolean 
    if (year % 4 === 0 && year % 100 !== 0){
        isLeap = true
    }else if (year %100 === 0 && year % 400 === 0){
        isLeap = true
    }else {
        isLeap = false
    }
    return isLeap
}

export function getMonth(n: number): string{
    const newMonth = months[n]
    return newMonth.month
}

export function getYear(): number{
    const date = new Date()
    return date.getFullYear()
}
export function getDate(): number{
    const date = new Date()
    return date.getDate()
}
export function getday(): number{
    const date = new Date()
    return date.getDay()
}

