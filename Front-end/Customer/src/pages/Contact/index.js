import classes from './Contact.module.scss';
import React, { useState, useRef } from 'react';

function EmailValid(email) {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (atposition < 1 || dotposition < (atposition + 2) || (dotposition + 2) >= email.length) {
        return false;
    }
    else {
        return true;
    }
}

function Contact() {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [checkNameValid, setCheckNameValid] = useState(false);
    const [checkEmailValid, setCheckEmailValid] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const NameInput = useRef();
    const EmailInput = useRef();

    function handleSubmitRes(e){
        e.preventDefault();

        if (Name === '' || Email === '') {
            alert('Please fill all fields!')
            setCheckNameValid(true);
            setCheckEmailValid(true);
            e.preventDefault();
            return;
        }
        else {
            setCheckNameValid(false);
            setCheckEmailValid(false);
        }

        if (Name.length < 3) {
            alert("This name is not exist.")
            setCheckNameValid(true);
            setName('');
            NameInput.current.focus();
            e.preventDefault();
            return;
        }
        else {
            setCheckNameValid(false);
        }

        if (!EmailValid(Email)) {
            alert("Email is not exist.");
            setCheckEmailValid(true);
            setEmail('');
            EmailInput.current.focus();
            e.preventDefault();
            return;
        }
        else {
            setCheckEmailValid(false);
        }

        setSaveSuccess(true);
        setTimeout(() => {
            setSaveSuccess(false);
        }, 2000)

    }
    return (
        <div className={classes['contact']}>
            <div className={classes['contact__body']}>
                <h3 className={classes['heading__contact']}>CONTACT US</h3>
                <p className={classes['paragraph__contact_line1']}>Have question about store, orders or your account</p>
                <p className={classes['paragraph__contact_line2']}>Send our Customer Service team a note below. We look forward to helping you</p>
                <form className={classes['input__form']}>
                    <div className={classes['input__row_1']}>
                        <input 
                        type="text" 
                        placeholder="Your name" 
                        className={classes['input__name']}
                        ref={NameInput}
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        />
                        <input 
                        type="email" 
                        placeholder="Your Email" 
                        className={classes['input__email']}
                        ref={EmailInput}
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={classes['input_row_2']}>
                        <textarea id="w3review" placeholder="Your message" className={classes['input__message']} name="w3review" rows="6" cols="50">
                        </textarea>
                    </div>
                    {!saveSuccess && <button onClick={handleSubmitRes} type="submit" className={classes['btn__submit']}>Send</button>}
                    {saveSuccess  && <button onClick={handleSubmitRes} type="submit" className={`${classes['btn__submit']} ${classes['btn__submit--successful']}`}>Complete Sent</button>}
                </form>
                
            </div>
        </div>
    )
}

export default Contact;