import React from "react";
import Button from "~/components/Layout/DefaultLayout/Header/Button";
import classes from "./Modal.module.scss";

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
                <form onSubmit={handleAddFormSubmit}>
                    <div className={classes.body}>
                        <div className={classes.adding}>

                            <div className={classes.productName}>
                                <p>Product Name</p>
                                <input
                                    type="text"
                                    required="required"
                                    placeholder="Enter a name..."
                                    name="fullName"
                                    onChange={handleAddFormChange}
                                />
                            </div>
                            <div className={classes.productType}>
                                <p>Type</p>
                                <input
                                    type="text"
                                    required="required"
                                    placeholder="Enter type of food"
                                    name="type"
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
                        </div>
                        <div className={classes.productImage}>
                            <input
                                type="file"
                                required="required"
                                placeholder="Choose foodimgage "
                                name="image"
                                onChange={handleAddFormChange}
                            />
                        </div>
                    </div>
                    <div className={classes.footer}>
                        <Button
                            onClick={() => {
                                setOpenModal(false);
                            }}
                            primary>
                            Cancel
                        </Button>
                        <Button primary type="submit" >Add</Button>
                    </div>
                </form>

            </div>

        </div>
    );
}

export default Modal;