import "./NotFound.css";
import {Link, useNavigate} from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    const goBack = () => navigate(-2);
    return (
        <section className="not-found">
<h2 className="not-found__title">404</h2>
            <p className="not-found__subtitle">Страница не найдена</p>
            <button onClick={goBack} className="not-found__back-link">Назад</button>
        </section>
    )
}

export default NotFound;