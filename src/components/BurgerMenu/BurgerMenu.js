import "./BurgerMenu.css";
import {Link} from "react-router-dom";
import {useNavigate, useLocation} from "react-router-dom";

function BurgerMenu({isOpen, onClose}) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <section className={isOpen ? `burger burger__overlay burger_opened` : `burger burger__overlay`}>
            <div className="burger__container">
                <button className="burger__button-close" aria-label="Закрыть" onClick={onClose} type="button"></button>
                <ul className="burger__items">
                    <li className="burger__item"><Link
                        to="/"
                        className={location.pathname === "/" ? `burger__link burger__link_active` : `burger__link`}
                    >Главная</Link></li>
                    <li className="burger__item">
                        <Link
                            to="/movies"
                            className={location.pathname === "/movies" ? `burger__link burger__link_active` : `burger__link`}
                        >Фильмы</Link>
                    </li>
                    <li className="burger__item">
                        <Link
                            to="/saved-movies"
                            className={location.pathname === "/saved-movies" ? `burger__link burger__link_active` : `burger__link`}
                        >Сохраненные фильмы</Link>
                    </li>
                </ul>

                    <button className="burger__button-profile" onClick={() => navigate("/profile")}>Аккаунт</button>

            </div>
        </section>
    )
};

export default BurgerMenu;