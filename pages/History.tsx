import { Link } from "react-router-dom";
import List from "../components/List";
import { ICalendarDay, IDate } from "../types/types";
import HistoryItem from "../components/HistoryItem";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { clearEditedDays, selectDays, setEditedDays } from "../store/slices/daysSlice";
import Search from "../components/UI/Search/Search";
import searchIcon from "../assets/searchIcon.svg"
import { selectFilter } from "../store/slices/filterSlice";
import { calculateDate } from '../utils/date';
import Button from '../components/UI/Button/Button';
import { exportHistory } from '../utils/files';
import { importFile } from '../utils/files';
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

    const importHistory = async () => {
        const fileText = await importFile()

        if(fileText) {
            const temp: ICalendarDay[] = [...editedDays, ...JSON.parse(fileText)]
            const uniqueDates = new Set<string>()
            const uniqueEditedDays: ICalendarDay[] = []

            for(let i = 0; i < temp.length; i++) {
                const {year, month, day} = {year: temp[i].year, month: temp[i].month, day: temp[i].day}

                if(!uniqueDates.has(Array.from(uniqueDates)[i])) {
                    uniqueDates.add(`${year}.${month}.${day}`)
                }
            }

            uniqueDates.forEach((date) => {
                const [year, month, day] = date.split('.')
                const find = temp.find(item => item.day === +day && item.month === +month && item.year === +year)

                if(find) {
                    uniqueEditedDays.push(find)
                }
            })

            dispatch(setEditedDays(uniqueEditedDays))
        }
    }

    return (
        <>
            <Link to={'/'}>Главная</Link>
            <div className="history">
                <div className="history__nav">
                    <Button onClick={importHistory}>Импорт</Button>
                    <Button onClick={exportHistory}>Экспорт</Button>
                    <Search searchIcon={searchIcon} placeholder={"Поиск"} />
                    <Button onClick={() => dispatch(clearEditedDays())}>Очистить историю</Button>
                </div>
                <List items={searchFilter()} renderItem={(item: ICalendarDay) => <HistoryItem key={item.id} item={item} />} />
            </div>
        </>
    );
};

export default History;
