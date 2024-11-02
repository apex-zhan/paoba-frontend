<template>
  <van-form @submit="onSubmit">
    <van-cell-group>
      <van-field
          v-model="userAccount"
          :rules="[{ required: true, message: '请输入用户账号' }]"
          clearable
          label="用户账号"
          placeholder="请输入用户账号"
          required
      />

      <van-field
          v-model="userPassword"
          :rules="[{ required: true, message: '请输入密码' }]"
          label="密码"
          placeholder="请输入密码"
          required
          type="password"
      />
    </van-cell-group>
    <div style="padding: 12px">
      <van-button block native-type="submit" round size="large" type="primary"
      >提交
      </van-button
      >
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {showFailToast, showSuccessToast} from "vant";
import {ref} from "vue";
import MyAxios from "../plugins/myAxios";
//执行路由信息对象
const router = useRouter();
const route = useRoute();
// 当前路由信息的对象
const userAccount = ref("");
const userPassword = ref("");
const onSubmit = async () => {
  const res = await MyAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  });
  if (res.code === 0 && res.data) {
    showSuccessToast("登录成功");
    const redicectUrl = route.query?.redirect as string ?? "/";
    window.location.href = redicectUrl;
  } else showFailToast("登录失败");
};
</script>

<style></style>
