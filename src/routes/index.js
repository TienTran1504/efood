import Home from '~/pages/Home';
import Menu from '~/pages/Menu';
import Service from '~/pages/Service';
import Contact from '~/pages/Contact';
import Upload from '~/pages/Upload';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import Cart from '~/pages/Cart';
import FoodProfile from '~/pages/FoodProfile';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/service', component: Service },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login },
    { path: '/upload', component: Upload },
    { path: '/profile', component: Profile },
    { path: '/cart', component: Cart },
    { path: '/@:nickname', component: FoodProfile }, // sau này chỉnh sửa lại thông tin của food profile
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }