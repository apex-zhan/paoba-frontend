<template>
  <van-nav-bar
      safe-area-inset-top
      :title="name"
      left-text="返回"
      left-arrow
      @click-left="onChangeLeft"
      @click-right="onChangeRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view></router-view>
  </div>

  <van-tabbar route safe-area-inset-bottom @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="friends-o" name="team"
    >队伍
    </van-tabbar-item>
    <van-tabbar-item to="/user" icon="setting-o" name="user"
    >个人
    </van-tabbar-item>
  </van-tabbar>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref} from "vue";

const router = useRouter();
const DEFAULT_TITLE = "泡友匹配";
const name = ref(DEFAULT_TITLE);

console.log(router.getRoutes());
/**
 * 路由切换时，根据路由的title来设置标题
 */
router.beforeEach((to, from) => {
  const topath = to.path;
  // .find 查找数组中满足特定条件的第一个元素
  const matchedRoute = router.getRoutes().find((item) => {
    return item.path === topath;
  });
  name.value = matchedRoute?.name ?? DEFAULT_TITLE;
});

const onChangeLeft = () => router.back();
const onChangeRight = () => router.push("/search");
</script>
<style scoped>
#content {
  padding-bottom: 22px;
}
</style>
