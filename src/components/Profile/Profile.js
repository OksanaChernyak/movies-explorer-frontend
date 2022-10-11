import "./Profile.css";
import {Link} from "react-router-dom";
import {useState, useContext, useEffect} from "react";
import HeaderMovies from "../Header/HeaderMovies";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile({handleChangeProfile, handleLogout}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [nameError, setNameError] = useState(("Укажите ваше имя, поле не может быть пустым"));
    const [emailError, setEmailError] = useState(("Укажите адрес почты, поле не может быть пустым"));
    const [isFormValid, setIsFormValid] = useState(false);
    const currentUser = useContext(CurrentUserContext);
//если есть ошибки в заполнении формы, то тогда форма невалидна
    useEffect(() => {
        if (emailError ||  nameError) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }
    }, [nameError,emailError]);

    useEffect(() => {
        currentUser.name !== undefined && setName(currentUser.name);
        currentUser.email !== undefined && setEmail(currentUser.email)
    }, [currentUser]);

    const handleChangeName = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 16) {
            setNameError("Имя не должно быть короче 2 символов и длиннее 30 символов")
            if (!e.target.value) {
                setNameError("Укажите ваше имя, поле не может быть пустым")
            }
        } else {
            setNameError("");
        }
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Неверный формат электронной почты")
        } else {
            setEmailError("")
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleChangeProfile({name, email});
    };
    //при уходе из поля ввода меняет стейты, отвечающие за то, было ли что-то введено в инпуты
    const handleBlur = (e) => {
        switch (e.target.name) {
            case "email":
                setEmailTouched(true)
                break
            case "name":
                setNameTouched(true)
                break
        }
    }
    return (
        <>
        <HeaderMovies/>
        <div className="profile">
            <form
                name="profile"
                className="profile__container"
                onSubmit={handleSubmit}
                noValidate
            >
                <h2 className="profile__title">Привет, {name}!</h2>
                <fieldset className="profile__inputs">
                    <div className="profile__wrapper">
                        <label className="profile__label" htmlFor="name-input">
                            Имя</label>
                        <input
                            className="profile__input profile__input_type_name"
                            type="name"
                            id="name-input"
                            value={name}
                            name="name"
                            onChange={handleChangeName}
                            minLength="2"
                            maxLength="30"
                            onBlur={handleBlur}
                            required
                        />
                    </div>
                    <span className={(nameTouched && nameError)
                        ? "error error_active name-input-error"
                        : "error name-input-error"}>{nameError}</span>
                    <div className="profile__wrapper">
                        <label className="profile__label" htmlFor="email-input">
                            E-mail</label>
                        <input
                            className="profile__input profile__input_type_email"
                            id="email-input"
                            type="Email"
                            name="email"
                            value={email}
                            onChange={handleChangeEmail}
                            minLength="2"
                            maxLength="16"
                            onBlur={handleBlur}
                            required
                        />

                    </div>
                    <span className={(emailTouched && emailError)
                        ? "error error_active email-input-error"
                        : "error email-input-error"}>{emailError}</span>
                    <button
                        className={(isFormValid && (emailTouched || nameTouched)) ? "profile__submit-button" : "profile__submit-button_disabled"}
                        type="submit"
                        aria-label="Редактировать"
                        disabled={!isFormValid}
                    >Редактировать
                    </button>
                    <Link to="/signin" className="profile__signout-link" onClick={handleLogout}>Выйти из аккаунта</Link>
                </fieldset>
            </form>
        </div>
        </>
    )
}

export default Profile;