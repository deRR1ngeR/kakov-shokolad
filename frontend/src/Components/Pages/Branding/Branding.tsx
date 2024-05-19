import { Link } from 'react-router-dom'
import classes from './styles/Branding.module.css'

export const Branding = () => {
    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Вы можете заказать шоколад со своим брендом</h2>
            <div className={classes.infoContainer}>
                <div className={classes.firstCont}>

                    <img src='brand1.jpg' />
                    <h3> Для вашего бренда будет разработана специальная силиконовая форма</h3>
                </div>
                <div className={classes.secondCont}>

                    <h3> Для вашего бренда будет разработана специальная силиконовая форма</h3>
                    <img src='brand2.jpg' />
                </div>
                <div className={classes.firstCont}>

                    <img src='brand3.jpg' />
                    <h3> Для вашего бренда будет разработана специальная силиконовая форма</h3>
                </div>

                <div style={{ marginTop: '50px', height: '150px' }}>
                    <h3> Контакты</h3>
                    <label> Консультация по всем вопросам (ПН-ПТ): 8-800-555-35-35</label>
                    <br />
                    <label> Юридический адрес: Улица Проскурова, дом 25</label>
                    <br />
                    <br />
                    <h4> email</h4>
                    <label> 0g6Ld@example.com</label> </div>

                <Link to={'/contacts'}>
                    <button className={classes.show_all_btn}>
                        Связаться с нами
                    </button>
                </Link>
            </div>
        </div>
    )
}