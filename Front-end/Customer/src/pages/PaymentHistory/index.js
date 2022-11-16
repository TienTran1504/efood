import classes from './PaymentHistory.module.scss';
import Sidebar from '~/components/Layout/DefaultLayout/Sidebar';

function PaymentHistory(){
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
                        <tr className={classes['Item']}>
                            <td className={classes['STTitem']}>1</td>  
                            <td className={classes['methodItem']}>Thanh toán khi nhận hàng</td>
                            <td className={classes['nameItem']}>
                                <span>Chó xào</span>
                                <span>Chó xào</span>
                                <span>Chó xào</span>
                                <span>Chó xào</span>
                            </td>
                            <td className={classes['amountItem']}>1</td>
                            <td className={classes['totalItem']}>100.000đ</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory;