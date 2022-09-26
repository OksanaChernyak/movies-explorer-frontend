import "./MoviesCard.css";
import image from "../../images/movie-image.png";

function MoviesCard() {
    return (
        <li className="movie">
            <img className="movie__pic" src={image} alt="Заглавная картинка для фильма"/>
            <div className="movie__content">
                <h2 className="movie__title">33 слова о дизайне</h2>
                <span className="movie__duration">1ч 47м</span>
            </div>
            <button className="movie__like-button" type="button"
                    aria-label="Поставить лайк"></button>
        </li>
    )
}

export default MoviesCard;