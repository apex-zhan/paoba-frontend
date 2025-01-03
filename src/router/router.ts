import team from "../pages/TeamPage.vue";
import index from "../pages/Index.vue";
import user from "../pages/UserPage.vue";
import * as VueRouter from "vue-router";
import SearchPage from "../pages/SearchPage.vue";
import EditUserPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamCreatePage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserContactPage from "../pages/UserContactPage.vue";

const routes = [
  //主页路由
  {
    path: "/",
    component: index,
  },
  {
      path: "/team",
      name: "队伍",
    component: team,
  },
  {
      path: "/user",
      name: "用户",
    component: user,
  },
  {
    path: "/search",
      name: "搜索",
    component: SearchPage,
  },
  {
      path: "/user/edit",
      name: "编辑用户",
    component: EditUserPage,
  },
  {
    path: "/user/searchResult",
    name: "搜索结果",
    component: SearchResultPage,
  },
  {
    path: "/user/login",
    name: "登录",
    component: UserLoginPage,
  },
  {
      path: "/team/create",
    component: TeamAddPage,
  },
  {
    path: "/user/update",
    title: "更新信息",
      name: "更新信息",
    component: UserUpdatePage,
  },
  {
    path: "/user/team/join",
    title: "加入队伍",
      name: "加入队伍",
    component: UserTeamJoinPage,
  },
  {
    path: "/user/team/create",
    title: "创建队伍",
      name: "创建队伍",
    component: UserTeamCreatePage,
  },
  //联系用户页面
  {
    path: "/user/contact",
    title: "联系用户",
      name: "联系用户",
    component: UserContactPage,
  },
    {
        path: "/:pathMatch(.*)*",
        component: () => import("../pages/404.vue"),
        hidden: true,
  },
];
// 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
});
export default router;
