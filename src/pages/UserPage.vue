<template>
  <template v-if="user">
    <van-cell
      title="昵称"
      is-link
      to="user/edit"
      :value="user.userName"
      @click="toEdit('昵称', 'userName', user.userName)"
    />
    <van-cell title="账号" is-link :value="user.userAccount" />
    <van-cell
      title="头像"
      is-link
      to="user/edit"
      :value="user.userAvatar"
      @click="toEdit('头像', 'avatarUrl', user.userAvatar)"
    >
      <img height="32px" :src="user.userAvatar" />
    </van-cell>
    <van-cell
      title="性别"
      is-link
      to="user/edit"
      :value="user.gender"
      @click="toEdit('性别', 'gender', user.gender.toString())"
    />
    <van-cell
      title="电话"
      is-link
      to="user/edit"
      :value="user.phone"
      @click="toEdit('手机', 'phone', user.phone)"
    />
    <van-cell
      title="邮箱"
      is-link
      to="user/edit"
      :value="user.email"
      @click="toEdit('邮箱', 'email', user.email)"
    />
    <van-cell title="注册时间" is-link :value="user.createTime" />
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import MyAxios from "../plugins/myAxios";
import { showToast } from "vant";
import { getCurrentUser } from "../services/UserServices.ts";

const router = useRouter();

const user = ref();
onMounted(async () => {
  user.value = await getCurrentUser();
  if (!user.value) {
    showToast("请先登录");
    router.push("/login");
  }
});

const toEdit = (editName: string, editKey: string, currentValue: string) => {
  router.push({
    path: "/User/edit",
    query: {
      editName,
      editKey,
      currentValue,
    },
  });
};
</script>
<style scoped></style>
