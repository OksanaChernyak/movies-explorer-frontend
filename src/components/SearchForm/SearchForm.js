import "./SearchForm.css";
import {useEffect, useState} from "react";

function SearchForm({handleSearchButtonClick}) {
    const [searchRequest, setSearchRequest] = useState("");
    const [shortie, setShortie] = useState(false);
    const [searchError, setSearchError] = useState(("Введите ключевое слово"));
    const [isFormValid, setIsFormValid] = useState(false);

    const [searchTouched, setSearchTouched] = useState(false);
    useEffect(() => {
        if (searchError) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }
    }, [searchError]);

    //поменяй состояние чекбокса, если в локалке есть короткометражки
    useEffect(() => {
        setShortie(JSON.parse(localStorage.getItem("shortie")))
    }, []);
    //отправка формы поиска - кнопка найти
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearchButtonClick(searchRequest, shortie);
        localStorage.setItem("shortie", JSON.stringify(shortie))
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
        setSearchRequest(e.target.value)

        if (!e.target.value) {
            setSearchError("Введите ключевое слово для поиска")
        } else {
            setSearchError("");
        }
    }
    const handleBlur = (e) => {
        switch (e.target.name) {
            case "search":
                setSearchTouched(true)
                break

        }
    }

    return (
        <section className="search">
            <span className={(searchTouched && searchError)
                ? "error error_active"
                : "error"}>{searchError}</span>
            <div className="search__container">
                <form className="search-form" onSubmit={handleSubmit} noValidate>
                    <input className="search-form__input" placeholder="Фильм" name="search" value={searchRequest}
                           onChange={handleSearchInput} onBlur={handleBlur} required/>
                    <button className={isFormValid ? "search-form__button" : "search-form__button_disabled"}
                            onSubmit={handleSubmit} type="submit" disabled={!isFormValid}>Найти
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