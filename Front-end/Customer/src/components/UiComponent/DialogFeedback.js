
import React, { useState } from 'react'; // nạp thư viện react
import classes from "../UiComponent/FeedBack.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    // faFileLines,
    faPen,
    faX
} from '@fortawesome/free-solid-svg-icons';
import Rate from './Rate';
import axios from 'axios';

const token = JSON.stringify(localStorage.getItem('token')).split('"').join('');
const tokenAuth = 'Bearer ' + token;
const headers = {
    Authorization: tokenAuth,
};



export default function DialogFeedback({items, IsOpen, isFeedBack}) {
    
    const [statusRate, setStatusRate ] = useState(false);
    const [IdProduct, setIdProduct ] = useState(null);
    const [listRating, setRating] = useState([]);

    // console.log(items);

    const handleRating = (choose, id, valueRating) =>{
        if(choose){
            setStatusRate(false);
            var ArrayItem = listRating;
            var newItem = {
                idx: id,
                value: valueRating,
            }
            if(ArrayItem.length !== 0){
                ArrayItem.forEach((item, index) => {
                if(newItem.idx === item.idx){
                    item = newItem;//nếu mà id trùng vs id trước đó thì thay thế
                }
                else{
                    ArrayItem = [...ArrayItem, newItem];
                    
                    setRating(ArrayItem);
                }
                });
            }else{
                ArrayItem = [...ArrayItem, newItem];//danh sách chưa có item nào thì add bth
            }
            console.log(ArrayItem);
        }else{
            setStatusRate(false);
        }
    }

    const ratingFeedback = (itemId)=>{
        setIdProduct(itemId);
        setStatusRate(true);
    }

    const confirmSubmit = () => {
        const token = JSON.stringify(localStorage.getItem('token')).split('"').join('');
        const tokenAuth = 'Bearer ' + token;
        const headers = {
            Authorization: tokenAuth,
        };
        isFeedBack(true);
        if(token!== null){
            console.log("submit")
            // const fbProduct = document.getElementById('fbProduct').value;
            const fbStore = document.getElementById('fbStore').value;

            listRating.forEach((item, index) => {
                const obj = {
                    rating:item.value
                }
                axios
                    .patch(`http://localhost:3000/api/v1/foods/rating/${item.idx}`, obj , { headers: headers }).then((res) => {
                    console.log("token is " + res);
                }).catch(error => {
                    console.log(error);
                })
            });
    
            if(fbStore ==='') alert('Vui lòng để lại nhận xét cho cửa hàng!');
            else {
                IsOpen(false); 
                alert("submit complete"); 
            }
        }
        
        
        // window.location.reload(false);
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
        <div className={classes['containerFeedback']}>
            <div className={classes['headerFeedback']}>
                <div>ĐÁNH GIÁ ĐƠN HÀNG</div>
                <div><FontAwesomeIcon className={classes['icon']}icon={faX} style={{cursor:'pointer', marginRight: '20px',}} onClick={()=>IsOpen(false)}/></div>
            </div>
            <div className={classes['content'] }>
                <div className={classes['tableLeft']}>
                    <table className={classes['table1']}>

                        <tbody>
                            <tr className={classes['head']}>
                                <td>Đơn hàng</td>
                            </tr>
                            {/* item */}
                            {items.map((item)=> (
                                <tr className={classes['rowItem']} key={item.id}>
                                    <td>
                                        <div className={classes['infoLeft']}>
                                            <img src={item.image} alt="error" />
                                            <div>
                                                {item.name}
                                            </div>
                                        </div>
                                        <div className={classes['infoRight']}>
                                            <FontAwesomeIcon icon={faStar} className={classes['icon']} style={{marginRight:'10px', cursor:'pointer'}} onClick={()=>ratingFeedback(item.foodId)}/>
                                            {/* <FontAwesomeIcon icon={faFileLines} style={{marginRight:'10px', cursor:'pointer'}} /> */}
                                        </div>
                                    </td>
                                    {/* {console.log(item)} */}
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <div className={classes['tableRight']}>
                    <div className={classes['content2']}>
                        <div className={classes['head2']}><FontAwesomeIcon icon={faPen}/> Nhận xét cửa hàng</div>
                        <textarea type='text' style={{border:'none', margin:'1px 1px', outline: 'none'}} name="" id="fbStore" cols="37" rows="16" placeholder='Write feedback here...'></textarea>
                    </div>

                </div>
            </div>
            <button type='submit' className={classes['submitFeedback']} onClick={confirmSubmit}>Submit</button>
        </div>
        {statusRate&&<Rate product={IdProduct} key={1} onDialog={handleRating}/>}
        </div>
    );
}