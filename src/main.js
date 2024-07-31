import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes.js'
import store from './store/index.js'
import './style/style.css'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "bootstrap";


const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
