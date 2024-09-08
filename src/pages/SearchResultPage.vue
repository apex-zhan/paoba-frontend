<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="user.username"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag
          plain
          type="primary"
          v-for="tag in user.tags"
          style="margin-right: 8px; margin-top: 8px"
      >{{ tag }}
      </van-tag
      >
    </template>
    <template #footer>
      <van-button size="small">联系我</van-button>
    </template>
  </van-card>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter, useRoute} from "vue-router";
import MyAxios from "../plugins/myAxios";
import qs from 'qs';
import {Toast} from "vant";

const router = useRouter();
const route = useRoute();
// 获取搜索页传的路由参数
const {tags} = route.query;

//在页面DOM挂载完成之后执行
onMounted(async () => {
  await MyAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        console.log("/user/search/tags success ", response);
        Toast.success('获取数据成功')
      })
      .catch(function (error) {
        console.log("/user/search/tags error", error);
        Toast.fail('获取数据失败')
      });
});

const testData = {
  id: 1,
  username: 'zxw',
  userAccount: 'thisZxw',
  avatarUrl: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2',
  gender: '男',
  phone: '131321654684',
  email: '1531351@qq.com',
  userRole: 0,
  tags: ['前端', '后端', '测试', '运维', 'emo', 'java', 'python', 'go'],
  profile: '这个人很懒，什么都没写',
  createTime: new Date(),
}
const userList = ref([testData]);
</script>
<style scoped></style>
