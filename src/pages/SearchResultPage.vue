<template>
  <user-card-list :loading="loading" :user-list="userList"/>
  <van-empty v-if="userList?.length < 1" description="数据为空"/>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.js";
import {Toast} from "vant";
import qs from "qs";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const {tags} = route.query;
const loading = ref<boolean>(true);
const userList = ref([]);

onMounted(async () => {
  loading.value = true;
  const userListData = await myAxios
      .get("/user/search/tags", {
        params: {
          tagNameList: tags,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, {indices: false});
        },
      })
      .then(function (response) {
        console.log("/user/search/tags succeed", response);
        return response?.data;
      })
      .catch(function (error) {
        console.error("/user/search/tags error", error);
        Toast.fail("请求失败");
      });
  console.log(userListData);
  if (userListData) {
    userListData.forEach((user) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    });
    userList.value = userListData;
  }
  loading.value = false;
});
</script>

<style scoped></style>
