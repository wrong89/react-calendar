import React, {FC, PropsWithChildren} from 'react';
import cl from "./Button.module.scss"

interface ButtonProps {
    onClick?: (value: any) => void
}

const Button: FC<PropsWithChildren & ButtonProps> = (props) => {
    return (
        <button {...props} className={cl.btn}>
            {props.children}
        </button>
    );
};

export default Button;
