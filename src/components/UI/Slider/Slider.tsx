import React, {FC, PropsWithChildren, useRef, useState} from 'react';
import cl from "./Slider.module.scss"
import {selectCalendar, updateDay, updateMonth, updateYear} from "../../../store/slices/calendarSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/useStore";
import {calculateDate, dateMonth, dateYear} from "../../../utils/date";
import {selectDays} from "../../../store/slices/daysSlice";
import DatePicker from "../DatePicker/DatePicker";

type SliderIcons = {
    left: string
    right: string
}

interface SliderProps {
    sliderIcons: SliderIcons
}

const Slider: FC<SliderProps & PropsWithChildren> = ({sliderIcons}) => {
    const {currentMonth, currentYear, currentDay} = useAppSelector(selectCalendar)
    const {days} = useAppSelector(selectDays)
    const [datePicker, setDatePicker] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const sliderDate = calculateDate({
        year: currentYear,
        month: currentMonth,
        day: currentYear === dateYear && currentMonth === dateMonth ? currentDay : days.length
    })
    const sliderImgRefs = useRef<HTMLImageElement[]>([])

    const slideMonth = (operation: string) => {
        if (operation === '+') {
            dispatch(updateMonth(currentMonth + 1))
        } else {
            dispatch(updateMonth(currentMonth - 1))
        }
    }

    const toggleDatePicker = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.target != sliderImgRefs.current[0] && event.target != sliderImgRefs.current[1]) {
            setDatePicker(value => !value)
        }
    }

    return (
        <div className={cl.slider}>
            <span>
                <DatePicker datePickerItems={[
                    {title: "Год", value: currentYear, method: updateYear},
                    {title: "Месяц", value: currentMonth, method: updateMonth},
                    {title: "День", value: currentDay, method: updateDay}
                ]} showDatePicker={datePicker}/>
            </span>
            <div onClick={toggleDatePicker}>
                <div className={cl.slider__inner}>
                    <img
                        ref={el => el && sliderImgRefs.current.length < 2 ? sliderImgRefs.current.push(el) : ""}
                        className={cl.slider__img}
                        src={sliderIcons.left}
                        alt="slider-arrow"
                        onClick={() => slideMonth('-')}
                    />
                    <p className={cl.slider__date}>
                        {sliderDate}
                    </p>
                    <img
                        ref={el => el && sliderImgRefs.current.length < 2 ? sliderImgRefs.current.push(el) : ""}
                        className={cl.slider__img}
                        src={sliderIcons.right}
                        alt="slider-arrow"
                        onClick={() => slideMonth('+')}
                    />
                </div>
            </div>
        </div>
    );
};

export default Slider;
