import { faComments, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Swal from 'sweetalert2';
import classes from '../Contacts.module.scss';
function ReadOnlyRow({ index, user, handleDeleteClick }) {
    const showFeedback = () => {
        Swal.fire({
            html: `<div class=${classes.container__contact}>
            <div class=${classes.title__feedback}>
                <h3>Name: ${user.title}</h3>
            </div>
            <div class=${classes.content__feedback}>
                ${user.content}
            </div>
        </div>`,
            customClass: classes['swal2-confirm '],
            confirmButtonColor: '#FD7C4B',
            confirmButtonText: 'Cancel',
            padding: '2rem',
        });
    };
    return (
        <tr>
            <td>{index}</td>
            <td>{user.email}</td>
            <td>{user.createdAt.split('T')[0]}</td>
            <td>
                <button className={classes['btn']} type="button" onClick={showFeedback}>
                    <FontAwesomeIcon icon={faComments} />
                </button>
                <button className={classes['btn']} type="button" onClick={() => handleDeleteClick(user.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    );
}

export default ReadOnlyRow;
