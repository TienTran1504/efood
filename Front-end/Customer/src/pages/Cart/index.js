import ShoppingCart from '~/components/Layout/DefaultLayout/ShoppingCart/index.js';
import itemData from '~/components/Layout/DefaultLayout/ShoppingCart/itemData.js';
import { useState, useEffect } from 'react';
// import Menu from '~/pages/Menu/index.js';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            setCartItems(cartItems.map((x) => (x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x)));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };
    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
        } else {
            setCartItems(cartItems.map((x) => (x.id === product.id ? { ...exist, quantity: exist.quantity - 1 } : x)));
        }
    };

    useEffect(() => {
        const cartData = window.localStorage.getItem('CART_DATA');
        if (cartData) setCartItems(JSON.parse(cartData));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('CART_DATA', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <>
            <ShoppingCart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} deliveryCost={20000}></ShoppingCart>
            <button onClick={() => onAdd(itemData.products[0])} style={{ marginRight: '30px' }}>
                Add To Cart
            </button>
            <button onClick={() => onAdd(itemData.products[1])} style={{ marginRight: '30px' }}>
                Add To Cart
            </button>
            <button onClick={() => onAdd(itemData.products[2])} style={{ marginRight: '30px' }}>
                Add To Cart
            </button>
            <button onClick={() => onAdd(itemData.products[3])} style={{ marginRight: '30px' }}>
                Add To Cart
            </button>
            <button onClick={() => onAdd(itemData.products[4])} style={{ marginRight: '30px' }}>
                Add To Cart
            </button>
        </>
    );
}

export default Cart;
