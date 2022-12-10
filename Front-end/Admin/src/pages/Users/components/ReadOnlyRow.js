import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import classes from '../Users.module.scss';
function ReadOnlyRow({ index, user, handleEditClick, handleDeleteClick }) {
    return (
        <tr>
            <td>{index}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.gender}</td>
            <td>{user.typeOf}</td>
            <td>
                <button className={classes['btn']} type="button" onClick={(event) => handleEditClick(event, user)}>
                    <FontAwesomeIcon icon={faPencil} />
                </button>
                <button className={classes['btn']} type="button" onClick={() => handleDeleteClick(user.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    );
}

export default ReadOnlyRow;
