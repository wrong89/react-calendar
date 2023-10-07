import React, { FC, useRef, useState } from 'react';
import arrowTop from "../assets/sliderTop.svg"
import arrowBottom from "../assets/sliderBottom.svg"
import { IDatePickerItem } from "../types/types";
import { calculateDate, countingDaysOfMonth, dateMonth, dateYear } from "../utils/date";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { selectCalendar, updateDay, updateMonth, updateYear } from "../store/slices/calendarSlice";
import { useSelector } from "react-redux";
import { selectDays } from "../store/slices/daysSlice";

interface DatePickerProps {
    showDatePicker: boolean
}

const DatePicker: FC<DatePickerProps> = ({ showDatePicker }) => {
    const dispatch = useAppDispatch()
    const { days } = useSelector(selectDays)
    const { currentYear, currentMonth, currentDay } = useAppSelector(selectCalendar)
    const digitItemsRef = useRef<Array<HTMLInputElement | null>>([])
    const [day, month, year] = calculateDate({
        year: currentYear,
        month: currentMonth,
        day: currentYear === dateYear && currentMonth === dateMonth ? currentDay : days.length
    }).split('.')
    // const [datePickerItems, setDatePickerItems] = useState<IDatePickerItem[]>([
    //     { title: "Год", digit: currentYear },
    //     { title: "Месяц", digit: currentMonth },
    //     { title: "День", digit: currentDay }
    // ])

    const datePickerItems: IDatePickerItem[] = [
        { title: "Год", digit: currentYear },
        { title: "Месяц", digit: currentMonth },
        { title: "День", digit: currentDay }
    ]

    const changeDate = (item: IDatePickerItem, operation: string) => {
        const count = countingDaysOfMonth(currentMonth, currentYear)

        if (item.title === datePickerItems[0].title) {
            dispatch(updateYear(eval(`${currentYear} ${operation} 1`)))
        }
        if (item.title === datePickerItems[1].title) {
            dispatch(updateMonth(eval(`${currentMonth} ${operation} 1`)))
        }
        if (item.title === datePickerItems[2].title) {
            dispatch(updateDay(eval(`${currentDay} ${operation} 1`)))
        }
    }

    // const focusInputs = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const next = digitItemsRef.current[idx + 1]

    //     if (next) {
    //         next.innerText = ""
    //         next.focus()
    //     }
    // }

    const digitChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, item: IDatePickerItem) => {
        const next = digitItemsRef.current[index + 1]
        // datePickerItems[index].digit = 0

        if (item.title === "Год" && event.target.value.length >= 4 && next) {
            datePickerItems[index].digit = event.target.value
            next.focus()
        }

        if(item.title === "Месяц" && +event.target.value > 12) {
            
        }

        // if (item.title !== "Год" && event.target.value.length >= 2 && next) {
        //     next.focus()
        // }

        // if (next && itemLimit) {
        //     next.focus()
        // }
    }

    return (
        <div className={showDatePicker ? "datepicker datepicker__show" : "datepicker"}>
            <div className="datepicker__inner">
                {
                    datePickerItems.map((item, index) =>
                        <div key={index} className="datepicker__item">
                            <img className="datepicker__arrow" src={arrowTop} alt="top-arrow" onClick={() => {
                                changeDate(item, "+")
                            }} />
                            <div className="datepicker__content">
                                <h3 className="datepicker__title">{item.title}</h3>
                                {/* <h2 className="datepicker__digit">{item.digit}</h2> */}
                                <input
                                    className="datepicker__input"
                                    ref={el => digitItemsRef.current[index] = el}
                                    // value={datePickerItems[index].digit}
                                    placeholder={datePickerItems[index].digit.toString()}
                                    onChange={(e) => digitChange(e, index, item)}
                                />
                            </div>
                            <img className="datepicker__arrow" src={arrowBottom} alt="bottom-arrow" onClick={() => {
                                changeDate(item, "-")
                            }} />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default DatePicker;