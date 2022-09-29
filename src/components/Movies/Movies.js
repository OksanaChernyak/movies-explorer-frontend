import "./Movies.css";
import HeaderMovies from "../Header/HeaderMovies";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";


function Movies({isMovies}) {
    return (
        <div className="movies">
            <HeaderMovies/>
            <SearchForm/>
            <Preloader/>
            {/* <Preloader/> */ }
            <MoviesCardList isMovies={isMovies}/>
            <Footer/>
        </div>
    )
}

export default Movies;