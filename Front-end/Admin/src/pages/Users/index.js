import classes from './Users.module.scss';
import { faRefresh, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, Fragment } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

import request from '~/utils/request';
import Role from '~/components/TypeOf';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';
import DialogConfirm from '~/components/UiComponent/DialogConfirm';
import Button from '~/components/Layout/DefaultLayout/Header/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Users() {
    //add for process delete modal
    const [isLoading, setIsLoading] = useState(false);
    const [idUser, setIdUser] = useState(null);
    const [dialogConfirm, setDialog] = useState(false);
    const [typeRole, setTypeRole] = useState([
        { name: 'Customer', icon: faUsers, number: 0, color: 'blue' },
        { name: 'Admin', icon: faUser, number: 0, color: 'red' },
    ]);
    //====================
    const [storageSave, setStorageSave] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [editFormData, setEditFormData] = useState({
        id: '',
        name: '',
        email: '',
        typeOf: '',
        gender: '',
    });
    const [editUserId, setEditUserId] = useState(null);
    const tokenAuth = 'Bearer ' + JSON.stringify(localStorage.getItem('token')).split('"').join('');
    const headers = {
        Authorization: tokenAuth,
    };

    useEffect(() => {
        var newTypeRole = [...typeRole];
        newTypeRole.forEach((role) => {
            role.number = 0;
        });

        storageSave.forEach((value) => {
            if (value.typeOf === 'Customer') newTypeRole[0].number += 1;
            else newTypeRole[1].number += 1;
        });
        setTypeRole(newTypeRole);
    }, [storageSave]);

    const handleRefreshData = async () => {
        setIsLoading(true);
        await request
            .get('admin', { headers: headers })
            .then((res) => {
                var newUsers = [];
                const userId = localStorage.getItem('userId');
                console.log(res.data);
                res.data.sortedUsers.forEach((value, index) => {
                    if (userId !== value._id) {
                        var newUser = {
                            id: value._id,
                            name: value.name,
                            email: value.email,
                            gender: value.gender,
                            typeOf: value.typeOf,
                            image: value.image,
                        };
                        newUsers = [...newUsers, newUser];
                    }
                });
                setUsers(newUsers);
                setStorageSave(newUsers);
                localStorage.setItem('users', JSON.stringify(newUsers));
            })
            .catch((err) => console.log(err));
        setIsLoading(false);
    };

    const handleFilterUsers = (e) => {
        var newUsers = [];
        var key = e.target.firstChild.innerText;

        storageSave.forEach((value) => {
            if (value.typeOf === key) newUsers = [...newUsers, value];
        });
        setUsers(newUsers);
    };

    const handleEditFormChange = (e) => {
        const fieldName = e.target.getAttribute('name');
        const fieldValue = e.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();

        const newUsers = [...users];

        const index = users.findIndex((user) => user.id === editUserId);
        newUsers[index] = editFormData;

        setIsLoading(true);
        const res = await request
            .patch('admin/' + editUserId, { typeOf: editFormData.typeOf }, { headers: headers })
            .then((res) => {
                setUsers(newUsers);
                setStorageSave(newUsers);
                localStorage.setItem('users', JSON.stringify(newUsers));
                setEditUserId(null);
            })
            .catch((err) => console.log(err));
        setIsLoading(false);
    };

    const handleEditClick = (e, user) => {
        e.preventDefault();
        setEditUserId(user.id);

        const formValues = {
            name: user.name,
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
        handleShowDialogConfirm(true);
        setIdUser(userId);
    };

    //add functon process delete
    const areUSureDelete = (choose) => {
        if (choose) {
            const newUsers = [...users];
            const index = users.findIndex((user) => user.id === idUser);

            setIsLoading(true);
            request
                .delete('admin/' + users[index].id, { headers: headers })
                .then((res) => console.log(res))
                .catch((res) => console.log(res));

            setIsLoading(false);

            newUsers.splice(index, 1);
            setUsers(newUsers);
            setStorageSave(newUsers);
            localStorage.setItem('users', JSON.stringify(newUsers));
        }
        setDialog(false);
    };

    const handleShowDialogConfirm = (isLoading) => {
        setDialog(isLoading);
    };

    // const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>
                <p className={classes['title-name']}>USERS MANAGEMENT</p>
            </div>

            <div className={classes.filter}>
                {typeRole.map((role, index) => (
                    <Role key={index} props={role} handleFilterUsers={handleFilterUsers} />
                ))}
            </div>
            <div className={classes['product-list']}>
                <div className={classes['product-list-content']}>
                    <h4 className={classes['product-list-title']}>Users List</h4>
                    <Button primary type="button" className={classes['product-list-btn']} onClick={handleRefreshData}>
                        Refresh <FontAwesomeIcon icon={faRefresh} />
                    </Button>
                </div>
                <form className={classes['menu-form']} onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
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
                                            index={index + 1}
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            index={index + 1}
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
            {dialogConfirm && <DialogConfirm onDialog={areUSureDelete} />}
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default Users;
