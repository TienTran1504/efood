import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "../Dashboard.module.scss"

function EditableRow({ editFoodId, editFormData, handleEditFormChange, handleCancelClick }) {
    console.log(editFormData.id);
    return (
        <tr>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter id"
                    name="id"
                    defaultValue={editFoodId}
                    className={classes['input-edit']}
                >
                </input>

            </td>
            <td>
                <input
                    type="file"
                    required="required"
                    placeholder="Choose foodimgage "
                    name="image"
                    onChange={handleEditFormChange}
                    accept="image/jpeg, imge/png, image/jpg"
                    className={classes['input-edit']}
                >
                </input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter a name..."
                    name="fullName"
                    value={editFormData.fullName}
                    onChange={handleEditFormChange}
                    className={classes['input-edit']}
                ></input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Enter type of food"
                    name="type"
                    value={editFormData.type}
                    onChange={handleEditFormChange}
                    className={classes['input-edit']}
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
                    className={classes['input-edit']}
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