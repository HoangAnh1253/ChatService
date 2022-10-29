// Layouts

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login/login';
// import App from '~/pages/App/app.js';
import Setting from '~/pages/Setting';
import Activity from '~/pages/Activity';
import MainAppBar from '~/components/assets/AppBar';
import Main from '~/pages/Main';
import { DefaultLayout } from '~/components/Layout';
// Public routes
const publicRoutes = [
    { path: '/', component: Main },
    { path: '/login', component: Login, layout: null },
    // { path: '/app', component: App, layout: null },
    { path: '/setting', component: Setting },
    // { path: '/activity', component: Activity, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
