import "./Navigation.css";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";


function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleBurger = () => {
        setIsOpen(!isOpen);
    };
    const navigate = useNavigate();
    return (
        <nav className="nav">
            <ul className="nav__links">
            <li><Link className="nav__link" to="/movies">
                Фильмы
            </Link></li>
            <li><Link className="nav__link" to="/saved-movies">
                Сохраненные фильмы
            </Link></li>
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