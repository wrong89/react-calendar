import React, {FC, useState} from 'react';
import cl from "./Search.module.scss"
import {useAppDispatch, useAppSelector} from "../../../hooks/useStore";
import {updateSearch, selectFilter} from "../../../store/slices/filterSlice";
import { useDebounce } from '../../../hooks/useDebounce';

interface SearchProps {
    searchIcon: string
    placeholder: string
}

const Search: FC<SearchProps> = ({searchIcon, placeholder}) => {
    const {searchValue} = useAppSelector(selectFilter)
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState<string>("")
    const submitHandle = (event: React.ChangeEvent<HTMLFormElement>) => {
        console.log("submit", searchValue);
        event.preventDefault()
    }
    const debounce = useDebounce(() => {
        dispatch(updateSearch(search))
    }, 300)

    const changeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }


    return (
        <form onSubmit={submitHandle} className={cl.search}>
            <div className={cl.search__inner}>
                <input
                    value={search}
                    onChange={e => changeHandle(e)}
                    placeholder={placeholder}
                    className={cl.search__input}
                />
                <button className={cl.search__btn}>
                    <img className={cl.search__icon} src={searchIcon} alt="search-icon"/>
                </button>
            </div>
        </form>
    );
};

export default Search;
