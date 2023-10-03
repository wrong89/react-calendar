import React, {FC, useRef, useState} from 'react';
import cl from "./Select.module.scss"

type SelectOptions = {
    title: string
}

interface SelectProps {
    current: string
    options: SelectOptions[]
}

const Select: FC<SelectProps> = ({current, options}) => {
    const [show, setShow] = useState<boolean>(false)
    const selectRef = useRef<HTMLDivElement>(null)

    const toggleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
        setShow(value => !value)
    }

    return (
        <div>
            <div ref={selectRef} className={cl.select} onClick={toggleSelect}>
                <div className={cl.select__current}>{current}</div>
                {show && <div className={cl.select__options}>
                    {options.map(option =>
                        <div key={option.title} className={cl.select__option}>{option.title}</div>
                    )}
                </div>}
            </div>
        </div>
    );
};

export default Select;