import Home from '~/pages/Home';
import Menu from '~/pages/Menu';
import Service from '~/pages/Service';
import Upload from '~/pages/Upload';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import FoodProfile from '~/pages/FoodProfile';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/service', component: Service },
    { path: '/login', component: Login },
    { path: '/@:nickname', component: FoodProfile }, // sau này chỉnh sửa lại thông tin của food profile
    { path: '/upload', component: Upload }, // admin
    { path: '/profile', component: Profile },// customer sau này sẽ thêm viewcustomer page vào dành cho admin
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }