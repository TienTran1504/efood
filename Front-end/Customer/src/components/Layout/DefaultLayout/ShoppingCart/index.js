import { React } from 'react';
import classes from './ShoppingCart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPhone,
    faUser,
    faLocationDot,
    faPencil,
    faCircle,
    faPlusCircle,
    faMinusCircle,
} from '@fortawesome/free-solid-svg-icons';

const ShoppingCart = (props) => {
    const ShopingCartItems = [];
    var sumQuantity = 0;
    var sumCost = 0;
    var quantity = 1;

    for (let i = 0; i < props.items.length; i++) {
        sumQuantity += quantity;
        sumCost += props.items[i]['cost'] * quantity;

        ShopingCartItems.push(
            <tr className={classes['cart-row']}>
                <td className={classes['cart-col']}>
                    <div className={classes['item-container']}>
                        <div className={classes['item']}>
                            {' '}
                            <img src={props.items[i]['icon']} alt="error" className={classes['item-icon']} />
                            <div className="item-info">
                                <div className={classes['item-name']}>{props.items[i]['name']}</div>
                                <div className={classes['item-cost']}>{props.items[i]['cost']}đ</div>
                            </div>
                        </div>
                        <div className={classes['item-quantity']}>
                            <button id={classes['btn--remove']}>
                                <FontAwesomeIcon icon={faMinusCircle} />
                            </button>
                            <div id={classes['current-quantity']}>{quantity}</div>
                            <button id={classes['btn--add']}>
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </button>
                        </div>
                    </div>
                </td>
            </tr>,
        );
    }

    return (
        <div className={classes['cart-container']}>
            <div className={classes['cart-container--item']}>
                <button
                    className={`${classes['cart-btn']} ${classes['cart-btn--active']}`}
                    id="online"
                    onClick={online}
                >
                    GIAO HÀNG TRỰC TUYẾN
                </button>
                <table className={classes['cart-table']}>
                    <tr className={`${classes['cart-row']} ${classes['cart-row--header']}`}>
                        <td className={classes['cart-col']}>THÔNG TIN GIAO HÀNG</td>
                    </tr>
                    <tr className={classes['cart-row']}>
                        <td className={classes['cart-col']}>
                            <FontAwesomeIcon icon={faUser} style={{ position: 'absolute', fontSize: '20px' }} />
                            <input
                                type="text"
                                name=""
                                size="50"
                                placeholder="Họ và tên người nhận"
                                style={{ textIndent: '30px' }}
                            />
                        </td>
                    </tr>
                    <tr className={classes['cart-row']}>
                        <td className={classes['cart-col']}>
                            <FontAwesomeIcon icon={faPhone} style={{ position: 'absolute', fontSize: '20px' }} />
                            <input
                                type="text"
                                name=""
                                size="50"
                                placeholder="Số điện thoại người nhận"
                                style={{ textIndent: '30px' }}
                            />
                        </td>
                    </tr>
                    <tr className={classes['cart-row']}>
                        <td className={classes['cart-col']}>
                            <FontAwesomeIcon icon={faLocationDot} style={{ position: 'absolute', fontSize: '20px' }} />
                            <input
                                type="text"
                                name=""
                                size="50"
                                placeholder="Địa chỉ người nhận"
                                style={{ textIndent: '30px' }}
                            />
                        </td>
                    </tr>
                    <tr className={classes['cart-row']}>
                        <td className={classes['cart-col']}>
                            <FontAwesomeIcon icon={faPencil} style={{ position: 'absolute', fontSize: '20px' }} />
                            <textarea
                                type="text"
                                className={classes['cart-textarea']}
                                name=""
                                placeholder="Ghi chú..."
                                style={{ textIndent: '30px' }}
                                rows="15"
                                cols="50"
                            />
                        </td>
                    </tr>
                    <tr className={`${classes['cart-row']} ${classes['cart-row--header']}`}>
                        <td className={classes['cart-col']}>PHƯƠNG THỨC THANH TOÁN</td>
                    </tr>
                    <tr>
                        <td className={classes['cart-col']}>
                            <FontAwesomeIcon
                                icon={faCircle}
                                style={{ position: 'absolute', color: '#E85D31', fontSize: '20px' }}
                            />
                            <div style={{ textIndent: '30px' }}>Thanh toán khi nhận hàng</div>
                        </td>
                    </tr>
                </table>
            </div>

            <div className={classes['cart-container--item']}>
                <button
                    className={`${classes['cart-btn']} ${classes['cart-btn--inactive']}`}
                    id="offline"
                    onClick={offline}
                >
                    NHẬN TRỰC TIẾP TẠI QUẦY
                </button>
                <table className={classes['cart-table']}>
                    <tr className={`${classes['cart-row']} ${classes['cart-row--header']}`}>
                        <td className={classes['cart-col']}>THÔNG TIN GIAO HÀNG</td>
                    </tr>
                </table>
                <div id={classes['table-wrapper']}>
                    <div id={classes['table-scroll']}>
                        <table id={classes['table']}>
                            <tbody>{ShopingCartItems}</tbody>
                        </table>
                    </div>
                </div>
                <table className={classes['cart-table']} style={{ marginTop: '0' }}>
                    <tr className={`${classes['cart-row']} ${classes['cart-row--header']}`}>
                        <td className={classes['cart-col']}>TỔNG ĐƠN HÀNG</td>
                    </tr>
                    <tr>
                        <td className={classes['cart-col']}>Số lượng: {sumQuantity}</td>
                    </tr>
                    <tr>
                        <td className={classes['cart-col']}>Phí vận chuyển: {props.deliveryCost}đ</td>
                    </tr>
                    <tr>
                        <td className={classes['cart-col']} style={{ textAlign: 'right' }}>
                            <hr style={{ marginBottom: '10px' }} />
                            <b>Tổng tiền: {sumCost + props.deliveryCost}đ</b>
                        </td>
                    </tr>
                </table>
                <button className={`${classes['cart-btn']} ${classes['cart-btn--active']}`}>ĐẶT HÀNG</button>
            </div>
        </div>
    );
};

export default ShoppingCart;

const online = () => {
    document.getElementById('online').style.backgroundColor = '#ff0000';
    document.getElementById('online').style.color = 'white';
    document.getElementById('offline').style.backgroundColor = 'white';
    document.getElementById('offline').style.color = '#ff0000';
    document.getElementById('offline').style.border = '2px solid #ff0000';
};

const offline = () => {
    document.getElementById('offline').style.backgroundColor = '#ff0000';
    document.getElementById('offline').style.color = 'white';
    document.getElementById('online').style.backgroundColor = 'white';
    document.getElementById('online').style.color = '#ff0000';
    document.getElementById('online').style.border = '2px solid #ff0000';
};
