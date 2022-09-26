import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__columns">
                <div className="about-project__column">
                    <h3 className="about-project__subtitle">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__column">
                    <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                        соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <table className="progressbar">
                <tr className="progressbar__row">
                    <td className="progressbar__bar progressbar__bar_type_back">1 неделя</td>
                    <td className="progressbar__bar progressbar__bar_type_front">4 недели</td>
                </tr>
                <tr className="progressbar__row progressbar__row_type_capture">
                    <td className=" progressbar__capture">Back-end</td>
                    <td className="progressbar__capture">Front-end</td>
                </tr>
            </table>


        </section>
    )
}

export default AboutProject;