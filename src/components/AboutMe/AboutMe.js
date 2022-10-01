import "./AboutMe.css";
import photo from "../../images/photo.jpg";

function AboutMe() {
    return (
        <section className="about-me" id="about-me" >
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__content">
                <div className="about-me__wrapper">
                    <h3 className="about-me__name">Оксана</h3>
                    <p className="about-me__profession">Веб-разработчик, 32 года</p>
                    <p className="about-me__description">Родилась в Екатеринбурге, живу в Москве. Закончила факультет
                        искусствоведения и культурологии в УрФУ им.Б.Н.Ельцина. Замужем. Увлекаюсь настольными играми.
                        Работала
                        в основном на себя, все работы творческие. Решила заняться веб-разработкой, недавно начала
                        кодить.</p>
                    <a href="https://github.com/OksanaChernyak" className="about-me__github-link" target="_blank" rel="noreferrer">Github</a>
                </div>
                <img alt="моя фотография" src={photo} className="about-me__photo"/>
            </div>
        </section>
    )
}

export default AboutMe;