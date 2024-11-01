<template>
  <van-form @submit="onSubmit">
    <van-cell-group>
      <van-field
          v-model="addTeamData.name"
          :rules="[{ required: true, message: '请输入队伍名' }]"
          label="队伍名"
          name="name"
          placeholder="请输入队伍名"
      />
      <van-field
          v-model="addTeamData.description"
          autosize
          label="队伍描述:"
          name="description"
          placeholder="请输入队伍描述"
          rows="2"
          type="textarea"
      />
      <van-field
          v-model="addTeamData.expireTime"
          :placeholder="'点击选择过期时间' ?? addTeamData.expireTime"
          is-link
          label="过期时间"
          name="datetimePicker"
          readonly
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom" round>
        <van-date-picker
            :max-date="maxDate"
            :min-date="minDate"
            title="请选择过期时间"
            type="date"
            @cancel="onCancel"
            @confirm="onConfirm"
        />
      </van-popup>
      <van-field label="最大人数" name="stepper">
        <template #button>
          <van-stepper v-model="addTeamData.maxNum" max="50" min="2"/>
        </template>
      </van-field>
      <van-field label="队伍状态" name="radio">
        <template #input>
          <van-radio-group v-model="addTeamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-if="Number(addTeamData.status) === 2"
          v-model="addTeamData.password"
          :rules="[{ required: true, message: '请填写密码' }]"
          label="密码"
          name="password"
          placeholder="请输入队伍密码"
          type="password"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button block native-type="submit" round type="primary">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import MyAxios from "../plugins/myAxios.js";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const showPicker = ref(false);
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2050, 10, 1);

const initFormData = {
  name: "zxw",
  description: "awdadwawd",
  expireTime: null,
  maxNum: 3,
  password: "",
  status: 0,
};

// 需要用户填写的表单数据
const addTeamData = ref({...initFormData});

const onCancel = () => {
  showPicker.value = false;
};
const onConfirm = ({selectedValues}) => {
  addTeamData.value.expireTime = selectedValues.join("-");
  showPicker.value = false;
  showSuccessToast("confirm");
};
// 提交表单
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
        ? Number(addTeamData.value.status)
        : 0,
  };
  // todo 前端参数校验
  console.log(addTeamData.value);
  //最好把这些请求api单独封装到一个文件
  const res = await MyAxios.post("/team/add", postData);
  if (res?.code === 0 && res.data) {
    showSuccessToast("创建成功");
    return router.push({
      path: "/team",
      replace: true,
    });
  } else {
    showFailToast(res?.description || "创建失败");
  }
};
</script>
<style></style>
