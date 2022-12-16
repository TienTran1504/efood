import Dashboard from '~/pages/Dashboard';
import Upload from '~/pages/Upload';
import Users from '~/pages/Users';
import Login from '~/pages/Login';
import ForgotPassword from '~/pages/ForgotPassword';
import ChangePassword from '~/pages/ChangePassword';
import SignUp from '~/pages/Register';

const publicRoutes = [
    { path: '/', component: Login },
    { path: '/users', component: Users },
    { path: '/dashboard', component: Dashboard },
    { path: '/register', component: SignUp },
    { path: '/forgot', component: ForgotPassword },
    { path: '/changePass', component: ChangePassword },
    { path: '/upload', component: Upload }, // admin
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
