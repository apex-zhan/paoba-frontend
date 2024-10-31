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
import {ref} from "vue";

const routes = [
  //主页路由
  {
    path: "/",
    component: index,
  },
  {
    path: "/Team",
    name: "找队伍",
    component: team,
    meta: { title: "找队伍" },
  },
  {
    path: "/User",
    title: "用户列表",
    name: "User",
    component: user,
    meta: { title: "用户列表" },
  },
  {
    path: "/search",
    name: "找伙伴",
    component: SearchPage,
    meta: { title: "找伙伴" },
  },
  {
    path: "/User/edit",
    name: "编辑信息",
    component: EditUserPage,
    meta: { title: "编辑信息" },
  },
  {
    path: "/user/searchResult",
    name: "搜索结果",
    component: SearchResultPage,
    meta: { title: "搜索结果" },
  },
  {
    path: "/user/login",
    name: "登录",
    component: UserLoginPage,
    meta: { title: "登录" },
  },
  {
    path: "/team/add",
    title: "创建队伍",
    component: TeamAddPage,
    meta: { title: "创建队伍" },
  },
  {
    path: "/user/update",
    title: "更新信息",
    component: UserUpdatePage,
    meta: { title: "更新信息" },
  },
  {
    path: "/user/team/join",
    title: "加入队伍",
    component: UserTeamJoinPage,
    meta: { title: "加入队伍" },
  },
  {
    path: "/user/team/create",
    title: "创建队伍",
    component: UserTeamCreatePage,
    meta: { title: "创建队伍" },
  },
  //联系用户页面
  {
    path: "/user/contact",
    title: "联系用户",
    component: UserContactPage,
    meta: { title: "联系用户" },
  },
];
// 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
});
const DEFAULT_TITLE = "泡友匹配";
const title = ref(DEFAULT_TITLE);
/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  console.log(router, routes);
  const topath = to.path;
  // .find 查找数组中满足特定条件的第一个元素
  const matchedRoute = routes.find((item) => {
    return topath == item.path; //找到匹配的路由
  });
  title.value = matchedRoute?.title ?? DEFAULT_TITLE;
});
export default router;
