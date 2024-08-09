import {createApp} from 'vue';
import "./style.css";
import {NavBar, Button} from "vant";
import App from './App.vue';


const app = createApp(App);
app.use(NavBar);
app.use(Button);
createApp(App).mount('#app');
