<script setup>
import InfoBar from './InfoBar.vue';
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div class="w-full">
    <img :src="item" :alt="props.data.metaInfo.thumbnails[0]" class="w-full h-44 rounded-lg"/>
    <!-- <div class="text-xl font-medium cursor-pointer hover:text-primary">{{ props.data.listTitle }}</div>
    <div class="w-full flex">
      <div v-for="item in props.data.metaInfo.thumbnails" class="w-full px-2 py-1">
        <img :src="item" :alt="item" class="w-full h-44 object-cover rounded-lg"/>
      </div>
    </div>
    <InfoBar :data="{ source: '111', comment: 123, time: '2022-12' }"></InfoBar> -->
  </div>
</template>