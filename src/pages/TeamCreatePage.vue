<template>
  <van-form @submit="onSubmit">
    <van-cell-group>
      <van-field
        v-model="addTeamData.name"
        name="name"
        label="队伍名"
        placeholder="请输入队伍名"
        :rules="[{ required: true, message: '请输入队伍名' }]"
      />
      <van-field
        v-model="addTeamData.description"
        rows="4"
        autosize
        label="队伍描述"
        type="textarea"
        placeholder="请输入队伍描述"
      />
      <van-field
        is-link
        readonly
        name="datetimePicker"
        label="过期时间"
        :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom" round>
        <van-date-picker
          v-model="addTeamData.expireTime"
          @confirm="showPicker = false"
          type="datetime"
          title="请选择过期时间"
          :min-date="minDate"
        />
      </van-popup>
      <van-field name="stepper" label="最大人数">
        <template #button>
          <van-stepper v-model="addTeamData.maxNum" max="50" min="2" />
        </template>
      </van-field>
      <van-field name="radio" label="队伍状态">
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
        type="password"
        name="password"
        label="密码"
        placeholder="请输入队伍密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const showPicker = ref(false);
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2030, 10, 1);

const dojointeam = () => {
  router.push("/team/join");
};

const initFormData = {
  name: "zxw",
  description: "awdadwawd",
  expireTime: ["2023-12-31 23:59:59"],
  maxNum: 3,
  password: "",
  status: 0,
};

// 需要用户填写的表单数据
const addTeamData = ref({ ...initFormData });

const onCancel = () => {
  showToast("cancel");
  show.value = false;
};
const onConfirm = () => {
  showToast("confirm");
  show.value = false;
};
const onSubmit = async () => {
  console.log(addTeamData.value);
  //最好把这些请求api单独封装到一个文件
  const res = await MyAxios.post("/team/add", addTeamData.value).then(
    (res) => {}
  );
};
</script>
<style></style>
