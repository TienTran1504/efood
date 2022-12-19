import classes from './PaymentHistory.module.scss';
import Sidebar from '~/components/Layout/DefaultLayout/Sidebar';
import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { faSpinner, faTimes, faTruck, faCoins, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function PaymentHistory(){
    const [bills, setBills]  = useState([]);
    const [ordered, setOrdered] = useState(0);
    const [delivered, setDelivered] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [canceled, setCancled] = useState(0);

    useEffect(() => {
        const tokenAuth = 'Bearer ' + JSON.stringify(localStorage.getItem('token')).split('"').join('');
        const headers = {
            Authorization: tokenAuth,
        };
        axios
            .get(`http://localhost:3000/api/v1/bills/user`, { headers: headers })
            .then((res) => {
                console.log(res.data.bills);
                res.data.bills.map((item, index) =>{
                    if(item.status == 'Ordered')
                    {
                        setOrdered(ordered => ordered + 1);
                    }
                    else if(item.status == 'Delivered'){
                        setDelivered(delivered => delivered + 1);
                    }
                    else if(item.status == 'Canceled'){
                        setCancled(canceled => canceled + 1);
                    }
                    else if(item.status == 'Shipping'){
                        setShipping(shipping => shipping + 1);
                    }
                });
                setBills(res.data.bills);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    
    return (
        <div>
            <div className={classes['responsive']}>
                <div className={classes['.container-text']}>HIỆN TẠI WEB CHƯA CÓ CHỨC NĂNG RESPONSIVE</div>   
            </div>
            <div className={classes['main']}>
                <Sidebar/>
                <div className={classes['contain__main']}>
                    <h2 className={classes['content__title']}>LỊCH SỬ ĐƠN HÀNG</h2>
                    <div className={classes['content__typefood']}>
                        <div className={classes['typefood__item']}>
                            <div className={classes['typefood__item-part1']}>
                                <span className={classes['item__status']}>ORDERED</span>
                                <span className={classes['item__quantity']}>{ordered/2}</span>
                            </div>
                            <div className={classes['typefood__item-part2']}>
                                <FontAwesomeIcon icon={faSpinner} />
                            </div>
                        </div>
                        <div className={classes['typefood__item']}>
                            <div className={classes['typefood__item-part1']}>
                                <span className={classes['item__status']}>DELIVERED</span>
                                <span className={classes['item__quantity']}>{delivered}</span>
                            </div>
                            <div className={classes['typefood__item-part2']}>
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </div>
                        </div>
                        <div className={classes['typefood__item']}>
                            <div className={classes['typefood__item-part1']}>
                                <span className={classes['item__status']}>SHIPPING</span>
                                <span className={classes['item__quantity']}>{shipping}</span>
                            </div>
                            <div className={classes['typefood__item-part2']}>
                                <FontAwesomeIcon icon={faTruck} />
                            </div>
                        </div>
                        <div className={classes['typefood__item']}>
                            <div className={classes['typefood__item-part1']}>
                                <span className={classes['item__status']}>CANCELED</span>
                                <span className={classes['item__quantity']}>{canceled}</span>
                            </div>
                            <div className={classes['typefood__item-part2']}>
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                        </div>
                    </div>
                    <div className={classes['content']}>   
                        <table className={classes['content__table']}>
                            <tbody>
                            <tr className={classes['content__table-title']}>
                                <th colSpan="5">Orders List</th>
                            </tr>
                            <tr className={classes['content__table-list-heading']}>
                                <th className={classes['STT']}>STT</th>
                                <th className={classes['method']}>Phương thức thanh toán</th>
                                <th className={classes['createAt']}>Ngày tạo</th>
                                <th className={classes['total']}>Tổng Tiền</th>
                                <th className={classes['statusproduct']}>Trạng thái</th>
                                <th className={classes['feedback']}>Đánh giá</th>
                            </tr>
                            {
                                bills.map((item, idx) => (
                            <tr key={idx}
                                className={classes['Item']}>
                                <td className={classes['STTitem']}>{idx + 1}</td>  
                                <td className={classes['methodItem']}>{item.method}</td>
                                <td className={classes['createDay']}>{item.createdAt.split('T')[0]}</td>
                                <td className={classes['totalItem']}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.total)}</td>
                                <td className={classes['statusproduct']}>{(item.status == 'Ordered' && 'Đã đặt') || (item.status == 'Delivered' && 'Đã giao') || (item.status == 'Shipping' && 'Đang giao') || (item.status == 'Canceled' && 'Đã hủy')}</td>
                                <td className={classes['feedback']}>
                                {item.status == 'Ordered' && <button className={classes['feedbackbtn']}>Rate</button>}
                                {item.status !== 'Ordered' && <button disabled className={classes['feedbackbtn']}>Rate</button>} 
                                </td>
                            </tr>
                            )
                            )
                            }
                            </tbody>
                        </table>
                    </div>

                    <div className={classes['box-btn']}>
                        <div className={classes['bonus-point']}>
                            <span id={classes['btn-submit-title']}>BONUS POINT</span>
                            <span id={classes['btn-submit-money']}>1200</span>
                        </div>
                        <div id={classes['btn-submit-icon']}>
                            <FontAwesomeIcon icon={faCoins} />
                        </div>
                    </div>
                </div>
            </div>
            
            
            
        </div>
    )
}

export default PaymentHistory;