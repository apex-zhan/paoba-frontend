<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <van-row v-if="activeIds.length === 0 ">请选择标签</van-row>
  <van-row gutter="16">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close=doclose(tag)>
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select style="height: 600px;"
                   v-model:active-id="activeIds"
                   v-model:main-active-index="activeIndex"
                   :items="tagList"
  />
</template>

<script setup lang="ts">
import {ref} from 'vue';

// 搜索框的内容
const searchText = ref('');

/**
 * yi
 */
// 右侧选中项的 id，支持传入数组
const activeIds = ref([]);
// 左侧选中项的索引
const activeIndex = ref();

// 标签列表
const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
      {text: '研一', id: '研一'},
      {text: '研二', id: '研二'},
      {text: '研三', id: '研三'},
    ],
  },
];
let tagList = ref(originTagList);
/**
 * 搜索过滤
 * @param val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    const childrenTag = [...parentTag.children];
    const parentTagFilter = {...parentTag};
    parentTagFilter.children = childrenTag.filter((item) => item.text.includes(searchText.value));
    return parentTagFilter;
  });
  // todo 实时搜索
};
//关闭标签
const doclose = (tag: string) => {
  activeIds.value = activeIds.value.filter(item => item !== tag);
};


// 取消搜索
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
}

</script>
<style scoped>

</style>