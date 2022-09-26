import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__content">
                <span className="footer__copyright">&#169; 2022</span>
                <ul className="footer__nav">
                    <li className="footer__item"><a href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a></li>
                    <li className="footer__item"><a href="https://github.com/OksanaChernyak" className="footer__link">Github</a></li>
                </ul>
            </div>

        </footer>
    )
}

export default Footer;