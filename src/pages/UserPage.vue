<template>
  <van-cell title="昵称" is-link :value="user.username"/>
  <van-cell title="账号" is-link :value="user.userAccount" @click="toEdit()"/>
  <van-cell title="头像" is-link :value="user.avatarUrl">
    <img height="32px" :src="user.avatarUrl"/>
  </van-cell>
  <van-cell title="性别" is-link :value="user.gender"/>
  <van-cell title="电话" is-link :value="user.phone"/>
  <van-cell title="邮箱" is-link :value="user.email"/>
  <van-cell title="注册时间" is-link :value="user.createTime.toLocaleString()"/>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();

const user = {
  id: 1,
  username: 'zxw',
  userAccount: 'thisZxw',
  avatarUrl: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
  gender: '男',
  phone: '131321654684',
  email: '1531351@qq.com',
  createTime: new Date(),
}
const toEdit = () => {
  console.log('toEdit')
  router.push('/User/edit');
}
</script>

<style scoped>

</style>