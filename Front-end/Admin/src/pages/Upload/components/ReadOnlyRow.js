import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import classes from './RowStyle.module.scss';
function ReadOnlyRow({ id, food, handleEditClick, handleDeleteClick }) {
    return (
        <tr>
            <td>{id}</td>
            <td>
                <img src={food.image} alt="img" />
            </td>
            <td>{food.fullName}</td>
            <td>{food.type}</td>
            <td>{food.price}</td>
            <td>
                <button
                    className={`${classes['btn']} ${classes['icon-left']}`}
                    type="button"
                    onClick={(event) => handleEditClick(event, food)}
                >
                    <FontAwesomeIcon icon={faPencil} />
                </button>
                <button
                    className={`${classes['btn']} ${classes['icon-right']}`}
                    type="button"
                    onClick={() => handleDeleteClick(food.id)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    );
}

export default ReadOnlyRow;
