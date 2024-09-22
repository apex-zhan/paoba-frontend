<template>
  <van-card
    v-for="user in props.userList"
    :desc="user.userprofile"
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
<script setup lang="ts">
import { UserType } from "../models/User";

interface UserCardListProps {
  userList: UserType[];
}
// 获取父组件传来的属性userList
const props = withDefaults(defineProps<UserCardListProps>(), {
  userList: () => [],
});
</script>
