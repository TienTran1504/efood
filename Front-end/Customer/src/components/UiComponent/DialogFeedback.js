// import Background from 'hero-slider/dist/components/Slide/Background';
// import { margin } from '@mui/system';
import React, { useState } from 'react'; // nạp thư viện react
import './styleFeedback.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faFileLines,
    faPen
} from '@fortawesome/free-solid-svg-icons';
import Rate from './Rate';
import axios from 'axios';

const token = JSON.stringify(localStorage.getItem('token')).split('"').join('');
const tokenAuth = 'Bearer ' + token;
const headers = {
    Authorization: tokenAuth,
};



export default function DialogFeedback({items, IsOpen}) {
    const [statusRate, setStatusRate ] = useState(false);
    const [IdProduct, setIdProduct ] = useState(null);
    console.log(items);

    const handleRating = (choose) =>{
        if(choose){
            setStatusRate(false);
        }else{
            setStatusRate(false);
        }
    }

    const ratingFeedback = (itemId)=>{
        setIdProduct(itemId);
        setStatusRate(true);
    }

    const confirmSubmit = () => {
        const fbProduct = document.getElementById('fbProduct').value;
        const fbStore = document.getElementById('fbStore').value;

        if (fbProduct === '') alert('Vui lòng để lại nhận xét!');
        else if(fbStore==='') alert('Vui lòng để lại nhận xét cho cửa hàng!');
        IsOpen(false);
    }
    return (
        <div
            style={{
                position: 'fixed',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(0,0,0,0.5)',
                boxSizing: 'border-box'
            }}
        >
        <div className='containerFeedback'>
            <div className='headerFeedback'>
                ĐÁNH GIÁ ĐƠN HÀNG
            </div>
            <div className='content'>
                <div className='tableLeft'>
                    <table className='table1'>

                        <tbody>
                            <tr className='head'>
                                <td>Đơn hàng</td>
                            </tr>
                            {/* item */}
                            {items.map((item)=> (
                                <tr className='rowItem' key={item.id}>
                                    <td>
                                        <div className='infoLeft'>
                                            <img src={item.image} alt="error" />
                                            <div>
                                                {item.name}
                                            </div>
                                        </div>
                                        <div className='infoRight'>
                                            <FontAwesomeIcon icon={faStar} style={{marginRight:'10px', cursor:'pointer'}} onClick={()=>ratingFeedback(item.id)}/>
                                            <FontAwesomeIcon icon={faFileLines} style={{marginRight:'10px', cursor:'pointer'}} />
                                        </div>
                                    </td>
                                    {console.log(item)}
                                </tr>
                            ))}
                            {/* <tr className='rowItem'>
                                <td>
                                    <div className='infoLeft'>
                                        <img src=""/>
                                            <div>
                                                Cho xao
                                            </div>
                                    </div>
                                    <div className='infoRight'>
                                        <FontAwesomeIcon icon={faStar} style={{marginRight:'10px'}}/>
                                        <FontAwesomeIcon icon={faFileLines} style={{marginRight:'10px'}} />

                                    </div>

                                </td>
                            </tr> */}
                            {/* item */}
                        </tbody>
                    </table>
                    <table className='table2'>
                        <tbody>
                            <tr className='head'>
                                <td>Nhận xét món ăn</td>
                            </tr>
                            <tr className='rowItem'>
                                <td>
                                    <textarea type='text' style={{border: 'none', margin:'1px 5px', outline: 'none'}} name="" id="fbProduct" cols="47" rows="6" placeholder='Write feedback here...'></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='tableRight'>
                    <div className='content2'>
                        <div className='head2'><FontAwesomeIcon icon={faPen}/> Nhận xét cửa hàng</div>
                        <textarea type='text' style={{border:'none', margin:'1px 1px', outline: 'none'}} name="" id="fbStore" cols="37" rows="16" placeholder='Write feedback here...'></textarea>
                    </div>

                </div>
            </div>
            <button type='submit' className='submitFeedback' onClick={console.log("submit")}>Submit</button>
        </div>
        {statusRate&&<Rate product={IdProduct} key={1} onDialog={handleRating}/>}
        </div>
    );
}