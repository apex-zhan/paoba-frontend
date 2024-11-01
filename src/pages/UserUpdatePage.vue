<template>
  <template v-if="user">
    <van-cell
        :value="user.userName"
        is-link
        title="昵称"
        to="/user/edit"
        @click="toEdit('username', '昵称', user.userName)"
    />
    <van-cell title="账号" :value="user.userAccount"/>
    <van-cell title="头像" is-link to="/user/edit">
      <img style="height: 48px" :src="user.userAvatar"/>
    </van-cell>
    <van-cell
        :value="user.gender"
        is-link
        title="性别"
        @click="toEdit('gender', '性别', user.gender)"
    />
    <van-cell
        :value="user.phone"
        is-link
        title="电话"
        to="/user/edit"
        @click="toEdit('phone', '电话', user.phone)"
    />
    <van-cell
        :value="user.email"
        is-link
        title="邮箱"
        to="/user/edit"
        @click="toEdit('email', '邮箱', user.email)"
    />
    <van-cell title="注册时间" :value="user.createTime"/>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/UserServices.ts";

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
});

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: "/user/edit",
    query: {
      editKey,
      editName,
      currentValue,
    },
  });
};
</script>

<style scoped></style>
