import "./BurgerMenu.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

function BurgerMenu({isOpen, onClose}) {
    const navigate = useNavigate();
    return (
        <section className={isOpen ? `burger burger__overlay burger_opened` : `burger burger__overlay`}>
            <div className="burger__container">
                <button className="burger__button-close" aria-label="Закрыть" onClick={onClose} type="button"></button>
                <ul className="burger__items">
                    <li className="burger__item"><Link
                        to="/"
                        className="burger__link"
                    >Главная</Link></li>
                    <li className="burger__item">
                        <Link
                            to="/movies"
                            className="burger__link burger__link_active"
                        >Фильмы</Link>
                    </li>
                    <li className="burger__item">
                        <Link
                            to="/saved-movies"
                            className="burger__link"
                        >Сохраненные фильмы</Link>
                    </li>
                </ul>

                    <button className="burger__button-profile" onClick={() => navigate("/profile")}>Аккаунт</button>

            </div>
        </section>
    )
};

export default BurgerMenu;