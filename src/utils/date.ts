import {IDate} from "../types/types";

export const date = new Date()
export const dateYear = date.getFullYear()
export const dateMonth = date.getMonth() + 1
export const dateDay = date.getDate()

export const countingDaysOfMonth = (month = dateMonth, year = dateYear) => new Date(year, month, 0).getDate()

export const calculateDate = (date: IDate) => {
    if (date.month < 10) {
        date.month = `0${date.month}`
    }

    if (date.day < 10) {
        date.day = `0${date.day}`
    }

    if (date.year < 1) {
        date.year = `${Math.abs(+date.year)} год до н. э`
    }

    return `${date.day}.${date.month}.${date.year}`
}

export const calculateWeekday = (year = dateYear, month = dateMonth, day = dateDay) => new Date(year, month - 1, day).getDay()