import { MonthDays } from "../../type";
import { Saturday, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday } from "./myDate";



export const Callendar = (year: number)=>{
    const yearString = year.toString()
    const currentCallendar = [
        {
            month: "January",
            sunday: Sunday("january", yearString) ,
            monday: Monday("january", yearString) ,
            tuesday: Tuesday("january", yearString),
            wednesday: Wednesday("january", yearString) ,
            thursday: Thursday("january", yearString) ,
            friday: Friday("january", yearString) ,
            saturday: Saturday("january", yearString) 
        },
        {
            month: "February",
            sunday: Sunday("february", yearString) ,
            monday: Monday("february", yearString) ,
            tuesday: Tuesday("february", yearString),
            wednesday: Wednesday("february", yearString) ,
            thursday: Thursday("february", yearString) ,
            friday: Friday("february", yearString) ,
            saturday: Saturday("february", yearString) 
        },
        {
            month: "March",
            sunday: Sunday("March", yearString) ,
            monday: Monday("March", yearString) ,
            tuesday: Tuesday("March", yearString),
            wednesday: Wednesday("March", yearString) ,
            thursday: Thursday("March", yearString) ,
            friday: Friday("March", yearString) ,
            saturday: Saturday("March", yearString) 
        },
        {
            month: "April",
            sunday: Sunday("April", yearString) ,
            monday: Monday("April", yearString) ,
            tuesday: Tuesday("April", yearString),
            wednesday: Wednesday("April", yearString) ,
            thursday: Thursday("April", yearString) ,
            friday: Friday("April", yearString) ,
            saturday: Saturday("April", yearString) 
        },
        {
            month: "May",
            sunday: Sunday("May", yearString) ,
            monday: Monday("May", yearString) ,
            tuesday: Tuesday("May", yearString),
            wednesday: Wednesday("May", yearString) ,
            thursday: Thursday("May", yearString) ,
            friday: Friday("May", yearString) ,
            saturday: Saturday("May", yearString) 
        },
        {
            month: "June",
            sunday: Sunday("June", yearString) ,
            monday: Monday("June", yearString) ,
            tuesday: Tuesday("June", yearString),
            wednesday: Wednesday("June", yearString) ,
            thursday: Thursday("June", yearString) ,
            friday: Friday("June", yearString) ,
            saturday: Saturday("June", yearString) 
        },
        {
            month: "July",
            sunday: Sunday("July", yearString) ,
            monday: Monday("July", yearString) ,
            tuesday: Tuesday("July", yearString),
            wednesday: Wednesday("July", yearString) ,
            thursday: Thursday("July", yearString) ,
            friday: Friday("July", yearString) ,
            saturday: Saturday("July", yearString) 
        },
        {
            month: "August",
            sunday: Sunday("August", yearString) ,
            monday: Monday("August", yearString) ,
            tuesday: Tuesday("August", yearString),
            wednesday: Wednesday("August", yearString) ,
            thursday: Thursday("August", yearString) ,
            friday: Friday("August", yearString) ,
            saturday: Saturday("August", yearString) 
        },
        {
            month: "September",
            sunday: Sunday("September", yearString) ,
            monday: Monday("September", yearString) ,
            tuesday: Tuesday("September", yearString),
            wednesday: Wednesday("September", yearString) ,
            thursday: Thursday("September", yearString) ,
            friday: Friday("September", yearString) ,
            saturday: Saturday("September", yearString) 
        },
        {
            month: "October",
            sunday: Sunday("October", yearString) ,
            monday: Monday("October", yearString) ,
            tuesday: Tuesday("October", yearString),
            wednesday: Wednesday("October", yearString) ,
            thursday: Thursday("October", yearString) ,
            friday: Friday("October", yearString) ,
            saturday: Saturday("October", yearString) 
        },
        {
            month: "November",
            sunday: Sunday("November", yearString) ,
            monday: Monday("November", yearString) ,
            tuesday: Tuesday("November", yearString),
            wednesday: Wednesday("November", yearString) ,
            thursday: Thursday("November", yearString) ,
            friday: Friday("November", yearString) ,
            saturday: Saturday("November", yearString) 
        },
        {
            month: "December",
            sunday: Sunday("December", yearString) ,
            monday: Monday("December", yearString) ,
            tuesday: Tuesday("December", yearString),
            wednesday: Wednesday("December", yearString) ,
            thursday: Thursday("December", yearString) ,
            friday: Friday("December", yearString) ,
            saturday: Saturday("December", yearString) 
        },
    ]
    return currentCallendar
}
    
