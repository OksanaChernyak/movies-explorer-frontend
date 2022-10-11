import "./Register.css";
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

function Register({handleRegister}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [nameError, setNameError] = useState(("Укажите ваше имя, поле не может быть пустым"));
    const [emailError, setEmailError] = useState(("Укажите адрес почты, поле не может быть пустым"));
    const [passwordError, setPasswordError] = useState(("Укажите пароль, поле не может быть пустым"));
    const [isFormValid, setIsFormValid] = useState(false);
//если есть ошибки в заполнении формы, то тогда форма невалидна
    useEffect(() => {
        if (emailError || passwordError || nameError) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }
    }, [nameError, emailError, passwordError])

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
        handleRegister({name, email, password});
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
            case "name":
                setNameTouched(true)
                break
        }
    }
    return (
        <section className="register">
            <div className="register__wrapper">
                <img className="register__logo" alt="логотип" src={logo}/>
                <h2 className="register__title">Добро пожаловать!</h2>
            </div>
            <form className="register__container" name="register" onSubmit={handleSubmit} noValidate>
                <fieldset className="register__inputs">
                    <label className="register__label" htmlFor="name-input">Имя</label>
                    <input className="register__input" id="name-input"
                           type="name"
                           name="name"
                           value={name}
                           onChange={handleChangeName}
                           minLength="2"
                           maxLength="30"
                           onBlur={handleBlur}
                           required/>
                    <span className={(nameTouched && nameError)
                        ? "error error_active name-input-error"
                        : "error name-input-error"}>{nameError}</span>
                    <label className="register__label" htmlFor="email-input">E-mail</label>
                    <input className="register__input" id="email-input"
                           type="Email"
                           value={email}
                           name="email"
                           onChange={handleChangeEmail}
                           onBlur={handleBlur}
                           required/>
                    <span className={(emailTouched && emailError)
                        ? "error error_active email-input-error"
                        : "error email-input-error"}>{emailError}</span>
                    <label className="register__label" htmlFor="password-input">Пароль</label>
                    <input className="register__input" id="password-input"
                           type="password"
                           value={password}
                           name="password"
                           onChange={handleChangePassword}
                           minLength="2"
                           maxLength="16"
                           onBlur={handleBlur}
                           required
                    />
                    <span className={(passwordTouched && passwordError)
                        ? "error error_active password-input-error"
                        : "error password-input-error"}>{passwordError}</span>
                    <button
                        className={isFormValid ? "register__submit-button" : "register__submit-button_disabled"}
                        type="submit"
                        aria-label="Зарегистрироваться"
                        disabled={!isFormValid}
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