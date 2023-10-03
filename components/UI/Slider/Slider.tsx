import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import cl from "./Slider.module.scss"
import { selectCalendar, updateMonth } from "../../../store/slices/calendarSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import { calculateDate, dateMonth, dateYear } from "../../../utils/date";
import { selectDays } from "../../../store/slices/daysSlice";
import DatePicker from "../../DatePicker";

type SliderIcons = {
    left: string
    right: string
}

interface SliderProps {
    sliderIcons: SliderIcons
    onClick?: () => void
}

const Slider: FC<SliderProps & PropsWithChildren> = ({ sliderIcons }) => {
    const { currentMonth, currentYear, currentDay } = useAppSelector(selectCalendar)
    const { days } = useAppSelector(selectDays)
    const [datePicker, setDatePicker] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const sliderDate = calculateDate({
        year: currentYear,
        month: currentMonth,
        day: currentYear === dateYear && currentMonth === dateMonth ? currentDay : days.length
    })
    const sliderRef = useRef(null)

    const slideMonth = (operation: string) => {
        if (operation === '+') {
            dispatch(updateMonth(currentMonth + 1))
        } else {
            dispatch(updateMonth(currentMonth - 1))
        }
    }

    const toggleDatePicker = (event: React.PointerEvent<HTMLDivElement>) => {
        if (sliderRef.current === event.target) {
            setDatePicker(value => !value)
        }
    }

    return (
        <>
            <div>
                <DatePicker showDatePicker={datePicker} />
                <div className={cl.slider} onClick={toggleDatePicker}>
                    <div className={cl.slider__inner}>
                        <img
                            className={cl.slider__img}
                            src={sliderIcons.left}
                            alt="slider-arrow"
                            onClick={() => slideMonth('-')}
                        />
                        <p ref={sliderRef} className={cl.slider__date}>
                            {sliderDate}
                        </p>
                        <img
                            className={cl.slider__img}
                            src={sliderIcons.right}
                            alt="slider-arrow"
                            onClick={() => slideMonth('+')}
                        />
                    </div>
                </div>
            </div>
        </>

    );
};

export default Slider;
