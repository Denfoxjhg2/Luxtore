import { createApp } from "vue";
import App from "./src/App.vue";
import store from "./src/store";
import '../css/app.css'
import Router from "./src/router/router";

createApp(App).use(store).use(Router.router).mount("#app");