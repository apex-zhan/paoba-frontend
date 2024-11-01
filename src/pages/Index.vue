<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24"/>
    </template>
  </van-cell>
  <user-card-list :loading="loading" :userList="userList"/>
  <div style="margin-top: 32px"></div>
</template>

<script setup lang="ts">
import {ref, watchEffect} from "vue";
import MyAxios from "../plugins/myAxios";
import UserCardList from "../components/UserCardList.vue";
import {showFailToast, showSuccessToast} from "vant";
import {UserType} from "../models/User";

const isMatchMode = ref(false);
// 后端的用户列表
const userList = ref([]);
const loading = ref<boolean>(true);

/**
 * 加载数据
 */
const loadData = async () => {
  loading.value = true;
  let userListData;
  if (isMatchMode.value) {
    const num = 10;
    userListData = await MyAxios.get("/user/match", {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log("/user/match succeed", response);
          showSuccessToast("加载成功");
          console.log(response);
          return response;
        })
        .catch(function (error) {
          console.log("/user/match error", error);
          showFailToast("请求失败");
        });
  } else {
    userListData = await MyAxios.get("/user/recommend", {
      params: {
        pageNum: 1,
        pageSize: 12,
      },
    })
        .then(function (response) {
          console.log("/user/recommend success ", response);
          return response?.data.records;
        })
        .catch(function (error) {
          console.log("/user/recommend error", error);
          showFailToast("请求失败");
        });
  }
  if (userListData) {
    console.log("userListData", userListData);
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = userListData;
  }

  loading.value = false;
};
watchEffect(() => {
  loadData();
});
</script>
<style scoped></style>
