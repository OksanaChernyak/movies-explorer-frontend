import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";

function MoviesCardList({movies, savedMovies,isLiked, handleMovieDelete, handleMovieLike, someMoviesFound, isPreloaderActive}) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [moviesCounter, setMoviesCounter] = useState(0);
    const [moreMoviesCounter, setMoreMoviesCounter] = useState(0);
    const [shownMovies, setShownMovies] = useState(moviesCounter);
    const location = useLocation();

    const handleMoviesQuantity = () => {
        if (screenWidth >= 1280) {
            setMoviesCounter(12);
            setShownMovies(12);
            setMoreMoviesCounter(3);
        } else if (screenWidth >= 768 && screenWidth < 1280) {
            setMoviesCounter(8);
            setShownMovies(8);
            setMoreMoviesCounter(2);
        } else if (screenWidth < 768) {
            setMoviesCounter(5);
            setShownMovies(5);
            setMoreMoviesCounter(2);
        }
    };

    //событие resize запускается только на объекте window
    useEffect(() => {
        window.addEventListener("resize", handleScreenWidth);
        handleFilmsButtonClick();
        return () => {
            window.removeEventListener("resize", handleScreenWidth);
        }
    }, []);

    useEffect(() => {
        handleMoviesQuantity();
    }, [screenWidth])

    const handleScreenWidth = () => {
        setScreenWidth(window.innerWidth);
    }

    const handleFilmsButtonClick = () => {
        setShownMovies(shownMovies + moreMoviesCounter)
    }
    return (
        <section className="films">
            {isPreloaderActive ? (<Preloader/>) : (
                <>
                    <ul className="movies-list">
                        {(someMoviesFound === false && movies.length === 0) ? (<><p className="movies-list__nothing-found">Ничего не
                            нашлось</p></>) : (
                            (location.pathname === "/movies") ?
                                (movies.slice(0, shownMovies).map((movie) => (
                                <MoviesCard movie={movie} key={movie.id || movie._id} isLiked={isLiked} savedMovies={savedMovies} handleMovieDelete={handleMovieDelete}
                                            handleMovieLike={handleMovieLike}/>
                            ))
                        ) : (movies.map((movie) => (<MoviesCard movie={movie} key={movie.id || movie._id} savedMovies={savedMovies} handleMovieDelete={handleMovieDelete}
                                                                          handleMovieLike={handleMovieLike}/>

                                ))))}
                    </ul>
                    {location.pathname === "/movies" && movies.length > shownMovies ? (
                        <button className="films__button" onClick={handleFilmsButtonClick}
                                type="button">Ещё</button>) : ("")}
                </>
            )}


        </section>

    )
}

export default MoviesCardList;