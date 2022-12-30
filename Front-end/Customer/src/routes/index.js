import Home from '~/pages/Home';
import Menu from '~/pages/Menu';
import Location from '~/pages/Location';
import Contact from '~/pages/Contact';
import Login from '~/pages/Login';
import SignUp from '~/pages/Register';
import ForgotPassword from '~/pages/ForgotPassword';
import Profile from '~/pages/Profile';
import Cart from '~/pages/Cart';
import FoodProfile from '~/pages/FoodProfile';
import UpdatePassword from '~/pages/UdatePassword';
import PaymentHistory from '~/pages/PaymentHistory';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/contact', component: Contact },
    { path: '/location', component: Location },
    { path: '/login', component: Login },
    { path: '/register', component: SignUp },
    { path: '/forgot', component: ForgotPassword },
    { path: '/@:nickname', component: FoodProfile }, // sau này chỉnh sửa lại thông tin của food profile
    { path: '/cart', component: Cart }, //customer
    { path: '/profile', component: Profile }, // customer sau này sẽ thêm viewcustomer page vào dành cho admin
    { path: '/updatepassword', component: UpdatePassword }, //update password
    { path: '/paymenthistory', component: PaymentHistory }, //show payment history
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
