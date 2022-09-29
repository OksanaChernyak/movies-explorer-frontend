import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import HeaderMovies from "../Header/HeaderMovies";
import Footer from "../Footer/Footer";

function SavedMovies({isMovies}) {
    return (
        <div className="saved-movies">
            <HeaderMovies/>
            <SearchForm/>
            <MoviesCardList isMovies={isMovies}/>
            <Footer/>
        </div>
    )
}

export default SavedMovies;