import Dashboard from '~/pages/Dashboard';
import Upload from '~/pages/Upload';
import Users from '~/pages/Users';
import Login from '~/pages/Login';
import Contacts from '~/pages/Contacts';
import SignUp from '~/pages/Register';

const publicRoutes = [
    { path: '/', component: Login },
    { path: '/users', component: Users },
    { path: '/contacts', component: Contacts },
    { path: '/dashboard', component: Dashboard },
    { path: '/register', component: SignUp },
    { path: '/upload', component: Upload }, // admin
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
