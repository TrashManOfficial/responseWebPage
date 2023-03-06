<script setup>
import { ref, watch } from 'vue'
import NewsItem from './NewsItem.vue';
import ImageListItem from './ImageListItem.vue';
import NarrowImage from './NarrowImage.vue';
const props = defineProps({
  data: {
    type: Object,
  }
})
const switchType = (type) => {
  const {metaInfo} = props.data
  if(metaInfo.listStyle === type) {
    return true
  }
  return false
}
const componentsList = {
  0:NewsItem,
  1:ImageListItem,
  2:NewsItem,
  4:NarrowImage,
}
</script>
<template>
  <component :is="componentsList[props.data.metaInfo.listStyle]" :data="props.data" class="mb-6"></component>
</template>