import "./ServerError.css";
import {Link} from "react-router-dom";

function ServerError() {
    return (
        <section className="server-error">
            <h2 className="server-error__title">500</h2>
            <p className="server-error__subtitle">Произошла ошибка сервера</p>
            <Link to="/" className="server-error__back-link">Назад</Link>
        </section>
    )
}

export default ServerError;