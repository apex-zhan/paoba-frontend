import team from "../pages/TeamPage.vue";
import index from "../pages/Index.vue";
import user from "../pages/UserPage.vue";
import * as VueRouter from "vue-router";
import SearchPage from "../pages/SearchPage.vue";
import EditUserPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";

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
    title: "用户列表",
    name: "User",
    component: user,
  },
  {
    path: "/search",
    component: SearchPage,
  },
  {
    path: "/User/edit",
    component: EditUserPage,
  },
  {
    path: "/user/searchResult",
    component: SearchResultPage,
  },
  {
    path: "/user/login",
    name : "Login",
    component: UserLoginPage,
  },
];
// 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
