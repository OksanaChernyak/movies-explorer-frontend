import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import HeaderMovies from "../Header/HeaderMovies";
import Footer from "../Footer/Footer";
import {useState, useEffect} from "react";

function SavedMovies({isMovies, savedMovies, isLiked, isMovieLiked, handleMovieDelete}) {
    const [searchResult, setSearchResult] = useState(localStorage.getItem("liked") ? JSON.parse(localStorage.getItem("liked")) : []);
    const [someMoviesFound, setSomeMoviesFound] = useState(undefined);

    const handleSearchButtonClick = (searchRequest, shortie) => {
        const searchResult = savedMovies.filter((item) => item.nameRU.toLowerCase().includes(searchRequest.toLowerCase()));
        shortie ? setSearchResult(searchResult.filter((item) => item.duration <= 40)) : setSearchResult(searchResult);
        (searchResult.length > 0) ? setSomeMoviesFound(true) : setSomeMoviesFound(false);
        localStorage.setItem("mySavedSearch", JSON.stringify(searchRequest));
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