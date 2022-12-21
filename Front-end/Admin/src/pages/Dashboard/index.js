import classes from './Dashboard.module.scss';
import { faCheckCircle, faMoneyBill, faRefresh, faSpinner, faTimes, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, Fragment, useRef } from 'react';

import request from '~/utils/request';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';
import Button from '~/components/Layout/DefaultLayout/Header/Button';
import TypeOfFood from '~/components/TypeOf';
import DialogConfirm from '~/components/UiComponent/DialogConfirm';

function Dashboard() {
    const [storageSave, setStorageSave] = useState(JSON.parse(localStorage.getItem('bills')) || []);
    const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('bills')) || []);
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState([
        { name: 'Ordered', icon: faSpinner, number: 0, color: 'purple' },
        { name: 'Shipping', icon: faTruck, number: 0, color: 'green' },
        { name: 'Delivered', icon: faCheckCircle, number: 0, color: 'blue' },
        { name: 'Canceled', icon: faTimes, number: 0, color: 'red' },
    ]);
    const [editFormData, setEditFormData] = useState('');
    const [editorderId, setEditOrderId] = useState(null);
    const [editTable, setEditTable] = useState(false);

    const [dialogConfirm, setDialog] = useState(false);
    const tokenAuth = 'Bearer ' + JSON.stringify(localStorage.getItem('token')).split('"').join('');
    const headers = {
        Authorization: tokenAuth,
    };

    useEffect(() => {
        var newStatus = [...status];

        newStatus.forEach((st) => {
            st.number = 0;
        });
        storageSave.forEach((value) => {
            if (value.status === 'Ordered') newStatus[0].number += 1;
            else if (value.status === 'Shipping') newStatus[1].number += 1;
            else if (value.status === 'Delivered') newStatus[2].number += 1;
            else if (value.status === 'Canceled') newStatus[3].number += 1;
        });
        setStatus(newStatus);

        const total = storageSave.reduce((money, order) => {
            return money + order.total * 1.0;
        }, 0);
        setTotal(total);
    }, [storageSave]);

    const handleRefreshData = async () => {
        await request
            .get('bills', { headers: headers })
            .then((res) => {
                console.log(res.data);
                if (res.data.msg !== 'Dont have any bills to show') {
                    var newBills = [];

                    res.data.sortedBills.forEach((value, index) => {
                        var newbill = {
                            orderId: value._id,
                            payMethod: value.method,
                            date: value.createdAt,
                            status: value.status,
                            total: value.total,
                        };
                        newBills = [...newBills, newbill];
                    });
                    setOrders(newBills);
                    setStorageSave(newBills);
                    localStorage.setItem('bills', JSON.stringify(newBills));
                }
            })
            .catch((err) => console.log(err));
    };

    const handleFilterBills = (e) => {
        var newBills = [];
        var key = e.target.firstChild.innerText;
        console.log(key);
        storageSave.forEach((value) => {
            if (value.status === key) newBills = [...newBills, value];
        });

        setOrders(newBills);
    };

    const handleEditStatus = (e) => {
        console.log(e);
        if (e === null) return;
        e.preventDefault();
        var fieldValue = e.target.innerHTML;
        setEditFormData(fieldValue);
    };

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        const newOrders = [...orders];
        const index = orders.findIndex((order) => order.orderId === editorderId);
        newOrders[index].status = editFormData;
        const res = await request
            .patch('bills/' + editorderId, { status: editFormData }, { headers: headers })
            .then((res) => {
                setOrders(newOrders);
                setStorageSave(newOrders);
                setEditOrderId(null);
            })
            .catch((err) => console.log(err));
        setEditTable(false);
    };

    const handleEditClick = (e, order) => {
        e.preventDefault();
        setEditOrderId(order.orderId);
        setEditFormData(order.status);
        setEditTable(true);
    };

    const handleCancelClick = (state) => {
        setEditOrderId(null);
        setEditTable(false);
    };

    const handlShowDialogConfirm = (isLoading) => {
        setDialog(isLoading);
    };
    const handleDeleteClick = (orderId) => {
        handlShowDialogConfirm(true);
        setEditOrderId(orderId);
    };

    const areUSureDelete = async (choose) => {
        if (choose) {
            const newOrders = [...orders];
            const index = orders.findIndex((order) => order.orderId === editorderId);

            await request
                .delete('bills/' + orders[index].orderId, { headers: headers })
                .then((res) => {
                    newOrders.splice(index, 1);
                    setOrders(newOrders);
                    setStorageSave(newOrders);
                })
                .catch((res) => console.log(res));
        }
        setDialog(false);
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>
                <p className={classes['title-name']}>DASHBOARD MANAGEMENT</p>
            </div>
            <div className={classes.filter}>
                {status.map((st, index) => (
                    <TypeOfFood key={index} props={st} handleFilterBills={handleFilterBills} />
                ))}
            </div>
            <div className={classes['product-list']}>
                <div className={classes['product-list-content']}>
                    <h4 className={classes['product-list-title']}>Recent Orders</h4>
                    <Button primary type="button" className={classes['product-list-btn']} onClick={handleRefreshData}>
                        Refresh <FontAwesomeIcon icon={faRefresh} />
                    </Button>
                </div>
                <form onSubmit={handleEditFormSubmit}>
                    <table>
                        <thead>
                            <tr className={classes['title-form']}>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Payment Method</th>
                                <th>Order Date</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <Fragment key={index}>
                                    {editTable ? (
                                        <EditableRow
                                            id={index}
                                            order={order}
                                            handleEditStatus={handleEditStatus}
                                            handleCancelClick={handleCancelClick}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            id={index}
                                            order={order}
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
            <div className={classes['box-btn']}>
                <Button primary className={`${classes.incomeBtn} ${classes['btn-submit']}`}>
                    <span id={classes['btn-submit-title']}>TODAY INCOME</span>
                    <span id={classes['btn-submit-money']}>{`${total} VNĐ`}</span>
                    <div id={classes['btn-submit-icon']}>
                        <FontAwesomeIcon icon={faMoneyBill} />
                    </div>
                </Button>
            </div>
            {dialogConfirm && <DialogConfirm onDialog={areUSureDelete} />}
        </div>
    );
}

export default Dashboard;
