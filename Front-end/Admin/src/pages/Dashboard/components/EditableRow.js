import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useState } from 'react';
import classes from './RowStyle.module.scss';

function EditableRow({ id, order, handleEditStatus, handleCancelClick }) {
    const [prevLi, setPrevLi] = useState();
    const status = [
        { name: 'process', bgColor: 'blue' },
        { name: 'delivered', bgColor: 'green' },
        { name: 'cancel', bgColor: 'red' },
    ];

    function handleState(e) {
        if (prevLi) {
            prevLi.target.classList.remove(classes['btn-status-choice']);
        }
        e.target.classList.add(classes['btn-status-choice']);
        setPrevLi(e);
    }

    function handleSubmit() {
        handleEditStatus(prevLi, order.orderId);
    }
    return (
        <tr>
            <td>{id + 1}</td>
            <td>{order.orderId}</td>
            <td>{order.payMethod}</td>
            <td>{order.date}</td>
            <td>
                <ul>
                    {status.map((state, index) => (
                        <li
                            key={index}
                            className={`${classes['status-style']}
                                    ${classes[state.bgColor]} 
                                    ${classes['btn-status']}`}
                            onClick={handleState}
                        >
                            {state.name}
                        </li>
                    ))}
                </ul>
            </td>
            <td>{order.total}</td>
            <td>
                <button className={`${classes['btn']} ${classes['icon-left']}`} type="submit" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                </button>
                <button
                    className={`${classes['btn']} ${classes['icon-left']}`}
                    type="button"
                    onClick={handleCancelClick}
                >
                    <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red' }} />
                </button>
            </td>
        </tr>
    );
}

export default memo(EditableRow);
