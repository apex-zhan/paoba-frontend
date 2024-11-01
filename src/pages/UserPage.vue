<template>
  <template v-if="user">
    <van-space direction="vertical" fill>
      <van-card
          :desc="user.userProfile"
          :thumb="user.userAvatar"
          :title="user.userName"
      >
        <template #tags>
          <van-tag
              plain
              style="margin-right: 8px; margin-top: 8px"
              type="primary"
          >{{ user.tags }}
          </van-tag>
        </template>
      </van-card>

      <van-cell title="当前用户" :value="user?.userName" />
      <van-cell title="修改信息" is-link to="/user/update" />
      <van-cell title="我创建的队伍" is-link to="/user/team/create" />
      <van-cell title="我加入的队伍" is-link to="/user/team/join" />
      <van-button block round style="margin: auto;" type="primary" @click="dologout()">
        退出登录
      </van-button>
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

/**
 * 获取当前用户
 */
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
/**
 * 退出登录
 */
const dologout = () => {
  router.replace({
    path: "/user/login",
  });
};

const UserContactPage = () => router.push("/user/contact");
</script>
<style scoped></style>
