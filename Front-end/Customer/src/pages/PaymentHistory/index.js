import classes from './PaymentHistory.module.scss';
import Sidebar from '~/components/Layout/DefaultLayout/Sidebar';

const obj = [
    {
        STT: '1',
        method: 'Thanh toán khi nhận hàng',
        nameList: [
            {
            nameItem: 'Chó xào',
            },
            {
            nameItem: 'Vịt xào',
            },
            {
            nameItem: 'Mèo xào',
            },
            {
            nameItem: 'Bún riêu',
            }
        ],
        quantity: '4',
        total: '100.000đ'
    },
    {
        STT: '2',
        method: 'Thanh toán tại quầy',
        nameList: [
            {
            nameItem: 'Heo quay',
            },
            {
            nameItem: 'Cơm sườn',
            },
        ],
        quantity: '2',
        total: '150.000đ'
    },
]

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
                        {
                            obj.map((item, idx) => (
                        <tr key={idx}
                            className={classes['Item']}>
                            <td className={classes['STTitem']}>{item.STT}</td>  
                            <td className={classes['methodItem']}>{item.method}</td>
                            <td className={classes['nameItem']}>
                                {item.nameList.map((itemfood, idxfood) => (
                                    <span className={classes['foodItem']} key={idxfood}>{itemfood.nameItem}</span>
                                ))}
                            </td>
                            <td className={classes['amountItem']}>{item.quantity}</td>
                            <td className={classes['totalItem']}>{item.total}</td>
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