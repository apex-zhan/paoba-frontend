<template>
  <user-card-list :userList="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import MyAxios from "../plugins/myAxios";
import { Empty } from "vant";
import UserCardList from "../components/UserCardList.vue";

const router = useRouter();
const route = useRoute();
// 后端的用户列表
const userList = ref([]);

//在页面DOM挂载完成之后执行
onMounted(async () => {
  const userListData = await MyAxios.get("/user/recommend", {
    params: {
      pageNum: 1,
      pageSize: 10,
    },
  })
    .then(function (response) {
      console.log("/user/recommend success ", response);
      return response?.data.records;
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
