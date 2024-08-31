import team from "../pages/TeamPage.vue";
import index from "../pages/Index.vue";
import user from "../pages/UserPage.vue";
import * as VueRouter from "vue-router";
import SearchPage from "../pages/SearchPage.vue";
import EditUserPage from "../pages/UserEditPage.vue";


const routes = [
    //主页路由
    {
        path: "/",
        component: index,
    },
    {
        path: "/Team",
        component: team,
    },
    {
        path: "/User",
        component: user,
    },
    {
        path: "/search",
        component: SearchPage,
    },
    {
        path: "/User/edit",
        component: EditUserPage,
    }


];
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
});
export default router;