import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Vant from "vant";
import "vant/lib/index.css";
import router from "./router/router";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);
app.use(Vant);
app.use(router);
app.use(VueAxios, axios);
app.mount("#app");
