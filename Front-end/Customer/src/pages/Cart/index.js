import ShoppingCart from '~/components/Layout/DefaultLayout/ShoppingCart/index.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const token = JSON.stringify(localStorage.getItem('token')).split('"').join('');
const tokenAuth = 'Bearer ' + token;
const headers = {
    Authorization: tokenAuth,
};

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    async function onAdd(product) {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            setCartItems(cartItems.map((x) => (x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x)));
            await axios.patch(
                `http://localhost:3000/api/v1/customer/cart/${product.id}`,
                { quantity: exist.quantity + 1 },
                { headers: headers },
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    }
    async function onRemove(product) {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
            await axios.patch(
                `http://localhost:3000/api/v1/customer/cart/delete/${product.id}`,
                {},
                { headers: headers },
            );
        } else {
            setCartItems(cartItems.map((x) => (x.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : x)));
            await axios.patch(
                `http://localhost:3000/api/v1/customer/cart/${product.id}`,
                { quantity: exist.quantity - 1 },
                { headers: headers },
            );
        }
    }

    async function createBill(receiver, phone, address, method, message, total) {
        setLoading(true);
        await axios.post(
            `http://localhost:3000/api/v1/bills`,
            { receiver: receiver, phone: phone, address: address, method: method, message: message, total: total },
            { headers: headers },
        );

        setLoading(false);
        alert('Đặt hàng thành công!');
        window.location.reload(false);
    }

    async function fetchData() {
        if (token !== 'null') {
            setLoading(true);
            await axios
                .get(`http://localhost:3000/api/v1/customer/cart`, { headers: headers })
                .then((res) => {
                    setCartItems(
                        res.data.orderList.map((item) => ({
                            id: item.foodId,
                            name: item.name,
                            image: item.image,
                            price: item.totalPrice / item.quantity,
                            totalPrice: item.totalPrice,
                            quantity: item.quantity,
                        })),
                    );

                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <ShoppingCart
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                createBill={createBill}
            ></ShoppingCart>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default Cart;
