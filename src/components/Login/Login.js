import "./Login.css";
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";

function Login() {
    return (
        <section className="login">
            <div className="login__wrapper">
                <img className="login__logo" alt="логотип" src={logo}/>
                <h2 className="login__title">Рады видеть!</h2>
            </div>
            <form className="login__container" name="login">
                <fieldset className="login__inputs">
                    <label className="login__label" htmlFor="email-input">E-mail</label>
                    <input className="login__input" id="email-input"
                           type="Email"
                           value="pochta@yandex.ru"
                           minLength="2"
                           maxLength="40"
                           required/>
                    <span className="error email-input-error"></span>
                    <label className="login__label" htmlFor="password-input">Пароль</label>
                    <input className="login__input" id="password-input"
                           type="password"
                           value="ffff"
                           minLength="2"
                           maxLength="40"
                           required
                    />
                    <span className="error password-input-error">Что-то пошло не так...</span>
                    <button
                        className="login__submit-button"
                        type="submit"
                        aria-label="Войти"
                    >Войти
                    </button>
                </fieldset>
            </form>
            <div className="login__signup">
                <p className="login__text">Ещё не зарегистрированы?</p>
                <Link to="/signup" className="login__signup-link">Регистрация</Link>
            </div>
        </section>
    )
}

export default Login;