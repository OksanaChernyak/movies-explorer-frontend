import "./Movies.css";
import {useState, useEffect} from "react";
import HeaderMovies from "../Header/HeaderMovies";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";


function Movies({isMovies,isLiked, apiItems, isPreloaderActive, savedMovies, handleMovieDelete, handleMovieLike}) {
    const [searchResult, setSearchResult] = useState([]);
    const [someMoviesFound, setSomeMoviesFound] = useState(undefined);

    useEffect(()=> {
        showSearchResult();
    }, []);

    const handleSearchButtonClick = (searchRequest, shortie) => {
        const searchResult = apiItems.filter((item) => item.nameRU.includes(searchRequest));
        shortie ? setSearchResult(searchResult.filter((item) => item.duration <= 40)) : setSearchResult(searchResult);
        (searchResult.length > 0) ? setSomeMoviesFound(true) : setSomeMoviesFound(false);
    }

    const showSearchResult = () => {
        setSearchResult(apiItems);
    }

    return (
        <div className="movies">
            <HeaderMovies/>
            <main>
                <SearchForm handleSearchButtonClick={handleSearchButtonClick}/>
                <MoviesCardList movies={searchResult} someMoviesFound={someMoviesFound}
                                isPreloaderActive={isPreloaderActive}
                                isLiked={isLiked}
                                isMovies={isMovies} savedMovies={savedMovies}
                                handleMovieDelete={handleMovieDelete} handleMovieLike={handleMovieLike}/>
            </main>
            <Footer/>
        </div>
    )
}

export default Movies;