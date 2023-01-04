import classes from './Upload.module.scss';
import { faBowlFood, faBowlRice, faIceCream, faMugHot, faRefresh } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Backdrop, CircularProgress } from '@mui/material';

import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';
import Button from '~/components/Layout/DefaultLayout/Header/Button';
import Modal from './components/Modal';
import TypeFood from './components/TypeFood';
import DialogConfirm from '~/components/UiComponent/DialogConfirm';
import request from '~/utils/request';
import Swal from 'sweetalert2';

function Upload() {
    const [isLoading, setIsLoading] = useState(false);
    const [dialogConfirm, setDialog] = useState(false);
    const [idFood, setIdFood] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [foodType, setFoodType] = useState([
        { name: 'Món nước', icon: faBowlFood, number: 0, color: 'blue' },
        { name: 'Cơm', icon: faBowlRice, number: 0, color: 'red' },
        { name: 'Đồ uống', icon: faMugHot, number: 0, color: 'purple' },
        { name: 'Tráng miệng', icon: faIceCream, number: 0, color: 'green' },
        { name: 'Ăn vặt', icon: faIceCream, number: 0, color: 'yellow' },
    ]);
    const [storageSave, setStorageSave] = useState(JSON.parse(localStorage.getItem('products')) || []);
    const [foods, setFoods] = useState(JSON.parse(localStorage.getItem('products')) || []);
    const [addFormData, setAddFormData] = useState({
        name: '',
        typeOf: '',
        price: '',
        image: '',
    });

    const [editFormData, setEditFormData] = useState({
        name: '',
        typeOf: '',
        price: '',
        image: '',
    });
    const tokenAuth = 'Bearer ' + JSON.stringify(localStorage.getItem('token')).split('"').join('');
    const headers = {
        Authorization: tokenAuth,
    };

    const [editFoodId, setEditFoodId] = useState(null);

    //Refresh type foods
    useEffect(() => {
        var newFoodType = [...foodType];
        newFoodType.forEach((foodT) => {
            foodT.number = 0;
        });

        storageSave.forEach((value) => {
            if (value.typeOf === 'Món nước') newFoodType[0].number += 1;
            else if (value.typeOf === 'Cơm') newFoodType[1].number += 1;
            else if (value.typeOf === 'Đồ uống') newFoodType[2].number += 1;
            else if (value.typeOf === 'Tráng miệng') newFoodType[3].number += 1;
            else if (value.typeOf === 'Ăn vặt') newFoodType[4].number += 1;
        });
        setFoodType(newFoodType);
    }, [storageSave]);

    //Handle call api foods
    const handleRefreshData = async () => {
        setIsLoading(true);
        await request
            .get('auth/foods')
            .then((res) => {
                var newFoods = [];
                res.data.sortedFoods.forEach((value, index) => {
                    var newFood = {
                        id: value._id,
                        name: value.name,
                        typeOf: value.typeOf,
                        price: value.price,
                        image: value.image,
                    };
                    newFoods = [...newFoods, newFood];
                });
                setFoods(newFoods);
                setStorageSave(newFoods);
                localStorage.setItem('products', JSON.stringify(newFoods));
                Swal.fire({
                    title: 'Tải lại thành công!',
                    icon: 'success',
                    confirmButtonText: 'Hoàn tất',
                    width: '50rem',
                });
            })
            .catch((err) => console.log(err));
        setIsLoading(false);
    };

    const handleFilterProducts = (e) => {
        var newProducts = [];
        var typeOf = e.target.firstChild.innerText;
        storageSave.forEach((value) => {
            if (value.typeOf === typeOf) newProducts = [...newProducts, value];
        });
        setFoods(newProducts);
    };

    //Converts the picture into base64
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

    //Handle add foods
    const handleAddFormChange = (e) => {
        e.preventDefault();

        var fieldName = e.target.getAttribute('name');
        var fieldValue;

        if (fieldName === 'image') {
            fieldValue = URL.createObjectURL(e.target.files[0]);
            convertToBase64(e.target.files[0]).then((data) => {
                fieldValue = data;
            });
        } else {
            fieldValue = e.target.value;
        }

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    //Call api post method add food
    const handleAddFormSubmit = async (e) => {
        e.preventDefault();
        var newFood = {
            name: addFormData.name,
            typeOf: addFormData.typeOf === '' ? 'Cơm' : addFormData.typeOf,
            price: parseInt(addFormData.price),
            image: addFormData.image,
        };
        if (!isNaN(addFormData.price)) {
            setIsLoading(true);
            await request
                .post('/foods', newFood, { headers: headers })
                .then((res) => {
                    newFood = {
                        id: res.data.food._id,
                        name: addFormData.name,
                        typeOf: addFormData.typeOf === '' ? 'Cơm' : addFormData.typeOf,
                        price: addFormData.price,
                        image: addFormData.image,
                    };
                    const newFoods = [...foods, newFood];
                    setFoods(newFoods);
                    setStorageSave(newFoods);
                    localStorage.setItem('products', JSON.stringify(newFoods));
                    setModalOpen(false);
                    Swal.fire({
                        title: 'Thêm món ăn thành công!',
                        icon: 'success',
                        confirmButtonText: 'Hoàn tất',
                        width: '50rem',
                    });
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Món ăn đã có trong thực đơn',
                        text: 'Bạn hãy thêm món ăn khác',
                        width: '50rem',
                    });
                });
            setIsLoading(false);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Giá không hợp lệ',
                width: '50rem',
            });
        }
    };

    //Handle input change information of food
    const handleEditFormChange = (e) => {
        e.preventDefault();

        var fieldValue;
        var fieldName = e.target.getAttribute('name');

        const newFormData = { ...editFormData };

        if (fieldName === 'image') {
            fieldValue = URL.createObjectURL(e.target.files[0]);
            convertToBase64(e.target.files[0]).then((data) => {
                fieldValue = data;
            });
        } else {
            fieldValue = e.target.value;
        }

        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        var checkTypeFood = foodType.some((type) => {
            return type.name === editFormData.typeOf;
        });

        if (checkTypeFood) {
            if (isNaN(editFormData.price)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Giá món ăn không hợp lệ',
                    width: '50rem',
                });
            } else {
                const editedContact = {
                    id: editFoodId,
                    name: editFormData.name,
                    typeOf: editFormData.typeOf,
                    price: editFormData.price,
                    image: editFormData.image,
                };


                const newFoods = storageSave;
                const index = foods.findIndex((food) => food.id === editFoodId);
                newFoods[index] = editedContact;

                setIsLoading(true);
                const res = await request
                    .patch(
                        'foods/' + editFoodId,
                        {
                            name: editedContact.name,
                            typeOf: editedContact.typeOf,
                            price: parseInt(editedContact.price),
                            image: editedContact.image,
                        },
                        { headers: headers },
                    )
                    .then((res) => {
                        setFoods(newFoods);
                        setStorageSave(newFoods);
                        localStorage.setItem('products', JSON.stringify(newFoods));
                        setEditFoodId(null);
                        Swal.fire({
                            title: 'Cập nhật món ăn thành công!',
                            icon: 'success',
                            confirmButtonText: 'Hoàn tất',
                            width: '50rem',
                        });
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Lỗi',
                            text: 'Món ăn bị trùng',
                            width: '50rem',
                        });
                    });
                setIsLoading(false);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Loại thức ăn không có trong danh sách.',
                width: '50rem',
            });
        }
    };

    const handleEditClick = (e, food) => {
        e.preventDefault();
        setEditFoodId(food.id);
        const formValues = {
            name: food.name,
            typeOf: food.typeOf,
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
        handlShowDialogConfirm(true);
        setIdFood(foodId);
    };

    const areUSureDelete = async (choose) => {
        if (choose) {
            const newFoods = storageSave;
            const index = foods.findIndex((food) => food.id === idFood);

            setIsLoading(true);
            await request
                .delete('foods/' + foods[index].id, { headers: headers })
                .then((res) => {
                    newFoods.splice(index, 1);
                    setFoods(newFoods);
                    setStorageSave(newFoods);
                    localStorage.setItem('products', JSON.stringify(newFoods));
                    Swal.fire({
                        title: 'Xóa món ăn thành công!',
                        icon: 'success',
                        confirmButtonText: 'Hoàn tất',
                        width: '50rem',
                    });
                })
                .catch((res) => console.log(res));
            setIsLoading(false);
        }
        setDialog(false);
    };

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
                    <TypeFood key={index} props={payMenthod} handleFilterProducts={handleFilterProducts} />
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
                                            index={index + 1}
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
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default Upload;
