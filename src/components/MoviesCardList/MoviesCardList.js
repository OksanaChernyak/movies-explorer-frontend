import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
    return (
            <section className="films">
                <ul className="movies-list">
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                </ul>
                <button className="films__button" type="button">Ещё</button>
            </section>

    )
}

export default MoviesCardList;