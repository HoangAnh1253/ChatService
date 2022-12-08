// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1, mt: 0.5 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'exam',
    path: '/dashboard/exam',
    icon: icon('ic_exam'),
  },
  {
    title: 'topic',
    path: '/dashboard/topic',
    icon: icon('ic_topic'),
  },
];

export default navConfig;
