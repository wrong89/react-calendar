import React, {FC} from 'react';
import {ICalendarDay} from "../types/types";
import List from "./List";
import CalendarDay from "./CalendarDay";
import {saveTriggerDay, toggleModal} from "../store/slices/modalSlice";
import {useAppDispatch} from "../hooks/useStore";
import Slider from "../components/UI/Slider/Slider";
import sliderLeft from "../assets/sliderLeft.svg"
import sliderRight from "../assets/sliderRight.svg"

interface CalendarProps {
    month: ICalendarDay[]
}

const Calendar: FC<CalendarProps> = ({month}) => {
    const dispatch = useAppDispatch()

    const showModal = (day: number) => {
        dispatch(toggleModal(false))
        dispatch(saveTriggerDay(day))
    }

    return (
        <div className="calendar">
            <div className="calendar__inner">
                <List
                    items={month}
                    renderItem={(month: ICalendarDay) => <CalendarDay
                        onClick={() => showModal(month.day)} item={month} key={month.id}
                    />}
                />
            </div>
        </div>
    );
};

export default Calendar;
