import { createPinia } from 'pinia';
import { createApp } from 'vue';
import '../css/app.css';
import App from './src/App.vue';
import Router from './src/router/router';
import { useStore } from './src/stores/store';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(Router.router);
const productStore = useStore();
productStore
    .getProducts()
    .then(() => {
        app.mount('#app');
    })
    .catch((error) => {
        console.error('Failed to load products:', error);
        app.mount('#app'); // Все равно монтируем приложение
    });
