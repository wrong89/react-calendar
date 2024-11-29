import React, {FC} from 'react';
import {ICalendarDay} from "../types/types";
import Button from "./UI/Button/Button";
import {calculateDate} from "../utils/date";
import {useAppDispatch} from "../hooks/useStore";
import {deleteEditedDay} from "../store/slices/daysSlice";

interface HistoryItemProps {
    item: ICalendarDay
}

const HistoryItem: FC<HistoryItemProps> = ({item}) => {
    const date = calculateDate({year: item.year, month: item.month, day: item.day})
    const dispatch = useAppDispatch()

    const deleteClick= () => {
        dispatch(deleteEditedDay(item.id))
    }

    // if(!item.highlighted && !item.text) {
    //     return <></>
    // }

    return (
        <div className="history__item">
            <div className="history__item-inner">
                <div className="history__item-info">
                    <p className="history__item-date">{date}</p>
                    <p className="history__item-text">{item.text ? item.text : "Пустая дата, которая ранее была сохранена"}</p>
                </div>
                <Button onClick={deleteClick}>Удалить</Button>
            </div>
        </div>
    );
};

export default HistoryItem;
