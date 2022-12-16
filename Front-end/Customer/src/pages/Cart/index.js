import ShoppingCart from '~/components/Layout/DefaultLayout/ShoppingCart/index.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

const headers = {
    Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mzk3NThlMGZmNDZiYjA3MjViMWZiNDYiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NzExNjc4MTAsImV4cCI6MTY3Mzc1OTgxMH0.kNElTB-ggXNBh-KdalB3r0jlU8FomQxUR5Mj7Sv0h90',
};

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            setCartItems(cartItems.map((x) => (x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x)));
            axios.patch(
                `http://localhost:3000/api/v1/customer/cart/${product.id}`,
                { quantity: exist.quantity + 1 },
                { headers: headers },
            );
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };
    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
            axios.patch(`http://localhost:3000/api/v1/customer/cart/delete/${product.id}`, {}, { headers: headers });
        } else {
            setCartItems(cartItems.map((x) => (x.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : x)));
            axios.patch(
                `http://localhost:3000/api/v1/customer/cart/${product.id}`,
                { quantity: exist.quantity - 1 },
                { headers: headers },
            );
        }
    };

    const createBill = (method) => {
        axios.post(`http://localhost:3000/api/v1/bills`, { method: method }, { headers: headers });
    };

    useEffect(() => {
        axios
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
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <ShoppingCart
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                createBill={createBill}
            ></ShoppingCart>
        </>
    );
}

export default Cart;
