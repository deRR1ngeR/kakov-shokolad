import { Link } from 'react-router-dom'
import classes from './styles/About.module.css'

export const About = () => {
    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Что такое kakov_shokolad?</h2>
            <div className={classes.infoContainer}>
                <img src='about.png' />
                <p>
                    texttexttexttexttexttexttexttexttexttexttextte
                    xttexttexttexttexttexttexttexttexttexttexttexttext
                    texttexttexttexttexttexttexttexttexttext
                    texttexttexttexttexttexttexttexttexttexttextte
                    xttexttexttexttexttexttexttexttexttexttexttexttext
                    texttexttexttexttexttexttexttexttexttext
                    texttexttexttexttexttexttexttexttexttexttextte
                    xttexttexttexttexttexttexttexttexttexttexttexttext
                    texttexttexttexttexttexttexttexttexttext
                    texttexttexttexttexttexttexttexttexttexttextte
                    xttexttexttexttexttexttexttexttexttexttexttexttext
                    texttexttexttexttexttexttexttexttexttext
                    texttexttexttexttexttexttexttexttexttexttextte
                    xttexttexttexttexttexttexttexttexttexttexttexttext
                    texttexttexttexttexttexttexttexttexttext
                </p>
                <div className={classes.firstCont}>
                    <img src='first.jpg' />
                    <h1> Только самый вкусный шоколад ручной работы</h1>
                </div>

                <div className={classes.secondCont}>
                    <img src='second.jpg' />
                    <h1> Только самый вкусный шоколад ручной работы</h1>
                </div>
                <div className={classes.thirdCont}>
                    <img src='third.jpg' />
                    <h1> Только самый вкусный шоколад ручной работы</h1>
                </div>
            </div>

            <Link to={'/catalog/1'}>
                <button className={classes.show_all_btn}>
                    Просмотреть каталог
                </button>
            </Link>
        </div>
    )
}