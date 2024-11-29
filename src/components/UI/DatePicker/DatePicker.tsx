import React, {FC, useRef,} from 'react';
import cl from './DatePicker.module.scss'
import arrowTop from "../../../assets/sliderTop.svg";
import arrowBottom from "../../../assets/sliderBottom.svg";
import {useAppDispatch} from "../../../hooks/useStore";
import {AnyAction} from "redux";

type DatePickerItem = {
    title: string
    value: number
    method: (n: number) => AnyAction
}

interface DatePickerProps {
    showDatePicker: boolean
    datePickerItems: DatePickerItem[]
}

const DatePicker: FC<DatePickerProps> = ({datePickerItems, showDatePicker}) => {
    const dispatch = useAppDispatch()
    const digitItemsRef = useRef<Array<HTMLDivElement | null>>([])

    const changeDate = (item: DatePickerItem, operation: string) => {
        if (operation === '-') {
            dispatch(item.method(item.value - 1))
        }

        if (operation === '+') {
            dispatch(item.method(item.value + 1))
        }
    }

    if (!showDatePicker) {
        return <></>
    }

    return (
        <form className={cl.datepicker}>
            <div className={cl.datepicker__inner}>
                {
                    datePickerItems.map((item, index) =>
                        <div key={index} className={cl.datepicker__item}>
                            <img
                                className={cl.datepicker__arrow}
                                src={arrowTop}
                                alt="top-arrow"
                                onClick={() => changeDate(item, "+")}
                            />
                            <div className={cl.datepicker__content}>
                                <h3 className="datepicker__title">{item.title}</h3>
                                <div className={cl.datepicker__input} ref={el => digitItemsRef.current[index] = el}>
                                    {datePickerItems[index].value}
                                </div>
                            </div>
                            <img
                                className={cl.datepicker__arrow}
                                src={arrowBottom}
                                alt="bottom-arrow"
                                onClick={() => changeDate(item, "-")}
                            />
                        </div>
                    )
                }
            </div>
        </form>
    );
};

export default DatePicker;