import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "../Dashboard.module.scss"
function ReadOnlyRow({ food, handleEditClick, handleDeleteClick }) {
    return (
        <tr>
            <td>{food.id}</td>
            <td>
                <img src={food.image} alt="img" />
            </td>
            <td>{food.fullName}</td>
            <td>{food.type}</td>
            <td>{food.price}</td>
            <td>
                <button
                    className={classes['btn']}
                    type="button"
                    onClick={(event) => handleEditClick(event, food)}
                >
                    <FontAwesomeIcon icon={faPencil} />
                </button>
                <button className={classes['btn']} type="button" onClick={() => handleDeleteClick(food.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    );
};

export default ReadOnlyRow;