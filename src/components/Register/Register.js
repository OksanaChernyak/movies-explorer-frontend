import "./Register.css";
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";

function Register() {
    return (
        <section className="register">
            <div className="register__wrapper">
                <img className="register__logo" alt="логотип" src={logo}/>
                <h2 className="register__title">Добро пожаловать!</h2>
            </div>
            <form className="register__container" name="register">
                <fieldset className="register__inputs">
                    <label className="register__label" for="name-input">Имя</label>
                    <input className="register__input" id="name-input"
                           type="name"
                           value="Оксана"
                           minLength="2"
                           maxLength="40"
                           required/>
                    <span className="error name-input-error"></span>
                    <label className="register__label" for="email-input">E-mail</label>
                    <input className="register__input" id="email-input"
                           type="Email"
                           value="pochta@yandex.ru"
                           minLength="2"
                           maxLength="40"
                           required/>
                    <span className="error email-input-error"></span>
                    <label className="register__label" for="password-input">Пароль</label>
                    <input className="register__input" id="password-input"
                           type="password"
                           value="ffff"
                           minLength="2"
                           maxLength="40"
                           required
                    />
                    <span className="error password-input-error">Что-то пошло не так...</span>
                    <button
                        className="register__submit-button"
                        type="submit"
                        aria-label="Зарегистрироваться"
                    >Зарегистрироваться
                    </button>
                </fieldset>
            </form>
            <div className="register__signin">
                <p className="register__text">Уже зарегистрированы?</p>
                <Link to="/signin" className="register__signin-link">Войти</Link>
            </div>
        </section>
    )
}

export default Register;