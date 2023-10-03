import React, {FC} from 'react';
import {toggleModal} from "../store/slices/modalSlice";
import {useAppDispatch} from "../hooks/useStore";
import {IModal} from "../types/types";

interface ModalProps {
    isHidden: boolean
    children: React.ReactNode
}

const Modal: FC<ModalProps> = ({isHidden, children}) => {
    const dispatch = useAppDispatch()
    const modalRef = React.useRef<HTMLDivElement>(null)

    const hide = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.target === modalRef.current) {
            dispatch(toggleModal(true))
        }
    }

    return (
        <>
            {!isHidden &&
                <div ref={modalRef} className="modal" onClick={hide}>
                    <div className="modal__content">
                        {children}
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;
