import "./MoviesCard.css";
import image from "../../images/movie-image.png";

function MoviesCard({isLiked, isMovies, onLike, onDelete}) {
    function handleLike () {
        onLike();
    };
    function handleDelete () {
        onDelete();
    };
    return (
        <li className="movie">
            <img className="movie__pic" src={image} alt="Заглавная картинка для фильма"/>
            <div className="movie__content">
                <h2 className="movie__title">33 слова о дизайне</h2>
                <span className="movie__duration">1ч 47м</span>
            </div>
            <button className={isMovies ? `movie__like-button`: `movie__delete-button`} type="button" onClick={isMovies ? handleLike : handleDelete}></button>
        </li>
    )
}

export default MoviesCard;