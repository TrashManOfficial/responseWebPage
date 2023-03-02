<script setup>
import { ref, computed, reactive } from 'vue';
import DropDownList from './DropDownList.vue';
const DEFAULT_LENGTH = 4
const props = defineProps({
  list: Array
})
const currentId = ref('1')
const setCurrentId = (id) => {
  currentId.value = id
}
const tabList = ref([...props.list])
const showList = computed(() => {
  return [...tabList.value.slice(0, DEFAULT_LENGTH), { id: 'more', name: 'more' }]
})
const hiddenList = computed(() => {
  if (tabList.length < DEFAULT_LENGTH) {
    return []
  }
  return tabList.value.slice(DEFAULT_LENGTH)
})
const hiddenListClick = (data) => {
  //交换下拉列表的数据和显示tab的末尾数据
  const index = tabList.value.findIndex(i => i === data)
  const temp = tabList.value[DEFAULT_LENGTH - 1]
  tabList.value[DEFAULT_LENGTH - 1] = data
  tabList.value[index] = temp
  tabList.value = [...tabList.value]
  setCurrentId(data.id)
}
</script>
<template>
  <div class="w-full flex">
    <div class="flex-1 flex justify-start" v-for="item in showList">
      <div v-if="item.id !== 'more'" class="w-fit cursor-pointer" @click="setCurrentId(item.id)">
        <div :class="`font-FZ text-2xl px-1 break-keep ${currentId === item.id ? 'font-extrabold' : 'font-light'}`">
          {{ item.name }}</div>
        <div :class="`w-fit ${currentId === item.id ? 'isActiveTab font-extrabold' : ''}`"></div>
      </div>
      <div v-else class="w-fit cursor-pointer">
        <DropDownList :list="hiddenList" @itemClick="hiddenListClick">
          <div class="font-FZ text-2xl px-1 break-keep font-light">
            {{ item.name }}</div>
        </DropDownList>
      </div>
    </div>
  </div>
</template>
<style scoped>
.isActiveTab {
  height: 11px;
  width: 100%;
  border-radius: 10px;
  opacity: 0.6;
  background-color: rgba(17, 164, 175, 1);
  transform: rotateX(180deg);
  margin-top: -11px;
}

.isActiveTab::after {
  content: '';
  width: 50%;
  height: 2px;
  display: block;
  margin: 0 auto;
  background-color: rgba(217, 79, 20, 1);
  border-radius: 10px;
}
</style>