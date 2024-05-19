import { SvgIcon } from '@mui/material';
import classes from './styles/Contact.module.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';

export const Contact = () => {
    return (
        <div className={classes.container}>
            <div className={classes.firstContainer}>
                <img src='contact.png' />
                <div className={classes.contactInfo}>
                    <h3> Контакты</h3>
                    <label> Консультация по всем вопросам (ПН-ПТ): 8-800-555-35-35</label>
                    <br />
                    <label> Юридический адрес: Улица Проскурова, дом 25</label>
                    <br />
                    <br />
                    <h4> email</h4>
                    <label> 0g6Ld@example.com</label>
                </div>
            </div>
            <div className={classes.instInfo}>
                <div >
                    <SvgIcon>
                        <SvgIcon component={InstagramIcon} fontSize="large" inheritViewBox />
                    </SvgIcon>
                    <br />
                    <label> @kakov_shokolad</label>
                </div>
                <Link to={'https://www.instagram.com/kakov_shokolad/'} style={{ width: '50%' }}>
                    <img src='inst.png' />
                </Link>

                <div >
                    <SvgIcon>
                        <SvgIcon component={InstagramIcon} fontSize="large" inheritViewBox />
                    </SvgIcon>
                    <br />
                    <label > @kakov_shokolad</label>
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