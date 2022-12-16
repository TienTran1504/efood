import { faPencil, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect, memo } from 'react';
import classes from './RowStyle.module.scss';
function ReadOnlyRow({ id, order, handleEditClick, handleDeleteClick }) {
    const statusRef = useRef();

    useEffect(() => {
        if (order.status === 'Delivered') {
            statusRef.current.classList.add(classes.blue);
        } else if (order.status === 'Shipping') {
            statusRef.current.classList.add(classes.green);
        } else if (order.status === 'Cancel') {
            statusRef.current.classList.add(classes.red);
        }
    }, [order.status]);

    return (
        <tr>
            <td>{id + 1}</td>
            <td>{order.orderId}</td>
            <td>{order.payMethod}</td>
            <td>{order.date.split('T')[0]}</td>
            <td>
                <div className={classes['status-style']} ref={statusRef}>
                    <p>{order.status}</p>
                </div>
            </td>
            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
            <td>
                <button
                    className={`${classes['btn']} ${classes['icon-left']}`}
                    type="button"
                    onClick={(event) => handleEditClick(event, order)}
                >
                    <FontAwesomeIcon icon={faPencil} />
                </button>
                <span>{order.action}</span>
                <button
                    className={`${classes['btn']} ${classes['icon-right']}`}
                    type="button"
                    onClick={() => handleDeleteClick(order.orderId)}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </td>
        </tr>
    );
}

export default memo(ReadOnlyRow);
