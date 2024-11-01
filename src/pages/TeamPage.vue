<template>
  <div id="teamPage">
    <van-search
        v-model="searchText"
        placeholder="搜索队伍"
        @search="onSearch"
    />
    <van-tabs v-model:active="active" swipeable @change="onTabChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <div style="margin-bottom: 16px"/>
    <team-card-list :teamList="teamList"/>
  </div>
  <van-button
      class="add-button"
      icon="plus"
      type="primary"
      @click="toAddTeam()"
  />
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showFailToast} from "vant";

const active = ref("public");
const router = useRouter();
const searchText = ref("");

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  // 查公开
  if (name === "public") {
    listTeam(searchText.value, 0);
  } else {
    // 查加密
    listTeam(searchText.value, 2);
  }
};

/**
 *
 */
const teamList = ref([]);

/**
 * 查询队伍列表
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeam = async (val = "", status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast("未找到相关队伍,查询队伍列表失败");
  }
};

// 页面加载时只触发一次
onMounted(() => {
  listTeam();
});

const onSearch = (val) => {
  listTeam(val);
};
// 跳转到创建队伍页
const toAddTeam = () => {
  router.push({
    path: "/team/create",
  });
};
</script>

<style scoped>
#teamPage {
  padding: 10px;
  margin-bottom: 32px;
}

.add-button {
  border-radius: 50%;
  position: fixed;
  bottom: 180px;
  right: 20px;
  z-index: 1000;
  cursor: pointer;
}
</style>
