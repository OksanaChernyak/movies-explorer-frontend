import "./Movies.css";
import {useState, useEffect} from "react";
import HeaderMovies from "../Header/HeaderMovies";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";


function Movies({isMovies, isLiked, apiItems, isPreloaderActive, savedMovies, handleMovieDelete, handleMovieLike}) {
    const [searchResult, setSearchResult] = useState([]);
    const [someMoviesFound, setSomeMoviesFound] = useState(undefined);

    useEffect(()=> {
        showSearchResult();
    }, []);

    const handleSearchButtonClick = (searchRequest, shortie) => {
        const searchResult = apiItems.filter((item) => item.nameRU.toLowerCase().includes(searchRequest.toLowerCase()));
        shortie ? setSearchResult(searchResult.filter((item) => item.duration <= 40)) : setSearchResult(searchResult);
        (searchResult.length > 0) ? setSomeMoviesFound(true) : setSomeMoviesFound(false);
        localStorage.setItem("mySearch", JSON.stringify(searchRequest));
        console.log(searchResult)
    }

    const showSearchResult = () => {
        setSearchResult(apiItems.filter((item) => item.nameRU.toLowerCase().includes(JSON.parse(localStorage.getItem("mySearch")).toLowerCase())));
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