<template>
  <van-nav-bar
      title="泡吧"
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

  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="friends-o" name="team"
    >队伍
    </van-tabbar-item
    >
    <van-tabbar-item to="/user" icon="setting-o" name="user"
    >个人
    </van-tabbar-item
    >
  </van-tabbar>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import {showToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter();
const onChangeLeft = () => router.back();
const onChangeRight = () => router.push("/search");
const onChange = (index: string) => showToast(`标签 ${index}`);
</script>
<style></style>
