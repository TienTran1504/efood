import { React, useState } from 'react';
import classes from './ShoppingCart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import emptyCartImg from './empty-cart.jpg';
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
    const { cartItems, onAdd, onRemove } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0);
    const totalQuantity = cartItems.reduce((a, c) => a + c.quantity, 0);
    const shippingPrice = totalQuantity > 0 ? 10000 + 5000 * totalQuantity : 0;
    const totalPrice = itemsPrice + shippingPrice;
    const [paymentMethod, setpaymentMethod] = useState('Thanh toán khi nhận hàng');

    const online = () => {
        document.getElementById('online').style.backgroundColor = '#ff0000';
        document.getElementById('online').style.color = 'white';
        document.getElementById('offline').style.backgroundColor = 'white';
        document.getElementById('offline').style.color = '#ff0000';
        document.getElementById('offline').style.border = '2px solid #ff0000';
        setpaymentMethod('Thanh toán khi nhận hàng');
    };

    const offline = () => {
        document.getElementById('offline').style.backgroundColor = '#ff0000';
        document.getElementById('offline').style.color = 'white';
        document.getElementById('online').style.backgroundColor = 'white';
        document.getElementById('online').style.color = '#ff0000';
        document.getElementById('online').style.border = '2px solid #ff0000';
        setpaymentMethod('Thanh toán tại quầy');
    };

    function numberWithDot(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    return (
        <div className={classes['cart-container']}>
            <div className={classes['cart-container--item']}>
                <button
                    className={`${classes['cart-btn']} ${classes['cart-btn--active']} ${classes['cart-btn__marginTop']} ${classes['cart-btn--enabled']}`}
                    id="online"
                    onClick={online}
                >
                    GIAO HÀNG TRỰC TUYẾN
                </button>
                <table className={classes['cart-table']}>
                    <tbody>
                        <tr className={`${classes['cart-row']} ${classes['cart-row--header']}`}>
                            <td className={classes['cart-col']}>THÔNG TIN GIAO HÀNG</td>
                        </tr>
                        <tr className={classes['cart-row']}>
                            <td className={classes['cart-col']}>
                                <FontAwesomeIcon icon={faUser} className={classes['icon']} />
                                <input
                                    type="text"
                                    name=""
                                    size="50"
                                    placeholder="Họ và tên người nhận"
                                    className={classes['cart-input']}
                                />
                            </td>
                        </tr>
                        <tr className={classes['cart-row']}>
                            <td className={classes['cart-col']}>
                                <FontAwesomeIcon icon={faPhone} className={classes['icon']} />
                                <input
                                    type="text"
                                    name=""
                                    size="50"
                                    placeholder="Số điện thoại người nhận"
                                    className={classes['cart-input']}
                                />
                            </td>
                        </tr>
                        <tr className={classes['cart-row']}>
                            <td className={classes['cart-col']}>
                                <FontAwesomeIcon icon={faLocationDot} className={classes['icon']} />
                                <input
                                    type="text"
                                    name=""
                                    size="50"
                                    placeholder="Địa chỉ người nhận"
                                    className={classes['cart-input']}
                                />
                            </td>
                        </tr>
                        <tr className={classes['cart-row']}>
                            <td className={classes['cart-col']}>
                                <FontAwesomeIcon icon={faPencil} className={classes['icon']} />
                                <textarea
                                    type="text"
                                    className={classes['cart-textarea']}
                                    name=""
                                    placeholder="Ghi chú..."
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
                                    className={classes['icon']}
                                    style={{ color: '#E85D31' }}
                                />
                                <div className={classes['cart-input']}>{paymentMethod}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className={classes['cart-container--item']}>
                <button
                    className={`${classes['cart-btn']} ${classes['cart-btn--inactive']} ${classes['cart-btn__marginTop']} ${classes['cart-btn--enabled']}`}
                    id="offline"
                    onClick={offline}
                >
                    NHẬN TRỰC TIẾP TẠI QUẦY
                </button>
                <table className={classes['cart-table']}>
                    <tbody>
                        <tr className={`${classes['cart-row']} ${classes['cart-row--header']}`}>
                            <td className={classes['cart-col']}>THÔNG TIN GIAO HÀNG</td>
                        </tr>
                    </tbody>
                </table>

                <div id={classes['table-wrapper']}>
                    <div id={classes['table-scroll']}>
                        <table id={classes['table']}>
                            <tbody>
                                {cartItems.length === 0 && (
                                    <tr>
                                        <td className={classes['empty-cart']}>
                                            <img
                                                src={emptyCartImg}
                                                alt="error"
                                                className={classes['empty-cart-image']}
                                            />
                                        </td>
                                    </tr>
                                )}
                                {cartItems.map((item) => (
                                    <tr className={classes['cart-row']} key={item.id}>
                                        <td className={classes['cart-col']}>
                                            <div className={classes['item-container']}>
                                                <div className={classes['item']}>
                                                    {' '}
                                                    <img
                                                        src={item.image}
                                                        alt="error"
                                                        className={classes['item-image']}
                                                    />
                                                    <div className="item-info">
                                                        <div className={classes['item-name']}>{item.name}</div>
                                                        <div className={classes['item-price']}>
                                                            {numberWithDot(item.price)}đ
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes['item-quantity']}>
                                                    <button id={classes['btn--remove']} onClick={() => onRemove(item)}>
                                                        <FontAwesomeIcon icon={faMinusCircle} />
                                                    </button>
                                                    <div id={classes['current-quantity']}>
                                                        {numberWithDot(item.quantity)}
                                                    </div>
                                                    <button id={classes['btn--add']} onClick={() => onAdd(item)}>
                                                        <FontAwesomeIcon icon={faPlusCircle} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <table className={classes['cart-table']} style={{ marginTop: '0' }}>
                    <tbody>
                        <tr className={`${classes['cart-row']} ${classes['cart-row--header']}`}>
                            <td className={classes['cart-col']}>TỔNG ĐƠN HÀNG</td>
                        </tr>
                        <tr>
                            <td className={classes['cart-col']}>Số lượng: {numberWithDot(totalQuantity)}</td>
                        </tr>
                        <tr>
                            <td className={classes['cart-col']}>Phí vận chuyển: {numberWithDot(shippingPrice)}đ</td>
                        </tr>
                        <tr>
                            <td className={classes['cart-col']} style={{ textAlign: 'right' }}>
                                <hr style={{ marginBottom: '10px' }} />
                                <b>Tổng tiền: {numberWithDot(totalPrice)}đ</b>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    className={`${classes['cart-btn']} ${classes['cart-btn--active']} ${
                        cartItems.length !== 0 ? classes['cart-btn--enabled'] : classes['cart-btn--disabled']
                    }
                    }`}
                    style={{ marginBottom: '30px' }}
                >
                    ĐẶT HÀNG
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;
