import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import classes from '../Users.module.scss';

function EditableRow({ index, editFormData, handleEditFormChange, handleCancelClick }) {
    const [role, setRole] = useState(editFormData.typeOf);
    const handleRadio = (e) => {
        setRole(e.target.value);
        handleEditFormChange(e);
    };

    return (
        <tr>
            <td>
                <input type="text" name="id" defaultValue={index} className={classes['input-edit-id']} disabled></input>
            </td>
            <td>
                <input
                    type="text"
                    name="name"
                    defaultValue={editFormData.name}
                    className={classes['input-edit-name']}
                    disabled
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="email"
                    defaultValue={editFormData.email}
                    className={classes['input-edit-email']}
                    disabled
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    name="gender"
                    defaultValue={editFormData.gender}
                    className={classes['input-edit-gender']}
                    disabled
                ></input>
            </td>
            <td>
                <input
                    type="radio"
                    required
                    placeholder="Enter role"
                    name="typeOf"
                    value="Admin"
                    onChange={handleRadio}
                    className={classes['input-edit-role']}
                    checked={role === 'Admin' ? true : false}
                    id="admin"
                ></input>
                <label htmlFor="admin">Admin</label>
                <input
                    type="radio"
                    required
                    checked={role === 'Customer' ? true : false}
                    placeholder="Enter role"
                    name="typeOf"
                    value="Customer"
                    onChange={handleRadio}
                    className={classes['input-edit-role']}
                    id="customer"
                ></input>
                <label htmlFor="customer">Customer</label>
            </td>
            <td>
                <button className={classes['btn']} type="submit">
                    <FontAwesomeIcon icon={faFloppyDisk} />
                </button>
                <button className={classes['btn']} type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </td>
        </tr>
    );
}

export default EditableRow;
