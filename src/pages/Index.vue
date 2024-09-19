<template>
  <van-card
    v-for="user in userList"
    :desc="user.userProfile"
    :title="user.userName"
    :thumb="user.userAvatar"
  >
    <template #tags>
      <van-tag
        plain
        type="primary"
        v-for="tag in user.tags"
        style="margin-right: 8px; margin-top: 8px"
        >{{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="small">联系我</van-button>
    </template>
  </van-card>
  <!-- 搜索提示 -->
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import MyAxios from "../plugins/myAxios";
import { Empty } from "vant";

const router = useRouter();
const route = useRoute();
// 后端的用户列表
const userList = ref([]);

//在页面DOM挂载完成之后执行
onMounted(async () => {
  const userListData = await MyAxios.get("/user/recommend", {
    params: {},
  })
    .then(function (response) {
      console.log("/user/recommend success ", response);
      return response?.data;
    })
    .catch(function (error) {
      console.log("/user/recommend error", error);
    });
  if (userListData) {
    console.log("userListData", userListData);
    userListData.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = userListData;
  }
});
</script>
<style scoped></style>
