import classes from './Dashboard.module.scss';
import {
    faCheck,
    faHouseChimneyCrack,
    faMoneyBill,
    faSpinner,
    faTimes,
    faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, Fragment, useRef } from 'react';
import data from './mock-data.json';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';
import Button from '~/components/Layout/DefaultLayout/Header/Button';
import StateOrder from './components/StateOrder';
import DialogConfirm from '~/components/UiComponent/DialogConfirm';

function Dashboard() {
    const [orders, setOrders] = useState(data);
    const [total, setTotal] = useState(0);

    const processOrder = [
        { name: 'ORDER PROCESS', icon: faSpinner, number: 3, color: 'blue' },
        { name: 'ORDER DELIVERED', icon: faTruck, number: 3, color: 'green' },
        { name: 'ORDER CANCELED', icon: faTimes, number: 3, color: 'red' },
    ];

    const [editFormData, setEditFormData] = useState('');
    const [editorderId, setEditOrderId] = useState(null);

    const [dialogConfirm, setDialog] = useState(false);
    const [idProduct, setIdProduct] = useState(null);

    useEffect(() => {
        const total = orders.reduce((money, order) => {
            return money + order.total * 1.0;
        }, 0);
        setTotal(total);
    }, [orders]);

    const handleEditStatus = (e, orderId) => {
        if (e && orderId) {
            e.preventDefault();
            const newOrders = [];

            orders.forEach((order, index) => {
                if (order.orderId !== orderId) {
                    newOrders.push(order);
                } else {
                    order.status = e.target.innerText.toLowerCase();
                    newOrders.push(order);
                }
            });

            setOrders(newOrders);
        }
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();

        setEditOrderId(null);
    };

    const handleEditClick = (e, order) => {
        e.preventDefault();
        setEditOrderId(order.id);

        setEditFormData(order.status);
    };

    const handleCancelClick = (state) => {
        setEditOrderId(null);
    };

    const handlShowDialogConfirm = (isLoading) => {
        setDialog(isLoading);
    };
    const handleDeleteClick = (orderId) => {
        handlShowDialogConfirm(true);
        setIdProduct(orderId);
    };

    const areUSureDelete = (choose) => {
        if (choose) {
            setDialog(false);
            const newOrders = [];
            console.log(111);
            orders.forEach((order, index) => {
                if (order.orderId !== idProduct) newOrders.push(order);
            });

            setOrders(newOrders);
        } else {
            setDialog(false);
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.title}>
                <p className={classes['title-name']}>DASHBOARD MANAGEMENT</p>
            </div>
            <div className={classes.filter}>
                {processOrder.map((payMenthod, index) => (
                    <StateOrder key={index} props={payMenthod} />
                ))}
            </div>
            <div className={classes['product-list']}>
                <div className={classes['product-list-content']}>
                    <h4 className={classes['product-list-title']}>Recent Orders</h4>
                </div>
                <form className={classes['menu-form']} onSubmit={handleEditFormSubmit}>
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
                                    {editorderId === order.id ? (
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
            {/* <DialogConfirm/> */}
        </div>
    );
}

export default Dashboard;
