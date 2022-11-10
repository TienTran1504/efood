import classes from './Upload.module.scss'
import images from '~/assets/images'
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, Fragment } from "react";
import data from './mock-data.json'
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import Button from '~/components/Layout/DefaultLayout/Header/Button';
import Modal from './components/Modal';


function Users() {
    const [users, setUsers] = useState(data);
    const [addFormData, setAddFormData] = useState({
        id: "",
        fullName: "",
        email: "",
        role: "",
        gender: "",
    });

    const [editFormData, setEditFormData] = useState({
        id: "",
        fullName: "",
        email: "",
        role: "",
        gender: "",
    });
    const [editUserId, setEditUserId] = useState(null);

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
        console.log()

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            id: users.length + 1,
            fullName: addFormData.fullName,
            email: addFormData.email,
            role: addFormData.role,
            gender: addFormData.gender,
        };

        const newUsers = [...users, newUser];
        setUsers(newUsers);
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        const editedContact = {
            id: editUserId,
            fullName: editFormData.fullName,
            email: editFormData.email,
            role: editFormData.role,
            gender: editFormData.gender,
        };

        const newUsers = [...users];

        const index = users.findIndex((user) => user.id === editUserId);

        newUsers[index] = editedContact;

        setUsers(newUsers);
        setEditUserId(null);
    };

    const handleEditClick = (e, user) => {
        e.preventDefault();
        setEditUserId(user.id);

        const formValues = {
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            gender: user.gender,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditUserId(null);
    };

    const handleDeleteClick = (userId) => {
        const newUsers = [...users];

        const index = users.findIndex((user) => user.id === userId);

        newUsers.splice(index, 1);

        setUsers(newUsers);
    };
    const [modalOpen, setModalOpen] = useState(false);
    return (
        // < div className={`${modalOpen ? classes['wrapper-opacity'] : classes.wrapper}`}>
        <div className={classes.wrapper}>

            {modalOpen && <Modal setOpenModal={setModalOpen} handleAddFormChange={handleAddFormChange} handleAddFormSubmit={handleAddFormSubmit} />}

            <div className={classes.title}>
                <p className={classes['title-name']}>USERS MANAGEMENT</p>
                <img src={images.logoImage} alt="logo" className={classes['title-logo']} />
            </div>

            <div className={classes.filter}>
                {/* Sau này convert ra thành 1 component riêng */}
                <button className={`${classes['type-user']} ${classes.blue}`}>
                    <p className={classes['type-name']}>CUSTOMERS</p>
                    <FontAwesomeIcon className={classes['type-icon']} icon={faUsers} />
                    <p className={classes['type-quantity']}>12</p>
                </button>

                <button className={`${classes['type-user']} ${classes.red}`}>
                    <p className={classes['type-name']}>ADMIN</p>
                    <FontAwesomeIcon className={classes['type-icon']} icon={faUser} />
                    <p className={classes['type-quantity']}>12</p>
                </button>

            </div>
            <div className={classes['product-list']}>
                <div className={classes['product-list-content']}>
                    <h4 className={classes['product-list-title']}>Users List</h4>

                </div>
                <form className={classes['menu-form']} onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <Fragment key={index}>
                                    {editUserId === user.id ? (
                                        <EditableRow
                                            editUserId={editUserId}
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            user={user}
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
        </div>

    );
}

export default Users;
