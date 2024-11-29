import React from "react";
import {Link} from "react-router-dom";

const Error = () => {
    return (
        <div className="error">
            <div className="error__content">
                <h1 className="error__status">404</h1>
                <h2 className="error__info">Страница не найдена</h2>
                <Link className="error__link" to={"/"}>
                    <button className="error__btn">Вернуться на главную страницу</button>
                </Link>
            </div>
        </div>
    );
};

export default Error;
