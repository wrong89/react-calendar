import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sliderLeft from "../assets/sliderLeft.svg";
import sliderRight from "../assets/sliderRight.svg";
import Calendar from "../components/Calendar";
import Modal from "../components/Modal";
import ModalForm from "../components/ModalForm";
import Slider from "../components/UI/Slider/Slider";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { selectCalendar } from "../store/slices/calendarSlice";
import { selectDays, updateDays } from "../store/slices/daysSlice";
import { selectModal } from "../store/slices/modalSlice";
import { month } from "../utils/codeDates";

const Main = () => {
  const { currentMonth, currentYear, currentDay } =
    useAppSelector(selectCalendar);
  const { days } = useAppSelector(selectDays);
  const { isHidden } = useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const [datePicker, setDatePicker] = useState<boolean>(false);

  // const toggleDatePicker = (event: React.PointerEvent<HTMLDivElement>) => {
  //     if (sliderRef.current === event.target) {
  //         setDatePicker(value => !value)
  //     }
  // }

  useEffect(() => {
    dispatch(
      updateDays({ month: currentMonth, day: currentYear, year: currentYear })
    );
  }, [currentMonth, currentYear, currentDay]);

  return (
    <>
      <Link to={"history"}>История</Link>
      <Modal isHidden={isHidden}>
        <ModalForm />
      </Modal>
      <h1 className="month">
        {month[currentMonth as keyof typeof month]} {currentYear}
      </h1>
      <Calendar month={days} />
      <div className="history__slider">
        {/*<DatePicker showDatePicker={true} /> */}
        <Slider sliderIcons={{ left: sliderLeft, right: sliderRight }} />
      </div>
    </>
  );
};

export default Main;
