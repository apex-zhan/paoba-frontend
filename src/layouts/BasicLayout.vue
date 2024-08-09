<template>
  <van-nav-bar title="标题" left-text="返回" left-arrow
  @click-left="onChangeLeft"
  @click-right="onChangeRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <van-tabbar v-model="active" @onchange="onChange">
    <van-tabbar-item icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="team">队伍</van-tabbar-item>
    <van-tabbar-item icon="setting-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

  <div id="content">
    <template v-if="active === 'index'">
      主页
    <index />
    </template>
    <template v-if="active === 'team'">
      队伍页
    <team />
    </template>
    <template v-if="active === 'user'">
      个人页
    <user />
    </template>
  </div>


</template>
<script lang="ts" setup>
import { showToast } from "vant";
import { ref } from "vue";
 const onChangeLeft = () => alert("返回");
 const onChangeRight = () => alert("搜索");

const active = ref("index");
const onChange = (index : string) => showToast(`标签 ${index}`);
    
  
</script>
<style></style>
