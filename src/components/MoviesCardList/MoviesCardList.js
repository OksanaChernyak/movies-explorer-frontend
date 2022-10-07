import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useState} from "react";

function MoviesCardList({isMovies}) {
    const [isLiked, setIsLiked] = useState(false);
    const toggleLike = () => {
        setIsLiked(!isLiked)
    }
    function handleDelete () {}
    function handleLike () {}

    return (
            <section className="films">
                <ul className="movies-list">
                    <MoviesCard onClick={toggleLike} isMovies={isMovies} onLike={handleLike} onDelete={handleDelete}/>
                    <MoviesCard isMovies={isMovies}/>
                    <MoviesCard isMovies={isMovies}/>
                    <MoviesCard isLiked={toggleLike} isMovies={isMovies}/>
                    <MoviesCard isMovies={isMovies}/>
                    <MoviesCard isMovies={isMovies}/>
                    <MoviesCard isMovies={isMovies}/>
                    <MoviesCard isMovies={isMovies}/>
                    <MoviesCard isMovies={isMovies}/>
                    <MoviesCard isMovies={isMovies}/>
                    <MoviesCard isMovies={isMovies}/>
                    <MoviesCard isMovies={isMovies}/>
                </ul>
                <button className="films__button" type="button">Ещё</button>
            </section>

    )
}

export default MoviesCardList;