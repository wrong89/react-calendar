import React, {FC} from 'react';
import cl from "./Checkbox.module.scss"

interface CheckboxProps {
    text: string,
    checkActive: boolean,
    setCheckActive: (value: boolean) => void
}

const Checkbox: FC<CheckboxProps> = ({checkActive, setCheckActive, text}) => {
    // const [isActive, setIsActive] = React.useState(false)

    const toggleCheckbox = () => {
        setCheckActive(!checkActive)
    }

    return (
        <>
            <div className={cl.checkbox__inner} onClick={toggleCheckbox}>
                <div className={cl.checkbox__outer}>
                    {checkActive ? <span className={cl.checkbox__active}></span> : ""}
                </div>
                <p className={cl.checkbox__text}>{text}</p>
            </div>
        </>
    );
};

export default Checkbox;
