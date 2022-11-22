import Dashboard from '~/pages/Dashboard';
import Upload from '~/pages/Upload';
import Users from '~/pages/Users';
import Login from '~/pages/Login';
import ForgotPassword from '~/pages/ForgotPassword';
import ChangePassword from '~/pages/ChangePassword';

const publicRoutes = [
    { path: '/', component: Dashboard },
    { path: '/users', component: Users },
    { path: '/login', component: Login },
    { path: '/forgot', component: ForgotPassword },
    { path: '/changePass', component: ChangePassword },
    { path: '/upload', component: Upload }, // admin
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
