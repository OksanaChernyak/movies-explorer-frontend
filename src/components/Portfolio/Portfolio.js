import "./Portfolio.css";
import arrow from "../../images/arrow_icon.svg";

function Portfolio() {
    return (
        <section className="portfolio">
            <h4 className="portfolio__title">Портфолио</h4>
            <ul className="portfolio__list">
                <li className="portfolio__item"><a href="https://github.com/OksanaChernyak/how-to-learn"
                                                   className="portfolio__link"><p
                    className="portfolio__text">Статичный
                    сайт</p><img alt="картинка для перехода по ссылке" src={arrow} className="portfolio__icon"/></a>
                </li>
                <li className="portfolio__item"><a href="https://github.com/OksanaChernyak/russian-travel"
                                                   className="portfolio__link"><p
                    className="portfolio__text">Адаптивный
                    сайт</p><img alt="картинка для перехода по ссылке" src={arrow} className="portfolio__icon"/></a>
                </li>
                <li className="portfolio__item"><a href="https://github.com/OksanaChernyak/react-mesto-api-full"
                                                   className="portfolio__link"><p
                    className="portfolio__text">Одностраничное приложение</p><img
                    alt="картинка для перехода по ссылке"
                    src={arrow}
                    className="portfolio__icon"/></a></li>
            </ul>
        </section>
    )
}

export default Portfolio;