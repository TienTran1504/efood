import Home from '~/pages/Home';
import Menu from '~/pages/Menu';
import Service from '~/pages/Service';
import Contact from '~/pages/Contact';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import Cart from '~/pages/Cart';
import FoodProfile from '~/pages/FoodProfile';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/contact', component: Contact },
    { path: '/service', component: Service },
    { path: '/login', component: Login },
    { path: '/@:nickname', component: FoodProfile }, // sau này chỉnh sửa lại thông tin của food profile
    { path: '/profile', component: Profile },// customer sau này sẽ thêm viewcustomer page vào dành cho admin
    { path: '/cart', component: Cart },//customer
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }