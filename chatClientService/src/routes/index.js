// Layouts

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login/login';
import App from '~/pages/App/app';
import Activity from '~/pages/Activity'
import MainAppBar from '~/components/assets/AppBar';
import Main from '~/pages/Main';

// Public routes
const publicRoutes = [
    { path: '/', component: Main, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/app', component: App, layout: null },
    // { path: '/activity', component: Activity, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
