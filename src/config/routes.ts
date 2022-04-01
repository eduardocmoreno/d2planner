import About from "../pages/About";
import Planner from "../pages/Planner";

const routes: RouteProps[] = [
  {
    path: '/about',
    name: 'About',
    Component: About
  },
  {
    path: '/class/:character',
    name: 'Planner',
    Component: Planner
  },
  {
    name: '404',
    path: '*',
    Component: Planner
  }
];

export default routes;