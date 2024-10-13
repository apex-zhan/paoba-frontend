<template>
  <div id="teamPage">
    <van-button type="primary" @click="doCreateteam">创建队伍</van-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const doCreateteam = () => {
  router.push("/team/create");
};
</script>

<style></style>
