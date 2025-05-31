import { createRouter , createWebHistory } from 'vue-router';
import routes from './routes.js';
import axios from 'axios';
import store from '../store/index.js';

const router = createRouter({
    history:createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: 'Login' });
    } else if (to.meta.requiresGuest && store.state.user.token) {
        next({ name: 'Profile' });
    } else {
        next();
    }
});


export default {
    router
}