import ShoppingCart from '~/components/Layout/DefaultLayout/ShoppingCart/index.js';
import itemData from '~/components/Layout/DefaultLayout/ShoppingCart/itemData.js';

const items = [];
items.push(itemData.products[0]);
items.push(itemData.products[1]);
items.push(itemData.products[2]);
items.push(itemData.products[3]);
items.push(itemData.products[4]);

function Cart() {
    return <ShoppingCart items={items} deliveryCost={20000}></ShoppingCart>;
}

export default Cart;



