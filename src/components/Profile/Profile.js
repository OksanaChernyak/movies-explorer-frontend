import "./Profile.css";
import {Link} from "react-router-dom";
import {useState, useContext, useEffect} from "react";
import HeaderMovies from "../Header/HeaderMovies";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile({handleChangeProfile}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        currentUser.name !== undefined && setName(currentUser.name);
        currentUser.email !== undefined && setEmail(currentUser.email)
    }, [currentUser]);

    const handleChangeName = (e) => {
        setName(e.target.value)
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleChangeProfile({name, email});
    };
    return (
        <>
        <HeaderMovies/>
        <div className="profile">
            <form
                name="profile"
                className="profile__container"
                onSubmit={handleSubmit}
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
                            onChange={handleChangeName}
                            minLength="2"
                            maxLength="40"
                            required
                        />
                    </div>
                    <div className="profile__wrapper">
                        <label className="profile__label" htmlFor="email-input">
                            E-mail</label>
                        <input
                            className="profile__input profile__input_type_email"
                            id="email-input"
                            type="Email"
                            value={email}
                            onChange={handleChangeEmail}
                            minLength="2"
                            maxLength="40"
                            required
                        />
                    </div>
                    <button
                        className="profile__submit-button"
                        type="submit"
                        aria-label="Редактировать"
                    >Редактировать
                    </button>
                    <Link to="/signin" className="profile__signout-link">Выйти из аккаунта</Link>
                </fieldset>
            </form>
        </div>
        </>
    )
}

export default Profile;