import "./SearchForm.css";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function SearchForm({handleSearchButtonClick}) {
    let mySearch = localStorage.getItem("mySearch");
    const [searchRequest, setSearchRequest] = useState("");
    const [shortie, setShortie] = useState((localStorage.getItem("shortie")) ? (JSON.parse(localStorage.getItem("shortie"))) : false);
    const [searchError, setSearchError] = useState((""));
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/movies") {
        if(mySearch) {
            setSearchRequest(JSON.parse(mySearch))
        }}
    }, []);

    //поменяй состояние чекбокса, если в локалке есть короткометражки
    useEffect(() => {
        setShortie(JSON.parse(localStorage.getItem("shortie")))
    }, [shortie]);

    //отправка формы поиска - кнопка найти
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchRequest) {
            setSearchError("Нужно ввести ключевое слово")
        } else {
            setSearchError("")
            handleSearchButtonClick(searchRequest, shortie);
            localStorage.setItem("shortie", JSON.stringify(shortie))
        }
    }
    //меняем состояние чекбокса
    const toggleCheckbox = () => {
        if (shortie) {
            setShortie(false);
            handleSearchButtonClick(searchRequest, false);
            localStorage.setItem("shortie", JSON.stringify(false))
        } else {
            setShortie(true);
            handleSearchButtonClick(searchRequest, true);
            localStorage.setItem("shortie", JSON.stringify(true))
        }
    }
    //при введении символов в инпут - меняется запрос
    const handleSearchInput = (e) => {
            setSearchRequest(e.target.value);
    }

    return (
        <section className="search">
            <span className={"error error_active" }>{searchError}</span>
            <div className="search__container">
                <form className="search-form" onSubmit={handleSubmit} noValidate>
                    <input className="search-form__input" placeholder="Фильм" name="search" value={searchRequest}
                           onChange={handleSearchInput} required/>
                    <button className="search-form__button"
                            onSubmit={handleSubmit} type="submit">Найти
                    </button>
                </form>
                <div className="checkbox">
                    <label className="checkbox__label">
                        <input type="checkbox"  className="checkbox__input" value="no" checked={shortie}
                               onChange={toggleCheckbox}/>
                        Короткометражки
                    </label>
                </div>

            </div>
        </section>
    )
}

export default SearchForm;