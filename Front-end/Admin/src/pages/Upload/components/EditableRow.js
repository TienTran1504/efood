import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './RowStyle.module.scss';

function EditableRow({ index, editFormData, handleEditFormChange, handleCancelClick }) {
    return (
        <tr>
            <td>
                <input
                    type="text"
                    name="id"
                    value={index}
                    readOnly
                    className={`${classes['input-edit-id']} ${classes['input-edit-text']}`}
                ></input>
            </td>
            <td>
                <input
                    type="file"
                    name="image"
                    id="file"
                    onChange={handleEditFormChange}
                    accept="image/jpeg, imge/png, image/jpg"
                    className={`${classes['input-edit-img']} ${classes['input-edit-text']}`}
                />
                <label htmlFor="file">Chọn ảnh</label>
            </td>
            <td>
                <input
                    type="text"
                    required
                    placeholder="Enter a name..."
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    className={`${classes['input-edit-name']} ${classes['input-edit-text']}`}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter type of food"
                    name="typeOf"
                    value={editFormData.typeOf}
                    onChange={handleEditFormChange}
                    className={`${classes['input-edit-food']} ${classes['input-edit-text']}`}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter price of food"
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditFormChange}
                    className={`${classes['input-edit-price']} ${classes['input-edit-text']}`}
                ></input>
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
