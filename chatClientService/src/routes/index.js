// Layouts

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login/login';
import App from '~/pages/App/app';

// Public routes
const publicRoutes = [
    { path: '/', component: Home, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/app', component: App, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
