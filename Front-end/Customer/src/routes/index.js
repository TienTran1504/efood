import Home from '~/pages/Home';
import Menu from '~/pages/Menu';
import Location from '~/pages/Location';
import Contact from '~/pages/Contact';
import Login from '~/pages/Login';
import SignUp from '~/pages/Register';
import ForgotPassword from '~/pages/ForgotPassword';
import Profile from '~/pages/Profile';
import Cart from '~/pages/Cart';
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
    { path: '/cart', component: Cart },
    { path: '/profile', component: Profile },
    { path: '/updatepassword', component: UpdatePassword },
    { path: '/paymenthistory', component: PaymentHistory },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
