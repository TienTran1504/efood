import ShoppingCart from '~/components/Layout/DefaultLayout/ShoppingCart/index.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

const headers = {
    Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzkwYjU2MDU3MTczMWE0NGEyMzE3MTIiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NzA1MTU4NTIsImV4cCI6MTY3MzEwNzg1Mn0.b99hXW1dgsejSAZhWfyhY_wXLjQcztF6r3GmealBLAU',
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

    useEffect(() => {
        const cartData = window.localStorage.getItem('CART_DATA');
        if (cartData) setCartItems(JSON.parse(cartData));

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

    useEffect(() => {
        window.localStorage.setItem('CART_DATA', JSON.stringify(cartItems));
        // console.log(cartItems);
    }, [cartItems]);

    return (
        <>
            <ShoppingCart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} deliveryCost={20000}></ShoppingCart>
        </>
    );
}

export default Cart;
