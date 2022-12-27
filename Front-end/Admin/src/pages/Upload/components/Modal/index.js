import React from 'react';
import Button from '~/components/Layout/DefaultLayout/Header/Button';
import classes from './Modal.module.scss';

function Modal({ setOpenModal, handleAddFormChange, handleAddFormSubmit }) {
    return (
        <div className={classes.modalBackground}>
            <div className={classes.modalContainer}>
                <div className={classes.title}>
                    <p className={classes['titleName']}>Edit Product</p>
                    <div className={classes.titleCloseBtn}>
                        <button
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            X
                        </button>
                    </div>
                </div>
                <form className={classes['modal-form']} onSubmit={handleAddFormSubmit}>
                    <div className={classes.body}>
                        <div className={classes.adding}>
                            <div className={classes.productName}>
                                <p>Product Name</p>
                                <input
                                    type="text"
                                    required="required"
                                    placeholder="Enter a name..."
                                    name="name"
                                    onChange={handleAddFormChange}
                                />
                            </div>
                            <div className={classes.productPrice}>
                                <p>Price</p>
                                <input
                                    type="text"
                                    required="required"
                                    placeholder="Enter price of food"
                                    name="price"
                                    onChange={handleAddFormChange}
                                />
                            </div>
                            <div className={classes.productType}>
                                <p>Type</p>
                                <select
                                    className="selection"
                                    name="typeOf"
                                    onChange={handleAddFormChange}
                                >

                                    <option value="Món nước">Món nước</option>
                                    <option value="Cơm" selected>Cơm</option>
                                    <option value="Đồ uống">Đồ uống</option>
                                    <option value="Tráng Miệng">Tráng Miệng</option>
                                    <option value="Ăn vặt">Ăn vặt</option>
                                </select>
                            </div>
                        </div>
                        <div className={classes.productImage}>
                            <input
                                type="file"
                                required="required"
                                name="image"
                                onChange={handleAddFormChange}
                                accept="image/jpeg, imge/png, image/jpg"
                            />
                        </div>
                    </div>
                    <div className={classes.footer}>
                        <Button
                            onClick={() => {
                                setOpenModal(false);
                            }}
                            primary
                        >
                            Cancel
                        </Button>
                        <Button primary type="submit">
                            Add
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
