import "./Navigation.css";
import {useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";


function Navigation() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleBurger = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="nav">
            <ul className="nav__links">
            <li><NavLink className={(location.pathname === "/movies") ? "nav__link nav__link_active" : "nav__link"} to="/movies">
                Фильмы
            </NavLink></li>
            <li><NavLink className={(location.pathname === "/saved-movies") ? "nav__link nav__link_active" : "nav__link"} to="/saved-movies">
                Сохраненные фильмы
            </NavLink></li>
            </ul>
            <button className="nav__button-profile" onClick={() => navigate("/profile")}>Аккаунт</button>
            {isOpen ? (
                    <BurgerMenu isOpen={toggleBurger} onClose={toggleBurger} />
            ) : (
                <button className="nav__burger-menu" onClick={toggleBurger}></button>
            )}
        </nav>
    )
}

export default Navigation;