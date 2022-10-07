import "./SearchForm.css";

function SearchForm() {
    return (
        <section className="search">
            <div className="search__container">
                <form className="search-form" >
                    <input className="search-form__input" placeholder="Фильм" required/>
                    <button className="search-form__button" type="submit">Найти</button>
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