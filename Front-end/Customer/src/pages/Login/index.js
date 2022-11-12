import React, { useReducer, useRef } from 'react';
import { Link } from 'react-router-dom';
import Images from '~/assets/images';
import classes from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
// import IconButton from '@material-ui/core/IconButton';
// import Visibility from '@material-ui/icons/Visibility';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

const initState = {
    gmail: '',
    password: '',
};

const SET_GMAIL = 'set_gmail';
const SET_PASSWORD = 'set_password';

const setGmail = (payload) => {
    return {
        type: SET_GMAIL,
        payload,
    };
};

const setPass = (payload) => {
    return {
        type: SET_PASSWORD,
        payload,
    };
};

const reducer = (state, action) => {
    console.log('Action:', action);
    console.log('Prev state:', state);

    switch (action.type) {
        case SET_GMAIL:
            return {
                ...state,
                gmail: action.payload,
            };
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload,
            };
        default:
            throw new Error('Invalid action type: ' + action.type);
    }
};

export default function LoginPage() {
    const [state, dispatch] = useReducer(reducer, initState);
    const { gmail, password } = state;

    let gmailRef = useRef();
    let passRef = useRef();
    let errorGmailRef = useRef();
    console.log(errorGmailRef);

    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // function handleGmail() {
    //     if (!mailFormat.test(gmail)) {
    //         // dispatch(setGmail('Mail của bạn nhập không đúng'));
    //         gmailRef.current.className = classes.unrequired;
    //         return false;
    //     }
    //     return true;
    // }

    function handleSubmit(e) {
        if (!mailFormat.test(gmail)) {
            gmailRef.current.className = classes.unrequired;
            errorGmailRef.current.innerHTML = '<FontAwesomeIcon icon={faExclamationCircle} />Nhập gmail';
            e.preventDefault();
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapper__logo}>
                <img src={Images.logoImage} alt="none" />
            </div>
            <div className={classes.wrapper__form}>
                <h2>Đăng nhập</h2>
                <form action="/">
                    <p>
                        <input
                            id="gmail"
                            type="text"
                            name="first__name"
                            placeholder="Nhập gmail của bạn"
                            // className={classes.unrequired}
                            ref={gmailRef}
                            value={gmail}
                            onChange={(e) => {
                                dispatch(setGmail(e.target.value));
                            }}
                            // onBlur={handleGmail}
                        />
                        <br />
                        <text id={classes.req__gmail} ref={errorGmailRef}></text>
                    </p>
                    <p>
                        <input
                            id="password"
                            type="text"
                            name="password"
                            placeholder="Nhập mật khẩu của bạn"
                            ref={passRef}
                            value={password}
                            onChange={(e) => {
                                dispatch(setPass(e.target.value));
                            }}
                            // endAdornment={
                            //     <InputAdornment position="end">
                            //         <IconButton
                            //         // onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}
                            //         >
                            //             {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                            //         </IconButton>
                            //     </InputAdornment>
                            // }
                        />
                        <br />
                        <text id={classes.req__pass}>
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            Nhập mật khẩu
                        </text>
                        <br />
                        <Link to="/forgot">
                            <label>Quên mật khẩu?</label>
                        </Link>
                    </p>
                    <p>
                        <button id={classes.sub__btn} type="submit" onClick={handleSubmit}>
                            Đăng nhập
                        </button>
                    </p>
                </form>
                <footer>
                    <p>
                        Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
}
