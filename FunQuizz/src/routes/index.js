// Layouts

// Pages
import Login from '~/pages/Login/login';
import Setting from '~/pages/Setting';
import Main from '~/pages/Main';
import NewQuestion from '~/pages/NewQuestion';
import OwningExams from '~/pages/OwningExams';
import ExamDetail from '~/pages/ExamDetail';
import WaitRoom from '~/pages/WaitRoom';

// Public routes
const publicRoutes = [
    { path: '/', component: Main },
    { path: '/login', component: Login, layout: null },
    // { path: '/app', component: App, layout: null },
    { path: '/setting', component: Setting },
    { path: '/quiz/creator', component: NewQuestion, layout: null },
    { path: '/quiz/owning', component: OwningExams, layout: null },
    { path: '/quiz/detail/:id', component: ExamDetail, layout: null },
    { path: '/quiz/wait-room/:userRole/:id', component: WaitRoom, layout: null },// :userRole = GUEST => :id mean id of room ; :userRole = HOST => :id mean id of exam
    // { path: '/activity', component: Activity, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
