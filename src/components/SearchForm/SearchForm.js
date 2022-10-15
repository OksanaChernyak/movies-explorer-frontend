import "./SearchForm.css";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function SearchForm({handleSearchButtonClick}) {
    let mySearch = localStorage.getItem("mySearch");
    const [searchRequest, setSearchRequest] = useState("");
    const [savedShortie, setSavedShortie] = useState(false);
    const [shortie, setShortie] = useState((localStorage.getItem("shortie")) ? (JSON.parse(localStorage.getItem("shortie"))) : false);
    const [searchError, setSearchError] = useState((""));
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/movies") {
            if (mySearch) {
                setSearchRequest(JSON.parse(mySearch))
            }
        }
        localStorage.setItem("savedShortie", JSON.stringify(false));
    }, []);

    //поменяй состояние чекбокса, если в локалке есть короткометражки
    useEffect(() => {
        setShortie(JSON.parse(localStorage.getItem("shortie")));
        setSavedShortie(JSON.parse(localStorage.getItem("savedShortie")))
    }, []);

    //отправка формы поиска - кнопка найти
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchRequest) {
            setSearchError("Нужно ввести ключевое слово")
        } else {
            setSearchError("");
            if (location.pathname === "/movies") {
                handleSearchButtonClick(searchRequest, shortie);
                localStorage.setItem("shortie", false)
            } else {
                handleSearchButtonClick(searchRequest, savedShortie)
                localStorage.setItem("savedShortie", false)
            }
        }

    }

    //меняем состояние чекбокса
    const toggleCheckbox = () => {
        if (shortie) {
            setShortie(false);
           // setSavedShortie(false);
            handleSearchButtonClick(searchRequest, false);
            if (location.pathname === "/movies")
                localStorage.setItem("shortie", JSON.stringify(false))
          //  else localStorage.setItem("savedShortie", JSON.stringify(false))
        } else {
            setShortie(true);
          //  setSavedShortie(true);
            handleSearchButtonClick(searchRequest, true);
            if (location.pathname === "/movies")
                localStorage.setItem("shortie", JSON.stringify(true))
         //   else localStorage.setItem("savedShortie", JSON.stringify(true))
        }
    }
    const toggleSavedCheckbox = () => {
        if (savedShortie) {
            setSavedShortie(false);
            handleSearchButtonClick(searchRequest, false);
            localStorage.setItem("savedShortie", JSON.stringify(false))
        } else {
            setSavedShortie(true);
            handleSearchButtonClick(searchRequest, true);
            localStorage.setItem("savedShortie", JSON.stringify(true))
        }
    }
    //при введении символов в инпут - меняется запрос
    const handleSearchInput = (e) => {
        setSearchRequest(e.target.value);
    }

    return (
        <section className="search">
            <span className={"error error_active"}>{searchError}</span>
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
                        <input type="checkbox" className="checkbox__input" value="no"
                               checked={(location.pathname === "/movies") ? shortie : savedShortie}
                               onChange={(location.pathname === "/movies") ? toggleCheckbox: toggleSavedCheckbox}/>
                        Короткометражки
                    </label>
                </div>

            </div>
        </section>
    )
}


export default SearchForm;