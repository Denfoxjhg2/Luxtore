import { createApp } from "vue";
import App from "./src/App.vue";
import '../css/app.css'
import Router from "./src/router/router";


createApp(App).use(Router.router).mount("#app");