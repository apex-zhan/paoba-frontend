<template>
  <van-cell title="昵称" is-link to="user/edit" :value="user.username" @click="toEdit('username','昵称', user.username)"/>
  <van-cell title="账号" is-link :value="user.userAccount"/>
  <van-cell title="头像" is-link to="user/edit" :value="user.avatarUrl" @click="toEdit('avatarUrl','头像', user.avatarUrl)">
    <img height="32px" :src="user.avatarUrl"/>
  </van-cell>
  <van-cell title="性别" is-link to="user/edit" :value="user.gender" @click="toEdit('gender','性别', user.gender)"/>
  <van-cell title="电话" is-link to="user/edit" :value="user.phone" @click="toEdit('phone','手机', user.phone)"/>
  <van-cell title="邮箱" is-link to="user/edit" :value="user.email" @click="toEdit('email','邮箱', user.email)"/>
  <van-cell title="注册时间" is-link :value="user.createTime.toLocaleString()"/>
</template>

<script setup lang="ts">
import {ref} from "vue";
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
const toEdit = (editKey: string, currentValue: string, editName: string) => {
  router.push({
    path: '/User/edit',
    query: {
      editKey, editName, currentValue
    }
  })
};
</script>

<style scoped>

</style>