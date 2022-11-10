import Dashboard from '~/pages/Dashboard';
import Menu from '~/pages/Menu';
import Upload from '~/pages/Upload';
import Login from '~/pages/Login';
import Users from '~/pages/Users';


const publicRoutes = [
    { path: '/', component: Dashboard },
    { path: '/users', component: Users },
    { path: '/menu', component: Menu },
    { path: '/login', component: Login },
    { path: '/upload', component: Upload }, // admin

]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }