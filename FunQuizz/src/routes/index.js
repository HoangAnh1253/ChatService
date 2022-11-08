// Layouts

// Pages
import Login from '~/pages/Login/login';
import Setting from '~/pages/Setting';
import Main from '~/pages/Main';
import NewQuestion from '~/pages/NewQuestion';
import OwningExams from '~/pages/OwningExams';

// Public routes
const publicRoutes = [
    { path: '/', component: Main },
    { path: '/login', component: Login, layout: null },
    // { path: '/app', component: App, layout: null },
    { path: '/setting', component: Setting },
    { path: '/quiz/creator', component: NewQuestion, layout: null },
    { path: '/quiz/owning/all', component: OwningExams, layout: null },
    // { path: '/activity', component: Activity, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
