<script setup>
import InfoBar from './InfoBar.vue';
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
// const showImg = props.data.metaInfo.listStyle === 2 ? false : true
</script>
<template>
  <!-- <div :class="`w-full flex justify-between ${props.data.metaInfo.listStyle !== 2? 'h-32' : 'h-20'}`"> -->
  <div :class="`w-full flex justify-between h-32`">
    <div class="flex flex-col justify-between">
      <div class="text-xl font-medium cursor-pointer hover:text-primary">{{ props.data.listTitle }}</div>
      <InfoBar :data="{ source: props.data.metaInfo.chnlName, comment: props.data.commentCount, time: '2022-12' }">
      </InfoBar>
    </div>
    <img v-if="props.data.metaInfo.listStyle !== 2" :src="props.data.metaInfo.thumbnails[0]"
      class="h-full w-44 rounded-lg object-cover" />
  </div>
</template>