<!-- src/views/NotFound.vue -->
<template>
  <div class="not-found">
    <van-empty description="页面不存在">
      <template #bottom>
        <van-button type="primary" @click="goHome">返回首页</van-button>
      </template>
    </van-empty>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f8fa;
}
</style>
