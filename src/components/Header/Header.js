import "./Header.css";
import logo from "../../images/logo.svg";
import {Link, useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();
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
                    <button className="header__button-signin" onClick={() => navigate("/signin")}>Войти</button>
                </div>

        </header>
    );
};

export default Header;