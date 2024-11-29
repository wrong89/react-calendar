export interface ICalendarDay {
    id: number
    day: number
    // weakDay?: string
    text: string
    highlighted: boolean
    month: number
    year: number
    repeat: boolean
}

export interface IDate {
    year: number | string,
    month: number | string,
    day: number | string
}

export interface IModal {
    id: string,
    hidden: boolean
}

export interface IDatePickerItem {
    title: string,
    digit: string | number
}

export interface IHistoryItem {
    id: number,
    date: string
    text: string
}