import React, { FC } from 'react';
import { ICalendarDay } from "../types/types";
import highlight from "../assets/highlight.png"
import { selectCalendar } from "../store/slices/calendarSlice";
import { calculateWeekday, dateDay, dateMonth, dateYear } from "../utils/date";
import { useAppSelector } from "../hooks/useStore";
import { month, week } from "../utils/codeDates";

interface CalendarDayProps {
    item: ICalendarDay
    onClick: (item: ICalendarDay) => void
}

const CalendarDay: FC<CalendarDayProps> = ({ item, onClick }) => {
    const { currentDay, currentMonth, currentYear } = useAppSelector(selectCalendar)
    const weekday = calculateWeekday(item.year, item.month, item.day)

    const checkToday = (defaultClassName: string) => {
        const result = defaultClassName

        if (item.day === dateDay && dateMonth === currentMonth && dateYear === currentYear) {
            return result + " calendar__today"
        }

        // if(item.day === currentDay && item.month === currentMonth && item.year === currentYear) {
        //     return result + " calendar__today"
        // }

        return result
    }

    return (
        <div className={`${checkToday("calendar__item")}`} onClick={() => onClick(item)}>
            <div className={`${checkToday("calendar__item-weekday")}`}>{week[weekday as keyof typeof week]}</div>
            {item.highlighted ? <img className="calendar__highlight" src={highlight} alt="highlight-day" /> : ""}
            <h2 className="calendar__item-day">{item.day}</h2>
            {item.text ?
                <p className="calendar__item-text">{item.text}</p>
                : ""
            }
        </div>
    );
};

export default CalendarDay;
