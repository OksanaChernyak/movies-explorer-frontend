import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

function SavedMovies() {
    return (
        <div className="saved-movies">
            <SearchForm/>
            <MoviesCardList/>
        </div>
    )
}

export default SavedMovies;