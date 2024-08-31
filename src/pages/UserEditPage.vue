<template>
  <van-form @failed="onFailed">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="用户名"
          placeholder="用户名"
          :rules="[{ userAccount, message: '请输入正确内容' }]"
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


const onFailed = () => {
  console.log('failed');
}
const userAccount = ref('');
</script>


<style scoped>

</style>