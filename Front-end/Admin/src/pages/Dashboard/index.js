import classes from './Dashboard.module.scss'
import images from '~/assets/images'
import { faBowlFood, faBowlRice, faBurger, faIceCream, faMoneyBill, faMugHot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, Fragment } from "react";
import data from './mock-data.json'
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import Button from '~/components/Layout/DefaultLayout/Header/Button';
function Dashboard() {
    const [foods, setFoods] = useState(data);
    const [total, setTotal] = useState(0);

    const [editFormData, setEditFormData] = useState({
        id: "",
        fullName: "",
        type: "",
        price: "",
        image: "",
    });
    const [editFoodId, setEditFoodId] = useState(null);

    useEffect(() => {
        const totalPrice = foods.reduce((price, food) => {
            return price + food.price * 1.0;
        }, 0)
        setTotal(totalPrice);
    }, [foods])

    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
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
        // < div className={`${modalOpen ? classes['wrapper-opacity'] : classes.wrapper}`}>
        <div className={classes.wrapper}>


            <div className={classes.title}>
                <p className={classes['title-name']}>DASHBOARD MANAGEMENT</p>
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



            </div>
            <Button primary className={classes.incomeBtn}>
                <span>TODAY INCOME</span>
                <span>{total}</span>
                <FontAwesomeIcon icon={faMoneyBill} />
            </Button>

        </div>

    );
}

export default Dashboard;