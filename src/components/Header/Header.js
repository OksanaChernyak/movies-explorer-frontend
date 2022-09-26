import "./Header.css";
import logo from "../../images/logo.svg";
import {Link, Route, Routes} from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <Link to="/" >
                    <img
                        className="header__logo"
                        alt="Логотип проекта"
                        src={logo}
                    /></Link>
                <div className="header__menu">
                    <Link to="/signup" className="header__link">Регистрация</Link>
                    <Link to="/signin"><button className="header__button_signin">Войти</button></Link>
                </div>

        </header>
    );
};

export default Header;