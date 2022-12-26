import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect, memo } from 'react';
import classes from './RowStyle.module.scss';
function ReadOnlyRow({ id, order, handleEditClick, handleDeleteClick }) {
    const statusRef = useRef();

    useEffect(() => {
        if (statusRef.current.classList.length > 1) {
            statusRef.current.classList.remove(classes.purple);
            statusRef.current.classList.remove(classes.blue);
            statusRef.current.classList.remove(classes.green);
            statusRef.current.classList.remove(classes.red);
        }

        if (order.status === 'Ordered') {
            statusRef.current.classList.add(classes.purple);
        } else if (order.status === 'Delivered') {
            statusRef.current.classList.add(classes.green);
        } else if (order.status === 'Shipping') {
            statusRef.current.classList.add(classes.blue);
        } else if (order.status === 'Canceled') {
            statusRef.current.classList.add(classes.red);
        }
    }, [order.status]);

    return (
        <tr>
            <td>{id + 1}</td>
            <td>{order.email}</td>
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
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    );
}

export default memo(ReadOnlyRow);
