import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import HeaderMovies from "../Header/HeaderMovies";
import Footer from "../Footer/Footer";
import {useState, useEffect} from "react";

function SavedMovies({isMovies, savedMovies, isLiked, isMovieLiked, handleMovieDelete}) {
    const [searchResult, setSearchResult] = useState([]);
    const [someMoviesFound, setSomeMoviesFound] = useState(undefined);

    useEffect(()=> {
        showSearchResult();
    }, []);

    const handleSearchButtonClick = (searchRequest, shortie) => {
        console.log(shortie)
        const searchResult = savedMovies.filter((item) => item.nameRU.includes(searchRequest));
        shortie ? setSearchResult(searchResult.filter((item) => item.duration <= 40)) : setSearchResult(searchResult);
        (searchResult.length > 0) ? setSomeMoviesFound(true) : setSomeMoviesFound(false);
    }
    const showSearchResult = () => {
        setSearchResult(savedMovies);
    }
    return (
        <div className="saved-movies">
            <HeaderMovies/>
            <main>
                <SearchForm handleSearchButtonClick={handleSearchButtonClick}/>
                <MoviesCardList movies={searchResult} isLiked={isLiked} someMoviesFound={someMoviesFound} savedMovies={savedMovies}
                                isMovieLiked={isMovieLiked} isMovies={isMovies} handleMovieDelete={handleMovieDelete}/>
            </main>
            <Footer/>
        </div>
    )
}

export default SavedMovies;