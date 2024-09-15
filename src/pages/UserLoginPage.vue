<template>
  <van-form @submit="onSubmit">
    <van-cell-group>
      <van-field
        v-model="userAccount"
        required
        clearable
        label="用户账号"
        placeholder="请输入用户账号"
        :rules="[{ required: true, message: '请输入用户账号' }]"
      />

      <van-field
        v-model="userPassword"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :rules="[{ required: true, message: '请输入密码' }]"
      />
    </van-cell-group>
    <div style="padding: 12px">
      <van-button size="large" round block type="primary" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { useRouter} from "vue-router";
import { showToast } from "vant";
import { ref } from "vue";
import MyAxios from "../plugins/myAxios";
//执行路由信息对象
const router = useRouter();
// 当前路由信息的对象
const userAccount = ref("");
const userPassword = ref("");
const onSubmit = async () => {
  const res = await MyAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  });
  if (res.code === 0 && res.data) {
    showToast("登录成功");
    router.replace("/");
  } else 
  showToast("登录失败");
};
</script>

<style></style>