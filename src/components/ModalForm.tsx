import React, {useRef, useState} from 'react';
import Input from "./UI/Input/Input";
import Button from "./UI/Button/Button";
import Checkbox from "./UI/Checkbox/Checkbox";
import {selectCalendar} from "../store/slices/calendarSlice";
import {selectModal, toggleModal} from "../store/slices/modalSlice";
import {useAppDispatch, useAppSelector} from "../hooks/useStore";
import {addEditedDay, updateDay} from "../store/slices/daysSlice";
import {ICalendarDay} from "../types/types";

type checkboxType = {
    highlighted: boolean
    repeat: boolean
}

const ModalForm = () => {
    const [value, setValue] = useState<string>("")
    const [checkActive, setCheckActive] = useState<checkboxType>({highlighted: false, repeat: false})
    const {currentMonth, currentYear} = useAppSelector(selectCalendar)
    const {triggerDay} = useAppSelector(selectModal)
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const editedDaysTemplate: ICalendarDay = {
            id: triggerDay + currentMonth + currentYear,
            text: value,
            highlighted: checkActive.highlighted,
            day: triggerDay,
            month: currentMonth,
            year: currentYear,
            repeat: checkActive.repeat
        }

        dispatch(addEditedDay(editedDaysTemplate))
        dispatch(updateDay({month: currentMonth, day: triggerDay}))
        dispatch(toggleModal(true))
        event.preventDefault()
    }

    React.useEffect(() => {
        if (inputRef.current) inputRef.current.focus()
    }, [])

    return (
        <form className="modal__form" onSubmit={handleSubmit}>
            <Input
                ref={inputRef}
                placeholder="Надпись"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <div className="modal__check">
                <div>
                    <Checkbox
                        text="Отметить день"
                        checkActive={checkActive.highlighted}
                        setCheckActive={() => setCheckActive({
                            highlighted: !checkActive.highlighted,
                            repeat: checkActive.repeat
                        })}
                    />
                </div>
                <Checkbox
                    text="Повторять каждый год"
                    checkActive={checkActive.repeat}
                    setCheckActive={() => setCheckActive({
                        highlighted: checkActive.highlighted,
                        repeat: !checkActive.repeat
                    })}
                />
            </div>
            <Button onClick={handleSubmit}>Применить</Button>
        </form>
    );
};

export default ModalForm;
