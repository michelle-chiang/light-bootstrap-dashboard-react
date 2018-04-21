import Dashboard from 'views/Dashboard/Dashboard';
import UserProfile from 'views/UserProfile/UserProfile';
import TableList from 'views/TableList/TableList';
import Notifications from 'views/Notifications/Notifications';
// import Typography from 'views/Typography/Typography';
// import Icons from 'views/Icons/Icons';
// import Maps from 'views/Maps/Maps';
// import Upgrade from 'views/Upgrade/Upgrade';

const appRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { path: "/table", name: "Table Data", icon: "pe-7s-menu", component: TableList },
    { path: "/tasks", name: "Tasks", icon: "pe-7s-note2", component: Notifications },
    { path: "/user", name: "Restaurant Profile", icon: "pe-7s-user", component: UserProfile },
	{ redirect: true, path:"/", to:"/dashboard", name: "Dashboard" }
];

export default appRoutes;


// { path: "/typography", name: "Typography", icon: "pe-7s-news-paper", component: Typography },
// { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
// { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
// { upgrade: true, path: "/upgrade", name: "Upgrade to PRO", icon: "pe-7s-rocket", component: Upgrade },
