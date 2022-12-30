import classes from './Contacts.module.scss';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import React, { useState, Fragment } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

import request from '~/utils/request';
import ReadOnlyRow from './components/ReadOnlyRow';
import DialogConfirm from '~/components/UiComponent/DialogConfirm';
import Button from '~/components/Layout/DefaultLayout/Header/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

function Contacts() {
    //add for process delete modal
    const [idUser, setIdUser] = useState(null);
    const [dialogConfirm, setDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //====================
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('contacts')) || []);
    const tokenAuth = 'Bearer ' + JSON.stringify(localStorage.getItem('token')).split('"').join('');
    const headers = {
        Authorization: tokenAuth,
    };

    const handleRefreshData = async () => {
        setIsLoading(true);
        await request.get('admin/contacts', { headers: headers }).then((res) => {
            console.log(res.data);
            var newContacts = [];
            res.data.sortedContacts.forEach((value) => {
                var newContact = {
                    id: value._id,
                    email: value.email,
                    title: value.title,
                    content: value.content,
                    createdAt: value.createdAt,
                };
                newContacts = [...newContacts, newContact];
            });
            setUsers(newContacts);
            localStorage.setItem('contacts', JSON.stringify(newContacts));
            Swal.fire({
                title: 'Tải lại thành công!',
                icon: 'success',
                confirmButtonText: 'Hoàn tất',
                width: '50rem',
            });
        });
        setIsLoading(false);
    };

    const handleDeleteClick = (userId) => {
        handleShowDialogConfirm(true);
        setIdUser(userId);
    };

    //add functon process delete
    const areUSureDelete = async (choose) => {
        if (choose) {
            const newUsers = [...users];
            const index = users.findIndex((user) => user.id === idUser);
            setIsLoading(true);
            await request
                .delete('admin/contacts/' + users[index].id, { headers: headers })
                .then((res) => {
                    Swal.fire({
                        title: 'Xóa feedback thành công!',
                        icon: 'success',
                        confirmButtonText: 'Hoàn tất',
                        width: '50rem',
                    });
                })
                .catch((res) => console.log(res));
            setIsLoading(false);
            newUsers.splice(index, 1);
            setUsers(newUsers);
        }
        setDialog(false);
    };

    const handleShowDialogConfirm = (isLoading) => {
        setDialog(isLoading);
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>
                <p className={classes['title-name']}>CONTACTS MANAGEMENT</p>
            </div>
            <div className={classes['product-list']}>
                <div className={classes['product-list-content']}>
                    <h4 className={classes['product-list-title']}>Contacts List</h4>
                    <Button primary type="button" className={classes['product-list-btn']} onClick={handleRefreshData}>
                        Refresh <FontAwesomeIcon icon={faRefresh} />
                    </Button>
                </div>
                <form className={classes['menu-form']}>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email Feedback</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <Fragment key={index}>
                                    <ReadOnlyRow index={index + 1} user={user} handleDeleteClick={handleDeleteClick} />
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

export default Contacts;
