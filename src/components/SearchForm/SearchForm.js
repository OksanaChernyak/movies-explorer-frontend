import "./SearchForm.css";
import icon from "../../images/search-icon.svg";

function SearchForm() {
    return (
        <section className="search">
            <div className="search__container">
                <form className="search-form">
                    <input className="search-form__input" placeholder="Фильм"/>
                    <button className="search-form__button" type="button">Найти</button>
                </form>
                <div className="checkbox">
                    <label className="checkbox__label">
                        <input type="checkbox" className="checkbox__input" value="no" />
                        Короткометражки
                    </label>
                </div>
            </div>
        </section>
    )
}

export default SearchForm;