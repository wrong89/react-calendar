import React, {FC, Ref} from 'react';
import cl from "./Input.module.scss"

interface InputProps {
    placeholder?: string
    value?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = React.forwardRef((props: InputProps, ref?: Ref<HTMLInputElement>) => {
    return (
        <input ref={ref} className={cl.input} {...props}/>
    );
});

export default Input;
