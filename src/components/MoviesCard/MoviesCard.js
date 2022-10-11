import "./MoviesCard.css";
import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";

function MoviesCard({movie, handleMovieDelete, isLiked, savedMovies, handleMovieLike}) {
    const [isSaved, setIsSaved] = useState(false);
    const location = useLocation();

    useEffect(() => {
        savedMovies?.map((m) => {
            if (movie._id === m._id) {
                setIsSaved(true);
            }
        });
    }, [savedMovies]);

    function handleLike() {
        handleMovieLike(movie);
        setIsSaved(true)
    };

    const handleDelete = () => {
        handleMovieDelete(movie._id);
        setIsSaved(false)
    };


    //перевод минут в привычный формат
    function durationInHours(duration) {
        let hours = Math.trunc(duration / 60);
        let minutes = duration % 60;
        return hours + 'ч ' + minutes + 'м';
    }

    return (
        <li className="movie">
            <a href={movie.trailerLink} target="_blank" rel="noreferrer"><img className="movie__pic"
                                                                              src={`${(location.pathname === "/movies")
                                                                                  ? `https://api.nomoreparties.co${movie.image.url}`
                                                                                  : `${movie.image}`}`}
                                                                              alt="Заглавная картинка для фильма"/>
            </a>
            <div className="movie__content">
                <h2 className="movie__title">{movie.nameRU}</h2>
                <span className="movie__duration">{durationInHours(movie.duration)}</span>
            </div>
            {location.pathname === "/movies" ? (
                <button className={`${(isLiked(movie)) ? "movie__like-button_active" : "movie__like-button"}`} type="button"
                        onClick={handleLike}></button>) : (
                <button className="movie__delete-button" type="button" onClick={handleDelete}></button>)}

        </li>
    )
}

export default MoviesCard;