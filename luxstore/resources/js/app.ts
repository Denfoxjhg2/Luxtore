import { createApp } from 'vue';
import '../css/app.css';
import App from './src/App.vue';
import Router from './src/router/router';

createApp(App).use(Router.router).mount('#app');
