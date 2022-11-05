import Home from '~/pages/Home';
import Menu from '~/pages/Menu';
import Service from '~/pages/Service';
import Contact from '~/pages/Contact';
import Upload from '~/pages/Upload';
import Login from '~/pages/Login';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/menu', component: Menu },
    { path: '/service', component: Service },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login },
    { path: '/upload', component: Upload },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }