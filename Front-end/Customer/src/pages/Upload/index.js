import classes from './Upload.module.scss'
import images from '~/assets/images'
import { faBowlFood, faBowlRice, faBurger, faIceCream, faMugHot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, Fragment } from "react";
import data from './mock-data.json'
import { nanoid } from "nanoid";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import Button from '~/components/Layout/DefaultLayout/Header/Button';
const TYPE_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faBowlRice} />,
        type_food: 'Cơm'
    },

]
function Upload() {
    const [foods, setFoods] = useState(data);
    const [addFormData, setAddFormData] = useState({
        id: "",
        fullName: "",
        type: "",
        price: "",
        image: "",
    });

    const [editFormData, setEditFormData] = useState({
        id: "",
        fullName: "",
        type: "",
        price: "",
        image: "",
    });
    const [editFoodId, setEditFoodId] = useState(null);

    const handleAddFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (e) => {
        e.preventDefault();
        const newFood = {
            id: foods.length + 1,
            fullName: addFormData.fullName,
            type: addFormData.type,
            price: addFormData.price,
            image: addFormData.image,
        };

        const newFoods = [...foods, newFood];
        setFoods(newFoods);
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        const editedContact = {
            id: editFoodId,
            fullName: editFormData.fullName,
            type: editFormData.type,
            price: editFormData.price,
            image: editFormData.image,
        };

        const newFoods = [...foods];

        const index = foods.findIndex((food) => food.id === editFoodId);

        newFoods[index] = editedContact;

        setFoods(newFoods);
        setEditFoodId(null);
    };

    const handleEditClick = (e, food) => {
        e.preventDefault();
        setEditFoodId(food.id);

        const formValues = {
            fullName: food.fullName,
            type: food.type,
            price: food.price,
            image: food.image,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditFoodId(null);
    };

    const handleDeleteClick = (foodId) => {
        const newFoods = [...foods];

        const index = foods.findIndex((food) => food.id === foodId);

        newFoods.splice(index, 1);

        setFoods(newFoods);
    };
    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>
                <p className={classes['title-name']}>PRODUCT MANAGEMENT</p>
                <img src={images.logoImage} alt="logo" className={classes['title-logo']} />
            </div>

            <div className={classes.filter}>
                {/* Sau này convert ra thành 1 component riêng */}
                <button className={`${classes['type-food']} ${classes.blue}`}>
                    <p className={classes['type-name']}>MÓN NƯỚC</p>
                    <FontAwesomeIcon className={classes['type-icon']} icon={faBowlFood} />
                    <p className={classes['type-quantity']}>12</p>
                </button>

                <button className={`${classes['type-food']} ${classes.red}`}>
                    <p className={classes['type-name']}>CƠM</p>
                    <FontAwesomeIcon className={classes['type-icon']} icon={faBowlRice} />
                    <p className={classes['type-quantity']}>12</p>
                </button>

                <button className={`${classes['type-food']} ${classes.purple}`}>
                    <p className={classes['type-name']}>ĐỒ UỐNG</p>
                    <FontAwesomeIcon className={classes['type-icon']} icon={faMugHot} />
                    <p className={classes['type-quantity']}>12</p>
                </button>

                <button className={`${classes['type-food']} ${classes.green}`}>
                    <p className={classes['type-name']}>TRÁNG MIỆNG</p>
                    <FontAwesomeIcon className={classes['type-icon']} icon={faIceCream} />
                    <p className={classes['type-quantity']}>12</p>
                </button>

                <button className={`${classes['type-food']} ${classes.yellow}`}>
                    <p className={classes['type-name']}>ĂN VẶT</p>
                    <FontAwesomeIcon className={classes['type-icon']} icon={faBurger} />
                    <p className={classes['type-quantity']}>12</p>
                </button>


            </div>
            <div className={classes['product-list']}>
                <div className={classes['product-list-content']}>
                    <h4 className={classes['product-list-title']}>Product List</h4>
                    <Button primary type="submit" className={classes['product-list-btn']}>Add new</Button>
                </div>
                <form className={classes['menu-form']} onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map((food, index) => (
                                <Fragment key={index}>
                                    {editFoodId === food.id ? (
                                        <EditableRow
                                            editFoodId={editFoodId}
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick}

                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            food={food}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </form>

                <h2>Add dishes</h2>
                <form onSubmit={handleAddFormSubmit}>
                    <div className={classes.adding}>
                        <input
                            type="text"
                            required="required"
                            placeholder="Choose foodimgage "
                            name="image"
                            onChange={handleAddFormChange}
                        />
                        <input
                            type="text"
                            required="required"
                            placeholder="Enter a name..."
                            name="fullName"
                            onChange={handleAddFormChange}
                        />
                        <input
                            type="text"
                            required="required"
                            placeholder="Enter type of food"
                            name="type"
                            onChange={handleAddFormChange}
                        />
                        <input
                            type="text"
                            required="required"
                            placeholder="Enter price of food"
                            name="price"
                            onChange={handleAddFormChange}
                        />
                    </div>
                    <Button primary type="submit">Add</Button>
                </form>
            </div>
        </div>
    );
}

export default Upload;
