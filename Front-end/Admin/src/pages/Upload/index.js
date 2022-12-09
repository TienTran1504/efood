import classes from './Upload.module.scss';
import { faBowlFood, faBowlRice, faIceCream, faMugHot, faRefresh } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, Fragment } from 'react';
import data from './mock-data.json';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';
import Button from '~/components/Layout/DefaultLayout/Header/Button';
import Modal from './components/Modal';
import TypeFood from './components/TypeFood';
import DialogConfirm from '~/components/UiComponent/DialogConfirm';
import request from '~/utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Upload() {
    const [dialogConfirm, setDialog] = useState(false);
    const [idFood, setIdFood] = useState(null);

    const [foods, setFoods] = useState(data);
    const [addFormData, setAddFormData] = useState({
        id: '',
        fullName: '',
        type: '',
        price: '',
        image: '',
    });

    const [editFormData, setEditFormData] = useState({
        id: '',
        fullName: '',
        type: '',
        price: '',
        image: '',
    });

    const foodType = [
        { name: 'Món nước', icon: faBowlFood, number: 3, color: 'blue' },
        { name: 'Cơm', icon: faBowlRice, number: 3, color: 'red' },
        { name: 'Đồ uống', icon: faMugHot, number: 3, color: 'purple' },
        { name: 'Tráng miệng', icon: faIceCream, number: 3, color: 'green' },
        { name: 'Ăn vặt', icon: faIceCream, number: 3, color: 'yellow' },
    ];

    const [editFoodId, setEditFoodId] = useState(null);

    const handleRefreshData = async () => {
        const tokenAuth = 'Bearer ' + JSON.stringify(localStorage.getItem('token')).split('"').join('');
        const headers = {
            Authorization: tokenAuth,
        };
        console.log(tokenAuth);
        await request
            .get('foods', { headers: headers })
            .then((res) => {})
            .catch((err) => console.log(err));
    };
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleAddFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute('name');
        const fieldValue = e.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleEditFormChange = (e) => {
        e.preventDefault();

        var fieldValue;
        var fieldName = e.target.getAttribute('name');

        const newFormData = { ...editFormData };

        if (fieldName === 'image') {
            fieldValue = URL.createObjectURL(e.target.files[0]);
            convertToBase64(e.target.files[0]).then((data) => {
                // console.log(data);
            });
        } else {
            fieldValue = e.target.value;
        }

        newFormData[fieldName] = fieldValue;
        // console.log(newFormData);
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

    const handlShowDialogConfirm = (isLoading) => {
        setDialog(isLoading);
    };

    const handleDeleteClick = (foodId) => {
        // const newFoods = [...foods];

        // const index = foods.findIndex((food) => food.id === foodId);

        // newFoods.splice(index, 1);

        // setFoods(newFoods);
        handlShowDialogConfirm(true);
        setIdFood(foodId);
    };

    const areUSureDelete = (choose) => {
        if (choose) {
            setDialog(false);
            const newFoods = [...foods];

            const index = foods.findIndex((food) => food.id === idFood);

            newFoods.splice(index, 1);

            setFoods(newFoods);
        } else {
            setDialog(false);
        }
    };

    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className={classes.wrapper}>
            {modalOpen && (
                <Modal
                    setOpenModal={setModalOpen}
                    handleAddFormChange={handleAddFormChange}
                    handleAddFormSubmit={handleAddFormSubmit}
                />
            )}

            <div className={classes.title}>
                <p className={classes['title-name']}>PRODUCT MANAGEMENT</p>
            </div>

            <div className={classes.filter}>
                {foodType.map((payMenthod, index) => (
                    <TypeFood key={index} props={payMenthod} />
                ))}
            </div>

            <div className={classes['product-list']}>
                <div className={classes['product-list-content']}>
                    <h4 className={classes['product-list-title']}>Product List</h4>
                    <div className={classes['list-btn']}>
                        <Button
                            primary
                            type="submit"
                            className={classes['product-list-btn']}
                            onClick={() => {
                                setModalOpen(true);
                            }}
                        >
                            Add new
                        </Button>
                        <Button
                            primary
                            type="button"
                            className={classes['product-list-btn']}
                            onClick={handleRefreshData}
                        >
                            Refresh <FontAwesomeIcon icon={faRefresh} />
                        </Button>
                    </div>
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
                                            id={index + 1}
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
            {dialogConfirm && <DialogConfirm onDialog={areUSureDelete} />}
        </div>
    );
}

export default Upload;
