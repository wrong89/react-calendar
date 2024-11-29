import React, {FC, useRef} from 'react';
import cl from "./Search.module.scss"
import {useAppDispatch} from "../../../hooks/useStore";
import {updateSearch} from "../../../store/slices/filterSlice";
import {useDebounce} from '../../../hooks/useDebounce';

interface SearchProps {
    searchIcon: string
    placeholder: string
}

const Search: FC<SearchProps> = ({searchIcon, placeholder}) => {
    const dispatch = useAppDispatch()
    const debounce = useDebounce((searchValue: string) => dispatch(updateSearch(searchValue)))
    const searchRef = useRef<HTMLInputElement>(null)

    const changeHandle = () => {
        if (searchRef.current) {
            debounce(searchRef.current.value);
        }
    }


    return (
        <div className={cl.search}>
            <div className={cl.search__inner}>
                <input
                    ref={searchRef}
                    onChange={changeHandle}
                    placeholder={placeholder}
                    className={cl.search__input}
                />
                <button className={cl.search__btn}>
                    <img className={cl.search__icon} src={searchIcon} alt="search-icon"/>
                </button>
            </div>
        </div>
    );
};

export default Search;
