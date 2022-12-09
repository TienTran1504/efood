import classes from './PaymentHistory.module.scss';
import Sidebar from '~/components/Layout/DefaultLayout/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentHistory(){
    const [bills, setBills]  = useState([]);

    useEffect(() => {
        const headers = {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzkwYjU2MDU3MTczMWE0NGEyMzE3MTIiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NzA1NzUyMDgsImV4cCI6MTY3MzE2NzIwOH0.bGor_YwVVKp2_jc8e0tLUCFLAXjQ6jyafCT4S8ywQPo',
        };
        axios
            .get(`http://localhost:3000/api/v1/bills/user`, { headers: headers })
            .then((res) => {
                console.log(res.data.bills.total);
                setBills(res.data.bills);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={classes['main']}>
            <Sidebar/>
            <div className={classes['contain__main']}>
                <h2 className={classes['content__title']}>LỊCH SỬ ĐƠN HÀNG</h2>
                <div className={classes['content']}>   
                    <table className={classes['content__table']}>
                        <tbody>
                        <tr className={classes['content__table-title']}>
                            <th colSpan="5">Orders List</th>
                        </tr>
                        <tr className={classes['content__table-list-heading']}>
                            <th className={classes['STT']}>STT</th>
                            <th className={classes['method']}>Phương thức thanh toán</th>
                            <th className={classes['nameproduct']}>Tên sản phẩm</th>
                            <th className={classes['amount']}>Số lượng</th>
                            <th className={classes['total']}>Tổng Tiền</th>
                        </tr>
                        {
                            bills.map((item, idx) => (
                        <tr key={idx}
                            className={classes['Item']}>
                            <td className={classes['STTitem']}>{idx + 1}</td>  
                            <td className={classes['methodItem']}>{item.method==="cod"?"Thanh toán khi nhận hàng":"Thanh toán tại quầy"}</td>
                            <td className={classes['nameItem']}>
                                {item.orderList.map((itemfood, idxfood) => (
                                    <span className={classes['foodItem']} key={idxfood}>{itemfood.name}</span>
                                ))}
                            </td>
                            <td className={classes['amountItem']}>{item.orderList.length}</td>
                            <td className={classes['totalItem']}>{item.total}đ</td>
                        </tr>
                        )
                        )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory;