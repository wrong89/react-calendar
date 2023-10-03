import { useEffect, useState } from 'react';
import Modal from "../components/Modal";
import ModalForm from "../components/ModalForm";
import Calendar from "../components/Calendar";
import { selectModal } from "../store/slices/modalSlice";
import { month } from "../utils/codeDates";
import { selectCalendar } from "../store/slices/calendarSlice";
import Slider from "../components/UI/Slider/Slider";
import sliderLeft from "../assets/sliderLeft.svg"
import sliderRight from "../assets/sliderRight.svg"
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { selectDays, updateDays } from "../store/slices/daysSlice";
import DatePicker from '../components/DatePicker';

const Main = () => {
    const { currentMonth, currentYear, currentDay } = useAppSelector(selectCalendar)
    const { days } = useAppSelector(selectDays)
    const { isHidden } = useAppSelector(selectModal)
    const dispatch = useAppDispatch()
    const [datePicker, setDatePicker] = useState<boolean>(false)

    // const toggleDatePicker = (event: React.PointerEvent<HTMLDivElement>) => {
    //     if (sliderRef.current === event.target) {
    //         setDatePicker(value => !value)
    //     }
    // }

    useEffect(() => {
        dispatch(updateDays({ month: currentMonth, day: currentYear, year: currentYear }))
    }, [currentMonth, currentYear, currentDay])

    return (
        <>
            <Link to={'history'}>История</Link>
            <Modal isHidden={isHidden}>
                <ModalForm />
            </Modal>
            <h1 className="month">{month[currentMonth as keyof typeof month]} {currentYear}</h1>
            <Calendar month={days} />
            <div className="history__slider">
                 {/*<DatePicker showDatePicker={true} /> */}
                <Slider sliderIcons={{ left: sliderLeft, right: sliderRight }} />
            </div>
        </>
    );
};

export default Main;
