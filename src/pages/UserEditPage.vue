<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :label="editUser.editName"
          :name="editUser.editKey"
          :placeholder="`请输入内容'${editUser.editName}`"
          :rules="[{ editUser, message: '请输入正确内容' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import MyAxios from "../plugins/MyAxios";
import {showFailToast, showSuccessToast, showToast} from "vant";
import {getCurrentUser} from "../services/UserServices";
//执行路由信息对象
const router = useRouter();
// 当前路由信息的对象
const route = useRoute();

const editUser = ref({
  currentValue: route.query.currentValue as string,
  editKey: route.query.editKey as string,
  editName: route.query.editName as string,
});
const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  console.log(currentUser, "当前用户");
  if (!currentUser) {
    console.log("用户未登录");
    showToast("用户未登录");
    return router.push({ name: "Login" });
  }
  const res = await MyAxios.post("/user/update", {
    id: currentUser.id,
    [editUser.value.editKey as string]: editUser.value.currentValue,
  });
  console.log(res, "用户更新");
  if (res.code === 0 && res.data > 0) {
    showSuccessToast("修改成功");
    router.push({ name: "User" });
  } else {
    showFailToast("修改失败");
  }
};
const onFailed = () => {
  console.log("failed");

};
</script>

<style scoped></style>
