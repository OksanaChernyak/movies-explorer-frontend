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
            <main>
                <SearchForm/>

                {/* <Preloader/> */}
                <MoviesCardList isMovies={isMovies}/>
            </main>
            <Footer/>
        </div>
    )
}

export default Movies;