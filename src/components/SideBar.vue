<script setup>
import { onMounted, ref, watch } from 'vue'
import channelStore from '../store/channel';
import StrongTitle from './StrongTitle.vue';
const featuresList = ref([])
const getFeatures = () => {
  // const id = channelStore.state.channelList.data.find(i => i.title == '专题').id
  const id = channelStore.state.channelListRaw.data.find(i => i.title == '专题').id
  channelStore.dispatch('getArticleList', id).then(() => {
    featuresList.value = channelStore.state.featuresList
  })
}
watch(() => channelStore.state.channelList.data, (value) => {
  getFeatures()
})

</script>
<template>
  <div class="flex flex-col">
  <StrongTitle :name="'轻报纸'" :isCurrent="true" class="mb-3"></StrongTitle>
  <a href="https://epaper.xkb.com.cn/" target="_blank">
      <img src="https://epaper.xkb.com.cn/index.php?s=/index/firstedition/" class="w-full h-full rounded-lg" />
    </a>
  </div>
  <div class="flex flex-col">
    <StrongTitle :name="'专题'" :isCurrent="true" class="mb-3"></StrongTitle>
    <div class="bg-teal-50 rounded-xl p-3">
      <div class="mr-4 flex items-center mb-2 cursor-pointer" v-for="item in featuresList">
        <img src="../assets/listicon.png" class="h-3 w-3" />
        <div>{{ item.title }}</div>
      </div>
    </div>
  </div>
  <!-- <div class="flex flex-col">
        <StrongTitle :name="'乡村振兴日记'" :isCurrent="true" class="mb-3"></StrongTitle>
        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          class="w-full h-[425px] object-cover rounded-lg" />
      </div> -->
</template>