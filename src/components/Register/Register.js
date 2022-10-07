import "./Register.css";
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import {useState} from "react";

function Register({handleRegister}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeName = (e) => {
        setName(e.target.value)
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister({name, email, password});
    };
    return (
        <section className="register">
            <div className="register__wrapper">
                <img className="register__logo" alt="логотип" src={logo}/>
                <h2 className="register__title">Добро пожаловать!</h2>
            </div>
            <form className="register__container" name="register" onSubmit={handleSubmit}>
                <fieldset className="register__inputs">
                    <label className="register__label" htmlFor="name-input">Имя</label>
                    <input className="register__input" id="name-input"
                           type="name"
                           value={name}
                           onChange={handleChangeName}
                           minLength="2"
                           maxLength="40"
                           required/>
                    <span className="error name-input-error"></span>
                    <label className="register__label" htmlFor="email-input">E-mail</label>
                    <input className="register__input" id="email-input"
                           type="Email"
                           value={email}
                           onChange={handleChangeEmail}
                           minLength="2"
                           maxLength="40"
                           required/>
                    <span className="error email-input-error"></span>
                    <label className="register__label" htmlFor="password-input">Пароль</label>
                    <input className="register__input" id="password-input"
                           type="password"
                           value={password}
                           onChange={handleChangePassword}
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