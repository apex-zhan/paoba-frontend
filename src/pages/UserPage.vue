<template>
  <template v-if="user">
    <van-space direction="vertical" fill>
      <van-card
          :desc="user.userProfile"
          :title="user.userName"
          :thumb="user.userAvatar"
      >
        <template #tags>
          <van-tag
              plain
              type="primary"
              style="margin-right: 8px; margin-top: 8px"
          >{{ user.tags }}
          </van-tag>
        </template>
        <template #footer>
          <van-button size="small">联系我</van-button>
        </template>
      </van-card>

      <van-cell title="当前用户" :value="user?.userName"/>
      <van-cell title="修改信息" is-link to="/user/update"/>
      <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
      <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
    </van-space>
  </template>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {showToast} from "vant";
import {getCurrentUser} from "../services/UserServices.ts";

const router = useRouter();
const route = useRoute();

const user = ref();
console.log(user);

onMounted(async () => {
  user.value = await getCurrentUser();
  if (!user.value) {
    showToast("请先登录");
    router.push("/user/login");
  }
});

const toEdit = (editName: string, editKey: string, currentValue: string) => {
  router.push({
    path: "/User/edit",
    query: {
      editName,
      editKey,
      currentValue,
    },
  });
};
</script>
<style scoped></style>
