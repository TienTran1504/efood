import classes from './PaymentHistory.module.scss';
import Sidebar from '~/components/Layout/DefaultLayout/Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faSpinner, faTimes, faTruck, faCoins, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DialogFeedback from '~/components/UiComponent/DialogFeedback';//feedback Dialog
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function PaymentHistory() {
    const [bills, setBills] = useState([]);
    const [ordered, setOrdered] = useState(0);
    const [delivered, setDelivered] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [canceled, setCancled] = useState(0);
    const [bonusPoint, setBonusPoint] = useState(0);
    const [IsOpen, setIsOpen] = useState(false);
    const [ListProduct, setListProduct] = useState(null);
    const tokenAuth = 'Bearer ' + JSON.stringify(localStorage.getItem('token')).split('"').join('');
    const headers = {
        Authorization: tokenAuth,
    };

    useEffect(() => {
        async function getData(){ 
            const data = await axios.get(`http://localhost:3000/api/v1/bills/user`, { headers: headers });
            setBills(data.data.bills);
            data.data.bills.map((item, index) => {
                if (item.status === 'Ordered') {
                    setOrdered(ordered => ordered + 1);
                }
                else if (item.status === 'Delivered') {
                    setDelivered(delivered => delivered + 1);
                }
                else if (item.status === 'Canceled') {
                    setCancled(canceled => canceled + 1);
                }
                else if (item.status === 'Shipping') {
                    setShipping(shipping => shipping + 1);
                }
            });
        }
           
        getData();
    }, []);


    useEffect(() => {
        console.log("haha");
        axios
            .get(`http://localhost:3000/api/v1/customer`, { headers: headers })
            .then((res) => {
                setBonusPoint(res.data.bonus);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onDialog = (choose) => {
        if (choose) {
            setIsOpen(false);
        } else {
            setIsOpen(false);
        }
    }

    const handleFeedBack = (listProduct) => {
        setListProduct(listProduct);
        setIsOpen(true);
    }

    return (
        <div>
            <div className={classes['main']}>
                <Sidebar />
                <div className={classes['contain__main']}>
                    <h2 className={classes['content__title']}>LỊCH SỬ ĐƠN HÀNG</h2>
                    <div className={classes['content__typefood']}>
                        <div className={classes['typefood__item']}>
                            <div className={classes['typefood__item-part1']}>
                                <span className={classes['item__status']}>ORDERED</span>
                                <span className={classes['item__quantity']}>{ordered}</span>
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
                                    bills.length == 0 ? 
                                        <Backdrop style={{zIndex: 3}} className={classes.backdrop} open>
                                            <CircularProgress color="inherit" /> 
                                        </Backdrop>
                                    : 
                                    bills.map((item, idx) => (
                                        <tr key={idx}
                                            className={classes['Item']} style={{ marginBottom: '4px' }}>
                                            <td className={classes['STTitem']}>{idx + 1}</td>
                                            <td className={classes['methodItem']}>{item.method}</td>
                                            <td className={classes['createDay']}>{item.createdAt.split('T')[0]}</td>
                                            <td className={classes['totalItem']} style={{ fontWeight: 'bold' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.total)}</td>
                                            <td className={classes['statusproduct']}>
                                                {(item.status === 'Ordered' && <button disabled style={{ fontWeight: 'bold', boxSizing: 'border-box', backgroundColor: '#6672e4', padding: '0 32px', borderRadius: '6px', color: '#000' }}>Ordered</button>) ||
                                                    (item.status === 'Delivered' && <button disabled style={{ fontWeight: 'bold', boxSizing: 'border-box', backgroundColor: '#38eca0', padding: '0 26px', borderRadius: '6px', color: '#000' }}>Delivered</button>) ||
                                                    (item.status === 'Shipping' && <button disabled style={{ fontWeight: 'bold', backgroundColor: '#4b93fe', padding: '0 29px', borderRadius: '6px', color: '#000' }}>Shipping</button>) ||
                                                    (item.status === 'Canceled' && <button disabled style={{ fontWeight: 'bold', backgroundColor: '#da4848', padding: '0 28px', borderRadius: '6px', color: '#000' }}>Canceled</button>)}
                                            </td>
                                            <td className={classes['feedback']}>
                                                {item.status === 'Delivered' && <button className={classes['feedbackbtn']} onClick={() => handleFeedBack(item.orderList)} style={{ borderRadius: '6px' }}>Rating</button>}
                                                {item.status !== 'Delivered' && <button disabled className={classes['feedbackbtn']} style={{ borderRadius: '6px' }}>Rating</button>}
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
                            <span id={classes['btn-submit-money']}>{bonusPoint}</span>
                        </div>
                        <div id={classes['btn-submit-icon']}>
                            <FontAwesomeIcon icon={faCoins} />
                        </div>
                    </div>
                </div>
            </div>
            {IsOpen && <DialogFeedback items={ListProduct} IsOpen={onDialog} />}


        </div>
    )
}

export default PaymentHistory;