import classes from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <div className={classes['footer']}>
            <div className={classes['footer__contact']}>
                <div className={classes['logo_ct']}>
                    <span className={classes['logo']}>E</span>FOOD
                </div>
                <h3>CONTACT INFOR</h3>
                <ul className={classes['contact__list']}>
                    <li>Mail: haha@gmail.com</li>
                    <li>Hotline: 09352341234</li>
                    <li>Address: KTX 135B Trần Hưng Đạo</li>
                </ul>
            </div>

            <div className={classes['footer__apply']}>
                <ul className={classes['footer__apply-link']}>
                    <li>
                        <a href="https://www.facebook.com/" className={classes['footer__link']}>
                            <FontAwesomeIcon className = {classes['footer__icon']} icon={faFacebook} />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/" className={classes['footer__link']}>
                            <FontAwesomeIcon className = {classes['footer__icon']} icon={faInstagram} />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/" className={classes['footer__link']}>
                            <FontAwesomeIcon className = {classes['footer__icon']} icon={faYoutube} />
                        </a>
                    </li>
                </ul>
                <h3>JOB APPLICATION</h3>
                <span className={classes['input__email']}>Enter your email:</span>
                <input type="text" className={classes['Email__input']}></input>
            </div>
        </div>
    )
}

export default Footer;