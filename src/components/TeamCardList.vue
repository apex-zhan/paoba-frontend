<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :desc="`${team.description}`"
        :title="`${team.name}`"
        :thumb="`${teamimage}`"
    >
      <template #tags>
        <van-tag plain type="primary" style="margin-right: 8px; margin-top: 8px"
        >{{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>{{ "最大人数: " + `${team.maxNum}` }}</div>
        <div>{{ "创建时间： " + `${team.createTime}` }}</div>
        <div>{{ "过期时间： " + `${team.expireTime}` }}</div>
      </template>
      <template #footer>
        <van-button
            v-if="team.userId === currentUser?.id"
            size="small"
            plain
            type="primary"
            @click="doUpdateTeam(team.id)"
        >更新队伍
        </van-button>
        <van-button
            v-if="team.userId === currentUser?.id"
            size="small"
            plain
            type="danger"
            @click="doDeleteTeam(team.id)"
        >解散队伍
        </van-button>
        <van-button
            v-if="team.hasJoin && team.userId !== currentUser?.id"
            size="small"
            plain
            type="danger"
            @click="doQuitTeam(team.id)"
        >退出队伍
        </van-button>
        <van-button
            v-if="team.userId !== currentUser?.id && !team.hasJoin"
            size="small"
            plain
            type="primary"
            @click="preJoinTeam(team)"
        >加入队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import {defineProps, onMounted, ref, withDefaults} from "vue";
import MyAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {currentUser} from "../states/user.ts";
import {getCurrentUser} from "../services/UserServices.ts";

interface teamCardListProps {
  teamList: TeamType[];
}
const JoinTeamId = ref(0);
const showPasswordDialog = ref(false);
const password = ref('');
const router = useRouter();

const teamimage = "https://img.yzcdn.cn/vant/cat.jpeg";
// 获取父组件传来的属性teamList
const props = withDefaults(defineProps<teamCardListProps>(), {
  teamList: () => [],
});

const preJoinTeam = (team: TeamType) => {
  JoinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}
const doJoinTeam = async (id: number) => {
  const res = await MyAxios.post("/team/join", {
    teamId: id,
    password: password.value,
  });

  if (res.code === 0) {
    console.log("加入队伍成功");
    showSuccessToast("加入队伍成功");
  } else {
    console.log("加入队伍失败");
    showFailToast(res?.description || "加入队伍失败");
  }
};

const doJoinCancel = () => {
  JoinTeamId.value = 0;
  password.value = '';
}
/**
 * 更新队伍
 *
 * @param id
 */
const doUpdateTeam = async (id: number) => {
  router.push({
    path: "/team/update",
    query: {
      id,
    },
  });
};
/**
 * 解散队伍
 */
const doDeleteTeam = async (id: number) => {
  const res = await MyAxios.post("/team/delete", {
    id,
  });
  if (res.code === 0) {
    console.log("解散队伍成功");
    showSuccessToast("解散队伍成功");
  } else {
    console.log("解散队伍失败");
    showFailToast(res?.description || "解散队伍失败");
  }
}
/**
 * 退出队伍
 */
const doQuitTeam = async (id: number) => {
  const res = await MyAxios.post("/team/quit", {
    teamId: id,
  });
  if (res.code === 0) {
    console.log("退出队伍成功");
    showSuccessToast("退出队伍成功");
  } else {
    console.log("退出队伍失败");
    showFailToast(res?.description || "退出队伍失败");
  }
}


onMounted(async () => {
  currentUser.value = await getCurrentUser();
  console.log("currentUser", currentUser);
});
const currentUser = ref();
</script>
<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 138px;
}
</style>
