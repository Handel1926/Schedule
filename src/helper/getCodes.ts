const monthCode = [
    {
        month:"January",
        code: 0
    },
    {
        month: "February",
        code: 3
    },
    {
        month: "March",
        code: 3
    },
    {
        month: "April",
        code: 6
    },
    {
        month: "May",
        code: 1
    },
    {
        month: "June",
        code: 4
    },
    {
        month: "July",
        code: 6
    },
    {
        month: "August",
        code: 2
    },
    {
        month: "September",
        code: 5
    },
    {
        month: "October",
        code: 0
    },
    {
        month: "November",
        code: 3
    },
    {
        month: "December",
        code: 5
    }    
]
const centuryCode = [
    {
        century: "17",
        code: 4
    },
    {
        century: "18",
        code: 2
    },
    {
        century: "19",
        code: 0
    },
    {
        century: "20",
        code: 6
    },
    {
        century: "21",
        code: 4
    },
    {
        century: "22",
        code: 2
    },
    {
        century: "23",
        code: 0
    },
    
]


export function YearCode(year: string): number{
    const yyString = year.slice(2)
    const yy = Number(yyString)
    var yearCode = (yy + (Math.floor(yy / 4))) % 7
    return yearCode
}

export function MonthCode(month: string): number | undefined{
    const newMonth = month.toLowerCase()
    let code = monthCode.find(m=>{
        return m.month.toLowerCase() === newMonth
    })
    if (!code) return;
    return code.code 
}

export function CenturyCode(year: string): number | undefined{
    const cent = year.slice(0, 2)
    const newcentury = centuryCode.find(century=>{
        return century.century === cent
    })
    if (!newcentury) return;
    return newcentury.code
}


export default function getDay(yearCode: number, monthName: string, centuryCode: number, date: number, isLeap: boolean): number{
    const monthCode = MonthCode(monthName) as number
    if (isLeap && monthName.toLowerCase() === "january" || isLeap && monthName.toLowerCase() === "february"){
    let dayN = (yearCode + monthCode + centuryCode + date -1) % 7
    return dayN
    }else {
        let dayN = (yearCode + monthCode + centuryCode + date ) % 7
    return dayN
    }
}
