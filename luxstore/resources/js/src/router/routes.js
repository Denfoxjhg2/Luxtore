import Contacts from '@/pages/Contacts.vue';
import Item from '@/pages/Item.vue';
import Order from '@/pages/Order.vue';
import About from '@pages/About.vue';
import Login from '@pages/auth/login.vue';
import Register from '@pages/auth/register.vue';
import Cart from '@pages/Cart.vue';
import Home from '@pages/Home.vue';
import Catalog from '@pages/ItemsCatalog.vue';
import Profile from '@pages/Profile.vue';

const routes = [
    { name: 'Homepage', path: '/', component: Home },
    { name: 'Login', path: '/login', component: Login },
    { name: 'Register', path: '/register', component: Register },
    {
        name: 'Profile',
        path: '/profile',
        component: Profile,
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem('token');
            if (token) {
                next();
            } else {
                next({ name: 'Login' });
            }
        },
    },
    { name: 'Cart', path: '/cart', component: Cart },
    { name: 'Catalog', path: '/catalog', component: Catalog },
    { name: 'About', path: '/about-us', component: About },
    { name: 'Contacts', path: '/contacts', component: Contacts },
    { name: 'Item.show', path: '/item/:slug', component: Item, props: true },
    { name: 'Order', path: '/order', component: Order },
    {
        name: 'Protected',
        path: '/protected',
        component: Profile,
        beforeEnter: (to, from, next) => {
            const token = localStorage.getItem('token');
            if (token) {
                next({ name: 'Profile' });
            } else {
                next({ name: 'Login' });
            }
        },
    },
];

export default routes;
