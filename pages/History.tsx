import React from 'react';
import { Link } from "react-router-dom";
import List from "../components/List";
import { ICalendarDay } from "../types/types";
import HistoryItem from "../components/HistoryItem";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { clearEditedDays, selectDays } from "../store/slices/daysSlice";
import Search from "../components/UI/Search/Search";
import searchIcon from "../assets/searchIcon.svg"
import { selectFilter } from "../store/slices/filterSlice";
import { calculateDate } from '../utils/date';
import Button from '../components/UI/Button/Button';
import { saveAsFile } from '../utils/files';
// import Select from "../components/UI/Select/Select";

const History = () => {
    const { editedDays } = useAppSelector(selectDays)
    const { searchValue } = useAppSelector(selectFilter)
    const dispatch = useAppDispatch()

    const searchFilter = () => {
        if (searchValue) {
            return editedDays.filter(item => {
                const date = calculateDate({ year: item.year, day: item.day, month: item.month })
                return searchValue.match(/[0-9]/g) ? date.includes(searchValue) : item.text.toLowerCase().includes(searchValue.toLowerCase())
            })
        }

        return editedDays
    }

    return (
        <>
            <Link to={'/'}>Главная</Link>
            <div className="history">
                <div className="history__nav">
                    {/* Вынести импорты и экспорты в отдельную логику(например компонент) */}
                    <Button onClick={() => console.log("Импорт")}>Импорт</Button>
                    <Button onClick={() => saveAsFile("test.txt", "hello world")}>Экспорт</Button>
                    <Search searchIcon={searchIcon} placeholder={"Поиск"} />
                    <Button onClick={() => dispatch(clearEditedDays())}>Очистить историю</Button>
                </div>
                <List items={searchFilter()} renderItem={(item: ICalendarDay) => <HistoryItem key={item.id} item={item} />} />
            </div>
        </>
    );
};

export default History;
