import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import StaffLogin from '../views/StaffLogin.vue';
import Dashboard from '../views/Dashboard.vue';
import PublisherDashboard from '../views/Dashboards/PublisherDashboard.vue';
import BookDashboard from '../views/Dashboards/BookDashboard.vue';
import UserDashboard from '../views/Dashboards/UserDashboard.vue';
import TrackingDashboard from '../views/Dashboards/TrackingDashboard.vue';
import StaffDashboard from '../views/Dashboards/StaffDashboard.vue';
import BookTracking from '@/views/BookTracking.vue';
import store from '@/store';

const routes = [
    {
        path: '/',
        name: "home",
        component: Home,
    },
    {
        path: '/login',
        name: "login",
        component: Login,
    },
    {
        path: '/register',
        name: "register",
        component: Register,
    },
    {
        path: '/profile',
        name: "profile",
        component: Profile,
    },
    {
        path: '/login/staff',  // Staff login route
        name: "staff-login",
        component: StaffLogin,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/dashboard/book',
        name: 'BookDashboard',
        component: BookDashboard,
    },
    // Add meta field to all dashboard routes
    {
        path: '/dashboard/publisher',
        name: 'PublisherDashboard',
        component: PublisherDashboard,
    },
    {
        path: '/dashboard/user',
        name: 'UserDashboard',
        component: UserDashboard,
    },
    {
        path: '/dashboard/track',
        name: 'TrackingDashboard',
        component: TrackingDashboard,
    },
    {
        path: '/dashboard/staff',
        name: 'StaffDashboard',
        component: StaffDashboard,
    },
    {
        path: '/borrow',
        name: 'BookTracking',
        component: BookTracking,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});



export default router;