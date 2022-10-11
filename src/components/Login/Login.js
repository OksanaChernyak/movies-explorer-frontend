import "./Login.css";
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function Login({handleLogin}) {
    const [email, setEmail] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [emailError, setEmailError] = useState(("Укажите адрес почты, поле не может быть пустым"));
    const [passwordError, setPasswordError] = useState(("Укажите пароль, поле не может быть пустым"));
    const [isFormValid, setIsFormValid] = useState(false);
//если есть ошибки в заполнении формы, то тогда форма невалидна
    useEffect(() => {
        if (emailError || passwordError) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }
    }, [emailError, passwordError])

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Неверный формат электронной почты")
        } else {
            setEmailError("")
        }
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 16) {
            setPasswordError("Пароль не должен быть короче 2 символов и длиннее 16 символов")
            if (!e.target.value) {
                setPasswordError("Укажите пароль, поле не может быть пустым")
            }
        } else {
            setPasswordError("");
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({email, password});
    };
    //при уходе из поля ввода меняет стейты, отвечающие за то, было ли что-то введено в инпуты
    const handleBlur = (e) => {
        switch (e.target.name) {
            case "email":
                setEmailTouched(true)
                break
            case "password":
                setPasswordTouched(true)
                break
        }
    }

    return (
        <section className="login">
            <div className="login__wrapper">
                <img className="login__logo" alt="логотип" src={logo}/>
                <h2 className="login__title">Рады видеть!</h2>
            </div>
            <form className="login__container" name="login" onSubmit={handleSubmit} noValidate>
                <fieldset className="login__inputs">
                    <label className="login__label" htmlFor="email-input">E-mail</label>
                    <input className="login__input" id="email-input"
                           type="Email"
                           name='email'
                           value={email}
                           onChange={handleChangeEmail}
                           required
                           onBlur={handleBlur}
                    />
                    <span className={(emailTouched && emailError)
                        ? "error error_active email-input-error"
                        : "error email-input-error"}>{emailError}</span>
                    <label className="login__label" htmlFor="password-input">Пароль</label>
                    <input className="login__input" id="password-input"
                           type="password"
                           name="password"
                           value={password}
                           onChange={handleChangePassword}
                           minLength="2"
                           maxLength="40"
                           required
                           onBlur={handleBlur}
                    />
                    <span className={(passwordTouched && passwordError)
                        ? "error error_active password-input-error"
                        : "error password-input-error"}>{passwordError}</span>
                    <button
                        className={isFormValid ? "login__submit-button" : "login__submit-button_disabled"}
                        type="submit"
                        aria-label="Войти"
                        disabled={!isFormValid}
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