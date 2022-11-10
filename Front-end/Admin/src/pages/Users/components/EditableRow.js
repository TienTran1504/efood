import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "../Upload.module.scss"

function EditableRow({ editUserId, editFormData, handleEditFormChange, handleCancelClick }) {

    return (
        <tr>
            <td>
                <input
                    type="text"
                    required="required"
                    name="id"
                    defaultValue={editUserId}
                    className={classes['input-edit']}
                    disabled
                >
                </input>

            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    name="fullName"
                    defaultValue={editFormData.fullName}
                    className={classes['input-edit']}
                    disabled
                >
                </input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    name="email"
                    defaultValue={editFormData.email}
                    className={classes['input-edit']}
                    disabled
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    name="gender"
                    defaultValue={editFormData.gender}
                    className={classes['input-edit']}
                    disabled
                ></input>
            </td>
            <td>
                <input
                    type="radio"
                    required="required"
                    placeholder="Enter role"
                    name="role"
                    value={editFormData.role}
                    onChange={handleEditFormChange}
                    className={classes['input-edit']}
                    id="admin"
                >
                </input>
                <label for="admin">Admin</label>
                <input
                    type="radio"
                    required="required"
                    placeholder="Enter role"
                    name="role"
                    value={editFormData.role}
                    onChange={handleEditFormChange}
                    className={classes['input-edit']}
                    id="customer"
                >
                </input>
                <label for="customer">Customer</label>
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