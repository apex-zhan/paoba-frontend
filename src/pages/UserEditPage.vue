<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          :label="editUser.editName"
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :placeholder="`请输入内容'${editUser.editName}`"
          :rules="[{ editUser, message: '请输入正确内容' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {useRouter,useRoute} from 'vue-router';
import MyAxios from '../plugins/MyAxios';
import { showToast } from 'vant';
//执行路由信息对象
const router = useRouter();
// 当前路由信息的对象
const route = useRoute();

const onFailed = () => {
  console.log('failed');
}

const editUser = ref({
  currentValue: route.query.currentValue as string,
  editKey: route.query.editKey as string,
  editName: route.query.editName as string,
});
const onSubmit = async () => {
  const res = await MyAxios.post('/user/update', {
    id:'1',
    [editUser.value.editKey as string]: editUser.value.currentValue,
  })
  console.log(res,'用户更新');
  if (res.code === 0 && res.data > 0) {
    showToast('修改成功')
    router.back();
  } else {
    showToast('修改失败')
  }
}
</script>


<style scoped>

</style>