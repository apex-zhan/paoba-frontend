<template>
  <template v-if="user">
    <van-cell
    title="昵称"
    is-link
    to="user/edit"
    :value="user.userName"
    @click="toEdit('昵称','userName',  user.userName)"
  />
  <van-cell title="账号" is-link :value="user.userAccount" />
  <van-cell
    title="头像"
    is-link
    to="user/edit"
    :value="user.userAvatar"
    @click="toEdit('avatarUrl', '头像', user.userAvatar)"
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
    @click="toEdit('email', '邮箱', user.email)"
  />
  <van-cell
    title="注册时间"
    is-link
    :value="user.createTime.toLocaleString()"
  />
  </template>
  
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import MyAxios from "../plugins/myAxios";
import { showToast } from "vant";

const router = useRouter();

// const user = {
//   id: 1,
//   userName: "zxw",
//   userAccount: "thisZxw",
//   userAvatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
//   gender: "男",
//   phone: "131321654684",
//   email: "1531351@qq.com",
//   createTime: new Date(),
// }
const user = ref();

onMounted(async () => {
  const currentUser = await MyAxios.get("/user/current");
  console.log(currentUser);
    if(currentUser.code === 0){
      user.value = currentUser.data;
      showToast("获取用户信息成功");
    }else{
      showToast("获取用户信息失败");
    }
    
  })

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