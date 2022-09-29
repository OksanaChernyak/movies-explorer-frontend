import "./Promo.css";
import planet from "../../images/web_pic.svg";

function Promo() {
    return (
        <div className="promo">
            <div className="promo__content">
                <h1 className="promo__title">Учебный&nbsp;проект студента факультета
                    Веб&#8209;разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a href="#about-me" className="promo__link">Узнать больше</a>
            </div>
            <img src={planet} alt="изображение земного шара, где вода состоит из букв WEB" className="promo__image"/>
        </div>
    )
}

export default Promo;