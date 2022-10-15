import "./HeaderMovies.css";
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function HeaderMovies() {
    return (
        <header className="header-movies">
            <Link to="/" >
                <img
                    className="header-movies__logo"
                    alt="Логотип проекта"
                    src={logo}
                /></Link>
            <Navigation />
        </header>
    );
};

export default HeaderMovies;