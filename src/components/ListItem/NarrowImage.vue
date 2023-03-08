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
    <img :src="props.data.metaInfo.thumbnails[0].split('_')[0]+'.jpg'" class="w-full rounded-xl"/>
  </div>
</template>